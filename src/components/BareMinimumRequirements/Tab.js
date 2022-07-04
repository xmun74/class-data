import { useState } from "react";
import styled from "styled-components";

// TODO: Styled-Component 라이브러리를 활용해 TabMenu 와 Desc 컴포넌트의 CSS를 구현합니다.

const TabMenu = styled.ul`
  background-color: #dcdcdc;
  color: rgba(73, 73, 73, 0.5);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  margin-bottom: 7rem;

  .submenu {
    width: 100%;
    padding: 15px 10px;
    cursor: pointer;
    transition: 0.4s;
  }

  .focused {
    background-color: #e84118;
    color: white;
  }

  // 뭔지 모르겠는 거
  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  text-align: center;
  .menuContent {
    font-size: 32px;
  }
`;

export const Tab = () => {
  // currentTab: 현재 어떤 Tab이 선택됐는지 확인하기 위한 index상태 (초기값은 0)
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "Tab1", content: "Tab menu ONE" },
    { name: "Tab2", content: "Tab menu TWO" },
    { name: "Tab3", content: "Tab menu THREE" },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
    // TIP: parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않습니다
    // TODO : 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신되도록 함수를 완성하세요.
  };

  const menuTab = menuArr.map((el, index) => (
    <li
      key={index}
      onClick={() => selectMenuHandler(index)}
      className={currentTab === index ? "submenu focused" : "submenu"}
    >
      {el.name}
    </li>
  ));

  return (
    <>
      <div>
        <TabMenu>
          {/*TIP: li 엘리먼트의 class명의 경우 선택된 tab 은 'submenu focused' 가 되며, 
                  나머지 2개의 tab은 'submenu' 가 됩니다.*/}
          {menuTab}
        </TabMenu>
        <Desc>
          {/* 현재 선택된 메뉴의 content를 표시 */}
          <p className="menuContent">{menuArr[currentTab].content}</p>
        </Desc>
      </div>
    </>
  );
};
