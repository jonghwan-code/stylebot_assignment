import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { ImageProps } from "../../../types/types";

import { addBookmark, removeBookmark } from "../../../slices/bookmarkSlice";
import { SyntheticEvent } from "react";

interface ImageItemI {
  img: ImageProps;
}
export const ImageItem = ({ img }: ImageItemI) => {
  const bookmarkedList = useSelector((state: RootState) => state.bookmark);
  const dispatch = useDispatch();
  const changeState = (selectedImg: ImageProps) => {
    const isBookmarked = bookmarkedList?.find((img) => {
      return img.image_url === selectedImg.image_url;
    });
    if (isBookmarked) {
      dispatch(removeBookmark(selectedImg.image_url));
    } else {
      dispatch(addBookmark(selectedImg));
    }
  };
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/images/noImage.svg";
  };
  return (
    <div>
      <section className="p-4 mb-4 mx-1 border-b border-gray-200">
        <img
          src={img.image_url}
          alt=""
          className="min-w-full min-h-full drag-none"
          onError={addDefaultImg}
        />
        <div className="flex justify-between mt-2">
          <p className="text-sm font-bold truncate hover:text-blue-700 leading-[24px]">
            {"출처:"}
            <a href={img.doc_url} target={"blank"}>
              {img.doc_url}
            </a>
          </p>
          <button onClick={() => changeState(img)}>
            <svg
              className="w-6 h-6 text-gray-800 "
              aria-hidden="true"
              fill={
                bookmarkedList?.find((el) => {
                  return el.image_url === img.image_url;
                })
                  ? "red"
                  : "none"
              }
              stroke={
                bookmarkedList?.find((el) => {
                  return el.image_url === img.image_url;
                })
                  ? "none"
                  : "gray"
              }
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />{" "}
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};
