import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Header = () => {
  useEffect(() => {
    localStorage.setItem("selectedMenu", "home");
  }, []);
  const isSelectedStrg = localStorage.getItem("selectedMenu");
  const navigte = useNavigate();

  return (
    <div>
      <div></div>
      <nav className="bg-gray-800 fixed top-0 z-10 w-[500px]">
        <div className="flex h-16 items-center p-1">
          <button
            type="button"
            className={`p-1 ${
              isSelectedStrg === "home"
                ? "text-white font-bold"
                : "text-gray-400"
            } `}
            onClick={() => {
              localStorage.setItem("selectedMenu", "home");
              navigte("/");
            }}
          >
            Home
          </button>
          <button
            type="button"
            className={`p-1 ${
              isSelectedStrg === "bookmark"
                ? "text-white font-bold"
                : "text-gray-400"
            } `}
            onClick={() => {
              localStorage.setItem("selectedMenu", "bookmark");
              navigte("/bookmark");
            }}
          >
            Bookmark
          </button>
        </div>
      </nav>
    </div>
  );
};
