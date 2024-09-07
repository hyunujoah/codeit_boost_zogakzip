import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose, setStyle }) {
  const dialog = useRef();

  useEffect(() => {
    // useEffect를 사용하여 Modal 구성 요소를 DOM Dialog API와 동기화합니다.
    // 이 코드는 <Modal> 구성 요소가 렌더링될 때마다 내장 API를 통해 기본 <dialog>를 엽니다.
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close(); // 오류 발생을 방지하는 데 필요합니다.
    };
  }, []);

  return createPortal(
    <dialog className={`modal  ${setStyle}`} ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
