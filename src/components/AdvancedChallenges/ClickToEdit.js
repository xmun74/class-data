import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

export const InputBox = styled.div`
  text-align: center;
  display: inline-block;
  width: 150px;
  height: 30px;
  border: 1px #bbb dashed;
  border-radius: 10px;
  margin-left: 1rem;
`;

export const InputEdit = styled.input`
  text-align: center;
  display: inline-block;
  width: 150px;
  height: 30px;
`;

export const InputView = styled.div`
  text-align: center;
  align-items: center;
  margin-top: 3rem;

  div.view {
    margin-top: 3rem;
  }
`;

export const MyInput = ({ value, handleValueChange }) => {
  const inputEl = useRef(null);
  const [isEditMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(value);

  // 수정가능 상태일 시, 포커스 두기
  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  // 수정가능 상태 - isEditMode 변경
  const handleClick = () => {
    setEditMode(true);
  };

  // 포커스 해제하면 - 수정불가능 상태로 변경 + newValue값 전달
  const handleBlur = () => {
    handleValueChange(newValue); // newValue값 전달
    setEditMode(false); // 수정불가능 상태
  };

  // input 입력시(onChange) - 저장된 value 입력값으로 갱신
  const handleInputChange = (e) => {
    setNewValue(e.target.value);
  };

  return (
    <InputBox>
      {isEditMode ? (
        <InputEdit
          type="text"
          value={newValue}
          ref={inputEl}
          // 포커스를 잃으면, Edit가 불가능한 상태로 변경되는 메소드
          onBlur={handleBlur}
          // input 값 변경되면, 저장된 value를 업데이트하는 메소드
          onChange={handleInputChange}
        />
      ) : (
        <span
          // input 글자 클릭시 - 수정 가능한 상태로 변경
          onClick={handleClick}
        >
          {newValue}
        </span>
      )}
    </InputBox>
  );
};

const cache = {
  name: "김코딩",
  age: 20,
};

export const ClickToEdit = () => {
  const [name, setName] = useState(cache.name);
  const [age, setAge] = useState(cache.age);

  return (
    <>
      <InputView>
        <label>이름</label>
        <MyInput
          value={name}
          handleValueChange={(newValue) => setName(newValue)}
        />
      </InputView>
      <InputView>
        <label>나이</label>
        <MyInput
          value={age}
          handleValueChange={(newValue) => setAge(newValue)}
        />
      </InputView>
      <InputView>
        <div className="view">
          이름 {name} 나이 {age}
        </div>
      </InputView>
    </>
  );
};
