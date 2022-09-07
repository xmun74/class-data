import { useState } from "react";
import styled from "styled-components";

export const ModalContainer = styled.div`
  // TODO : Modal을 구현하는데 전체적으로 필요한 CSS를 구현합니다.
  // background: rgba(225, 225, 225, 0.831);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85%;
`;

export const ModalBackdrop = styled.div`
  // TODO : Modal이 떴을 때의 배경을 깔아주는 CSS를 구현합니다.
  background: rgba(225, 225, 225, 0.831);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  // width: 100%;
  // height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBtn = styled.button`
  background-color: #e84118;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: "dialog",
}))`
  position: fixed;
  top: 20%;
  background-color: white;
  width: 350px;
  height: 150px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;

  > button {
    cursor: pointer;
    font-size: 32px;
    border: none;
    background-color: white;
  }
`;

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // onClick 시, isOpen 상태 변경하는 헨들러
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ModalContainer>
        <ModalBtn
          // 클릭 시, Modal이 열린 상태(isOpen)를 boolean 타입으로 변경하는 메소드
          onClick={openModalHandler}
        >
          {isOpen === true ? "Opened!" : "Open Modal"}
          {/* 조건부 렌더링 - Modal 열린 상태(isOpen true)면 내부 텍스트 'Opened!'/ 닫힌 상태(isOpen false)면 'Open Modal' */}
        </ModalBtn>
        {/* 조건부 렌더링 - Modal 열린 상태(isOpen true)만 모달창과 배경 출력 */}
        {isOpen && (
          <ModalBackdrop onClick={openModalHandler}>
            {/* 부모 클릭이벤트 물려받으므로, 안물려받는 코드 작성 */}
            <ModalView onClick={(e) => e.stopPropagation()}>
              <button onClick={openModalHandler}>&times;</button>
              <span>HELLO MODAL 🔥</span>
              <div>&nbsp;</div>
            </ModalView>
          </ModalBackdrop>
        )}
      </ModalContainer>
    </>
  );
};
