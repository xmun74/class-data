import { useState } from "react";
import styled from "styled-components";

// TODO: Styled-Component 라이브러리를 활용해 여러분만의 tag 를 자유롭게 꾸며 보세요!

export const TagsInput = styled.div`
  margin: 8rem auto;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  width: 480px;
  padding: 0 8px;
  border: 1px solid rgb(214, 216, 218);
  border-radius: 6px;

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;

    > .tag {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      padding: 0 8px;
      font-size: 14px;
      list-style: none;
      border-radius: 6px;
      margin: 0 8px 8px 0;
      background: #e84118;
      > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        margin-left: 8px;
        color: #4000c7;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
      }
    }
  }

  > input {
    flex: 1;
    border: none;
    height: 46px;
    font-size: 14px;
    padding: 4px 0 0 0;
    :focus {
      outline: transparent;
    }
  }

  &:focus-within {
    border: 1px solid #4000c7;
  }
`;

export const Tag = () => {
  const initialTags = ["CodeStates", "kimcoding"];

  const [tags, setTags] = useState(initialTags);

  // 삭제 - 클릭된 index 제거
  const removeTags = (indexToRemove) => {
    const res = tags.filter((el, idx) => idx !== indexToRemove);
    setTags(res);
  };

  // 추가 - tags 배열에 새로운 태그 추가
  const addTags = (e) => {
    let newTag = e.target.value;
    // 1. 아무것도 입력하지 않은 채 Enter 키 입력시 메소드 실행하지 말기
    // 2. 태그가 추가되면 input 창 비우기
    if (e.key === "Enter" && newTag.trim() !== "") {
      // 3. 이미 입력되어 있는 태그인지 검사하여 이미 있는 태그라면 추가하지 말기
      if (tags.includes(newTag)) {
        window.alert("중복된 태그입니다");
        return null;
      }
      // 태그 개수 10개로 제한
      if (tags.length > 10) {
        window.alert("더이상 태그를 추가할 수 없습니다!");
        e.target.value = "";
      }
      // 새 태그 추가 - 배열 뒤에 추가
      else {
        setTags([...tags, newTag]);
        e.target.value = "";
      }
    }
  };

  return (
    <>
      <TagsInput>
        <ul id="tags">
          {tags.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              {/* 삭제 아이콘 click 시, removeTags 메소드 실행 */}
              <span
                className="tag-close-icon"
                //함수() 실행문 => 쓰려면 콜백함수로 써야한다
                onClick={() => removeTags(index)}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
        <input
          className="tag-input"
          type="text"
          // 엔더키 누르면 태그 추가, {addTags}만 전달해도 됨
          onKeyUp={(e) => addTags(e)}
          placeholder="Press enter to add tags"
        />
      </TagsInput>
    </>
  );
};
