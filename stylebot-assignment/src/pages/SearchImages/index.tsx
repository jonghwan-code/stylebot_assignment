import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { ImageList } from "../../components/ImageList";
import { Loading } from "./Loading";
import { useDragableContainer } from "../../hooks";
import { fetchImages } from "../../apis/fetchImages";
interface SearchImagesI {
  inputRef: React.MutableRefObject<string>;
}
const SearchImages = ({ inputRef }: SearchImagesI) => {
  const inputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      inputRef.current = e.target.value;
    },
    [inputRef]
  );

  const {
    data,
    refetch: refetchImages,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["get_image_query"],
    queryFn: ({ pageParam }) => {
      return fetchImages({ query: inputRef.current, page: pageParam });
    },
    initialPageParam: 1,
    enabled: false,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
  });

  const onSearchButtonClicked = useCallback(async () => {
    refetchImages();
  }, [refetchImages]);

  const searchedImgs = useMemo(
    () => data?.pages.map((page) => page.data).flat() ?? [],
    [data?.pages]
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!fetchNextPage || !hasNextPage) {
      return;
    }
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  const { offsetRef, handleMouseDown } = useDragableContainer();

  return (
    <div
      className="pt-20 overflow-y-auto h-screen touch-none "
      ref={offsetRef}
      onMouseDown={handleMouseDown}
    >
      <div className="relative mx-4">
        <input
          type="text"
          className="block w-full p-4 text-md border border-gray-300 rounded-lg bg-gray-50 "
          placeholder="Search Images..."
          onChange={inputHandler}
        />
        <button
          type="submit"
          className="text-white absolute end-3 bottom-3 bg-gray-800 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer"
          onClick={onSearchButtonClicked}
        >
          Search
        </button>
      </div>
      <section className="pt-5">
        {!Boolean(searchedImgs.length) ? (
          <>
            <p className="text-center text-md text-gray-500">
              {"검색을 시작해 주세요."}
            </p>
          </>
        ) : (
          <ImageList images={searchedImgs} offsetRef={offsetRef} />
        )}
      </section>
      {hasNextPage && (
        <Loading inViewRef={ref} isFetchingNextPage={isFetchingNextPage} />
      )}
      <div className="h-5"></div>
    </div>
  );
};

export default React.memo(SearchImages);
