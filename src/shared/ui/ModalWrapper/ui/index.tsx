import styles from "./ModalWrapper.module.scss";
import {
  Dispatch,
  forwardRef,
  ReactNode,
  SetStateAction,
  useImperativeHandle,
  useRef,
} from "react";
import { useClosedModal } from "shared/hooks";

interface IModalWrapperProps {
  isActive: boolean;
  setFunction: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  maxWidth?: string;
}

export const ModalWrapper = forwardRef<HTMLDivElement, IModalWrapperProps>(
  ({ isActive, setFunction, children, maxWidth = "" }, ref) => {
    const innerRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => innerRef.current!);

    useClosedModal({
      isActive,
      ref: innerRef,
      setFunction,
    });

    return (
      <div className={styles.modal}>
        <div className={styles.modal__wrapper}>
          <div
            ref={innerRef}
            style={{ maxWidth: maxWidth ? maxWidth : "", width: "100%" }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
