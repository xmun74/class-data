import { useState } from "react";

function Search({ onSearch, condition, setCondition }) {
  const [textDestination, setTextDestination] = useState("");

  const handleChange = (e) => {
    setTextDestination(e.target.value.toUpperCase());
  };

  const handleKeyPress = (e) => {
    if (e.type === "keypress" && e.code === "Enter") {
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    console.log("검색 버튼을 누르거나, 엔터를 치면 search 함수가 실행됩니다");
    // TODO: 지시에 따라 상위 컴포넌트에서 props를 받아서 실행시켜 보세요.
    // 방법1. test통과하기 위해 onSearch 사용
    onSearch({ departure: "ICN", destination: textDestination });
    // 2. condition props로 받아서 setCondition 갱신하는 방법
    // setCondition({ ...condition, destination: textDestination });

    // 3. setCondition받아서 prev => 사용하기
    // setCondition((prev) => {
    //   return { ...prev, destination: textDestination };
    // });
  };

  return (
    <fieldset>
      <legend>공항 코드를 입력하고, 검색하세요</legend>
      <span>출발지</span>
      <input id="input-departure" type="text" disabled value="ICN"></input>
      <span>도착지</span>
      <input
        id="input-destination"
        type="text"
        value={textDestination}
        onChange={handleChange}
        placeholder="CJU, BKK, PUS 중 하나를 입력하세요"
        onKeyPress={handleKeyPress}
      />
      <button id="search-btn" onClick={handleSearchClick}>
        검색
      </button>
    </fieldset>
  );
}

export default Search;
