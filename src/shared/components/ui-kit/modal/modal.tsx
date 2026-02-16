import React, { useEffect } from "react";

import Typography from "../typography";
import Button from "../button";
import { type ModalProps as Modal, type ModalStoreData } from "./provider";

import { mergeClassNames } from "@utils/common";

import styles from "./style.module.scss";

type MoveData = {
  isMoving: boolean;
  modalWidth: number;
  modalHeight: number;
  overlayWidth: number;
  overlayHeight: number;
  dx: number; // offset overlayX from clientX
  dy: number; // offset overlayY from clientY
  offsetX: number;
  offsetY: number;
};

type ModalProps = Modal & Pick<ModalStoreData, "style" | "terminate">;

const Modal: React.FC<ModalProps> = ({
  style,
  header,
  body,
  movable,
  terminate,
  backDropClose = true,
  animationDuration,
  classes,
  onClose,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const moveData = React.useRef<MoveData>({
    isMoving: false,
    modalWidth: 0,
    modalHeight: 0,
    overlayWidth: 0,
    overlayHeight: 0,
    dx: 0,
    dy: 0,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onEscapePress);

    return () => {
      document.removeEventListener("keydown", onEscapePress);
    };
  }, [backDropClose, onClose]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!movable) {
      return;
    }

    const modalRect = modalRef.current?.getBoundingClientRect();
    const overlayRect =
      modalRef.current?.parentElement?.getBoundingClientRect();

    if (!modalRect || !overlayRect) {
      return;
    }
    const offsetX = e.clientX - modalRect.left;
    const offsetY = e.clientY - modalRect.top;

    moveData.current = {
      isMoving: true,
      dx: overlayRect.x,
      dy: overlayRect.y,
      modalWidth: modalRect.width,
      modalHeight: modalRect.height,
      overlayWidth: overlayRect.width,
      overlayHeight: overlayRect.height,
      offsetX,
      offsetY,
    };
    modalRef.current?.parentElement.classList.add(styles.isMoving);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!moveData.current.isMoving || !modalRef.current) {
      return;
    }
    let left = e.clientX - moveData.current.offsetX - moveData.current.dx;
    let top = e.clientY - moveData.current.offsetY - moveData.current.dy;

    // restrictions to stay within viewport
    const borderOffset = 10;
    const [topMin, topMax] = [
      borderOffset,
      moveData.current.overlayHeight -
        moveData.current.modalHeight -
        borderOffset,
    ];
    const [leftMin, leftMax] = [
      borderOffset,
      moveData.current.overlayWidth -
        moveData.current.modalWidth -
        borderOffset,
    ];

    if (top < topMin) {
      top = topMin;
    }
    if (top > topMax) {
      top = topMax;
    }
    if (left < leftMin) {
      left = leftMin;
    }
    if (left > leftMax) {
      left = leftMax;
    }

    modalRef.current.style.cursor = "grabbing";
    modalRef.current.style.left = `${left}px`;
    modalRef.current.style.top = `${top}px`;
    modalRef.current.style.outline = "2px solid var(--modal-outline-color)";
    modalRef.current.style.position = "absolute";
  };

  const onMouseUp = () => {
    moveData.current.isMoving = false;

    if (modalRef.current) {
      modalRef.current.style.outline = "none";
      modalRef.current.style.cursor = "grab";
      modalRef.current?.parentElement.classList.remove(styles.isMoving);
    }
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (backDropClose) {
      onClose?.(e, "backdrop");
    }
  };

  const onEscapePress = (e: KeyboardEvent) => {
    if (e.key === "Escape" && backDropClose) {
      onClose?.(e as unknown as React.MouseEvent<HTMLDivElement>, "escape");
    }
  };

  const onCloseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose?.(e as unknown as React.MouseEvent<HTMLDivElement>, "closeButton");
  };

  const renderHeader = () => {
    if (typeof header === "string" || React.isValidElement(header)) {
      return (
        <Typography variant="span" className={styles.title}>
          {header}
        </Typography>
      );
    }
    return header;
  };

  return (
    <div
      className={mergeClassNames([
        styles.Modal,
        terminate && styles.terminate,
        movable && styles.movable,
        classes?.root,
      ])}
      style={style}
    >
      <div
        className={mergeClassNames([styles.overlay, classes?.overlay])}
        onClick={onBackdropClick}
        style={{
          animationDuration: `${animationDuration}ms`,
        }}
      ></div>
      <div
        ref={modalRef}
        tabIndex={0}
        className={mergeClassNames([styles.modalBox, classes?.modalBox])}
        onMouseDown={onMouseDown}
        style={{
          animationDuration: `${animationDuration}ms`,
        }}
      >
        {header && (
          <div className={styles.header}>
            {renderHeader()}
            {onClose && (
              <Button
                onClick={onCloseButtonClick}
                variant="link"
                className={styles.closeButton}
              >
                &times;
              </Button>
            )}
          </div>
        )}
        {body && <div className={styles.body}>{body}</div>}
      </div>
    </div>
  );
};

export default Modal;
