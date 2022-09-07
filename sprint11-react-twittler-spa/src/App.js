import React from "react";
import "./App.css";
// TODO - react-router-dom을 설치 후, import 구문을 이용하여 BrowserRouter, Routes, Route 컴포넌트를 불러오세요.
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Tweets from "./Pages/Tweets";
// TODO - import문을 이용하여 MyPage, About 컴포넌트를 불러오세요.
import MyPage from "./Pages/MyPage";
import About from "./Pages/About";

const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* TODO - BrowserRouter 컴포넌트를 작성합니다. */}
      <div className="App">
        {/* () => 함수명을 써줘야 바로 실행이 안되고 눌러야 실행되게 한다 */}
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        <button onClick={() => navigate(1)}>앞으로가기</button>
        <main>
          <Sidebar />
          <section className="features">
            {/* TODO - Routes와 Route 컴포넌트를 이용하여 경로(path)를 설정하고 Tweets, Mypage, About 컴포넌트를 연결합니다. */}
            <Routes>
              <Route path="/" element={<Tweets />} />
              <Route path="/about" element={<About />} />
              <Route path="/mypage" element={<MyPage />} />
            </Routes>
            {/* <Tweets /> */}
          </section>
        </main>
      </div>
    </div>
  );
};

// ! 아래 코드는 수정하지 않습니다.
export default App;
