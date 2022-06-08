import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// TODO : React Router DOM을 설치 후, import 구문을 이용하여 BrowserRouter, Routes, Route 컴포넌트를 불러옵니다.

import Sidebar from "./Sidebar";
import Tweets from "./Pages/Tweets";
import MyPage from "./Pages/MyPage";
import About from "./Pages/About";
// TODO : MyPage, About 컴포넌트를 import 합니다.

import "./App.css";

const App = (props) => {
  // const [value, setValue] = useState("");
  console.log("app :", props);
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Sidebar />
          <section className="features">
            {/* TODO : 유어클래스를 참고해서, 테스트 케이스를 통과하세요.
            TODO : React Router DOM 설치 후 BrowserRouter, Routes, Route의 주석을 해제하고 Routes, Route 컴포넌트를 적절하게 작성합니다. */}
            {/* Route 예시: <Route path="/" element={<Tweets />}></Route> */}
            <Routes>
              <Route path="/" element={<Tweets />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/mypage" element={<MyPage />}></Route>
            </Routes>
          </section>
        </main>
      </div>
    </BrowserRouter>
  );
};

// ! 아래 코드는 수정하지 않습니다.
export default App;
