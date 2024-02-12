import React from "react";
import { ImageItem } from "./ImageItem";
import { ImageProps } from "../../types/types";

interface ImageListI {
  images: ImageProps[];
  offsetRef: React.RefObject<HTMLDivElement>;
}
export const ImageList = ({ images, offsetRef }: ImageListI) => {
  return (
    <section>
      <div>
        {images &&
          images?.map((img) => {
            return <ImageItem key={img.image_url} img={img} />;
          })}
      </div>
      {Boolean(images.length) && (
        <div className="sticky bottom-5 w-[500px] flex justify-center">
          <button
            className="bg-gray-800 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full shadow-lg"
            onClick={() => offsetRef.current?.scrollTo(0, 0)}
          >
            {"Top"}
          </button>
        </div>
      )}
    </section>
  );
};
