import { useState, useEffect } from "react";
import styled from "styled-components";

const deselectedOptions = [
  "rustic",
  "antique",
  "vinyl",
  "vintage",
  "refurbished",
  "신품",
  "빈티지",
  "중고A급",
  "중고B급",
  "골동품",
];

/* TODO : 아래 CSS를 자유롭게 수정하세요. */
const boxShadow = "0 4px 6px rgb(32 33 36 / 28%)";
const activeBorderRadius = "1rem 1rem 0 0";
const inactiveBorderRadius = "1rem 1rem 1rem 1rem";

export const InputContainer = styled.div`
  margin-top: 8rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border: 1px solid rgb(223, 225, 229);
  border-radius: ${inactiveBorderRadius};
  z-index: 3;
  box-shadow: 0;

  &:focus-within {
    // box-shadow: ${boxShadow};
    border-radius: ${activeBorderRadius};
  }

  > input {
    flex: 1 0 0;
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    font-size: 16px;
  }

  > div.delete-button {
    cursor: pointer;
  }
`;

export const DropDownContainer = styled.ul`
  background-color: #ffffff;
  display: block;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  margin-top: -1px;
  // padding: 0.5rem 0;
  // border: 1px solid rgb(223, 225, 229);
  border-radius: 0 0 1rem 1rem;

  box-shadow: ${boxShadow};

  z-index: 3;

  > li {
    padding: 0.5rem 1rem;
    &.selected {
      background: rgba(225, 225, 225, 0.831);
    }
  }
  > li:hover {
    background: rgba(225, 225, 225, 0.831);
    cursor: pointer;
  }
`;

export const Autocomplete = () => {
  // hasText - input값의 유무를 확인
  const [hasText, setHasText] = useState(false);
  // inputValue - input값의 상태를 확인
  const [inputValue, setInputValue] = useState("");
  // options - input값 포함하는 autocomplete 추천 항목 리스트를 확인
  const [options, setOptions] = useState(deselectedOptions);

  // useEffect를 아래와 같이 활용할 수도 있습니다.
  useEffect(() => {
    if (inputValue === "") {
      setHasText(false);
    }
  }, [inputValue]);

  // input과 dropdown 상태 관리를 위한 handler
  const handleInputChange = (event) => {
    /* - input 값 변경(onChange)시 발생하는 이벤트 핸들러.
     * - input값과 상태를 연결시키는 controlled component.
     * - 추천항목이 dropdown으로 바로 바뀌는 상태로 변경.
     *
     * 1. input값 상태인 inputValue 갱신
     * 2. input값 유무 상태인 hasText 갱신
     * 3. options의 상태(추천항목)따라 dropdown으로 보이는 항목 갱신
     */
    const dropDownList = deselectedOptions.filter((el) =>
      el.includes(event.target.value)
    );
    setInputValue(event.target.value);
    setHasText(true);
    setOptions(dropDownList);
  };

  const handleDropDownClick = (clickedOption) => {
    /* - dropdown 항목 클릭 시(onClick)실행되는 이벤트 헨들러
     * - dropdown 항목 클릭 시 input값이 해당 항목의 값으로 변경
     *
     * 1. input값 상태인 inputValue 갱신
     * 2. options의 상태가 클릭된 항목만으로 갱신
     */
    setInputValue(clickedOption);
    setOptions([clickedOption]);
  };

  const handleDeleteButtonClick = () => {
    // - X버튼 클릭 시(onClick) input값 전부 삭제하는 이벤트 헨들러
    // 1. input값 상태인 inputValue를 빈 문자열로 초기화
    setInputValue("");
  };

  // Advanced Challenge: 상하 화살표 키 입력 시 dropdown 항목을 선택하고, Enter 키 입력 시 input값을 선택된 dropdown 항목의 값으로 변경하는 handleKeyUp 함수를 만들고,
  // 적절한 컴포넌트에 onKeyUp 핸들러를 할당합니다. state가 추가로 필요한지 고민하고, 필요 시 state를 추가하여 제작하세요.

  // 인덱스 0부터고, 처음시작할땐 아무것도 선택되지 않은 -1을 초기값 지정
  // 아래키누르면 0으로 바뀌면서 options[0] 선택하도록
  // 위 키누르면 index - 1 해주기
  const [selected, setSelected] = useState(-1);

  const handleKeyUp = (e) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState#example
    // eslint-disable-next-line
    if (
      e.getModifierState("Fn") ||
      e.getModifierState("Hyper") ||
      e.getModifierState("OS") ||
      e.getModifierState("Super") ||
      e.getModifierState("Win")
    )
      return;
    if (
      e.getModifierState("Control") +
        e.getModifierState("Alt") +
        e.getModifierState("Meta") >
      1
    )
      return;

    if (e.code === "ArrowUp" && selected >= 0) {
      setSelected(selected - 1);
    }
    if (e.code === "ArrowDown" && selected < options.length - 1) {
      setSelected(selected + 1);
    }
    if (e.code === "Enter" && selected >= 0) {
      // setInputValue(options[selected]);
      // setOptions(
      //   deselectedOptions.filter((el) => el.includes(options[selected]))
      // );
      handleDropDownClick(options[selected]);
      setSelected(-1);
    }
  };

  return (
    <div className="autocomplete-wrapper">
      <InputContainer>
        {/* input값(value) - state와 연결
        input값 변경 시 handleInputChange 함수  호출 */}
        {/* 삭제 버튼 - input 값, dropdown 삭제하는 handler 함수 */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyUp={(e) => handleKeyUp(e)}
        ></input>
        <div onClick={handleDeleteButtonClick} className="delete-button">
          &times;
        </div>
      </InputContainer>
      {/* 조건부 렌더링 - input 값 없으면? dropdown 미출력 */}
      <DropDown
        options={hasText ? options : []}
        handleComboBox={handleDropDownClick}
        selected={selected}
      />
    </div>
  );
};

export const DropDown = ({ options, handleComboBox, selected }) => {
  const dropDown = options.map((el, index) => (
    <li
      className={selected === index ? "selected" : ""}
      onClick={() => handleComboBox(el)}
      key={index}
    >
      {el}
    </li>
  ));
  return (
    <DropDownContainer>
      {/* input 값에 맞는 autocomplete 선택 옵션 보여주기*/}
      {dropDown}
    </DropDownContainer>
  );
};
