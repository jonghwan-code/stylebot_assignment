import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ImageList } from "../../components/ImageList";
import { useDragableContainer } from "../../hooks";

export const BookmarkImages = () => {
  const bookmarkedList = useSelector((state: RootState) => state.bookmark);

  const { offsetRef, handleMouseDown } = useDragableContainer();

  return (
    <div
      className="pt-20 overflow-y-auto h-screen touch-none"
      ref={offsetRef}
      onMouseDown={handleMouseDown}
    >
      <section>
        {!Boolean(bookmarkedList.length) ? (
          <div>
            <p className="mt-10 text-center text-md text-gray-500">
              {"즐겨찾기한 이미지가 없습니다."}
            </p>
          </div>
        ) : (
          <ImageList images={bookmarkedList} offsetRef={offsetRef} />
        )}
      </section>
    </div>
  );
};
