import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ToggleContainer = styled.div`
  position: relative;
  margin-top: 8rem;
  left: 47%;
  cursor: pointer;

  // > : 자식 셀렉터
  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: #8b8b8b;
    margin-bottom: 10px;

    // & :.toggle-container있으면서 .toggle--checked있을 때
    &.toggle--checked {
      background-color: #e84118;
    }
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #ffffff;

    transition: all 0.3s;
    // 추가로 .toggle--checked 클래스가 활성화 경우
    &.toggle--checked {
      left: 27px;
    }
  }
`;

const Desc = styled.div`
  // TODO : 설명 부분의 CSS를 구현합니다.
  background-color: #ffffff;
  margin: 20px;
  font-size: 20px;
  text-align: center;
`;

export const Toggle = ({ primary }) => {
  //스토리북 테스트 시작
  // const mode = primary
  //   ? "storybook-button--primary"
  //   : "storybook-button--secondary";
  //스토리북 테스트 끝

  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    setisOn(!isOn);
  };

  return (
    <>
      <ToggleContainer
        // 클릭 시 isOn 상태 변경하는 메소드
        onClick={toggleHandler}
      >
        {/* 조건부 스타일링 - Switch ON 상태만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가 */}
        <div className={`toggle-container ${isOn ? "toggle--checked" : ""}`} />
        {/*    || primary => npm run start에선 안됨, storybook에선 됨
        <div
          className={`toggle-container ${
            isOn || primary ? "toggle--checked" : ""
          }`}
        /> */}
        <div className={`toggle-circle ${isOn ? "toggle--checked" : ""}`} />
      </ToggleContainer>

      {/* 조건부 렌더링 - Switch ON상태면 내부 텍스트를 'ON'으로, 아니면 'OFF' */}
      <Desc>Toggle Switch {isOn ? "ON" : "OFF"}</Desc>
    </>
  );
};

// 스토리북 설정을 위한 추가
Toggle.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  // backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  // size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Button contents
   */
  // label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Toggle.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: "medium",
  onClick: undefined,
};
