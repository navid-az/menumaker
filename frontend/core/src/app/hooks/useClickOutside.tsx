import { useEffect, useState } from "react";

//closes the target element on outside click
export default function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>
) {
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsClickedOutside(true);
      } else {
        setIsClickedOutside(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return isClickedOutside;
}
