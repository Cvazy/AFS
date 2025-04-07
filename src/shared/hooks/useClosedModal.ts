import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

interface IClosedModalProps {
  isActive?: boolean;
  ref: RefObject<HTMLDivElement | null>;
  setFunction: Dispatch<SetStateAction<boolean>>;
}

export const useClosedModal = ({
  isActive,
  ref,
  setFunction,
}: IClosedModalProps) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setFunction(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, ref, setFunction]);
};
