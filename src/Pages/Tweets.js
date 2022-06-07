// TODO : useState를 react로 부터 import 합니다.
import React, { useState } from "react";
import Footer from "../Footer";
import Tweet from "../Components/Tweet";
import "./Tweets.css";
import dummyTweets from "../static/dummyData";

const Tweets = () => {
  // TODO : 새로 트윗을 작성하고 전송할 수 있게 useState를 적절히 활용하세요.
  const [username, setUsername] = useState("parkhacker");
  const [msg, setMsg] = useState("");
  const [countS, setCountS] = useState(dummyTweets.length);

  const [List, setList] = useState(dummyTweets);

  // input, textarea 내용을 제출버튼을 누르면 unshift로 최상단에 추가해라
  const handleButtonClick = (event) => {
    const createdAt = new Date().toLocaleDateString("ko-kr");
    const picture = dummyTweets[0].picture;
    const tweet = {
      username,
      content: msg,
      createdAt,
      picture,
      id: String(Date.now()),
    };
    // TODO : Tweet button 엘리먼트 클릭시 작동하는 함수를 완성하세요.
    // 트윗 전송이 가능하게 작성해야 합니다.
    setList(dummyTweets.unshift(tweet));
    // dummyTweets.unshift(tweet);
    setCountS(countS + 1);
  };

  const handleChangeUser = (event) => {
    // TODO : Tweet input 엘리먼트에 입력 시 작동하는 함수를 완성하세요.
    setUsername(event.target.value);
  };

  const handleChangeMsg = (event) => {
    // TODO : Tweet textarea 엘리먼트에 입력 시 작동하는 함수를 완성하세요.
    setMsg(event.target.value);
  };

  // tweets들 모두 보여주기
  // function show(el) {
  //   return <Tweet tweet={el} />;
  // }

  return (
    <React.Fragment>
      <div className="tweetForm__container">
        <div className="tweetForm__wrapper">
          <div className="tweetForm__profile">
            <img src="https://randomuser.me/api/portraits/men/98.jpg" />
          </div>
          <div className="tweetForm__inputContainer">
            <div className="tweetForm__inputWrapper">
              <div className="tweetForm__input">
                <input
                  type="text"
                  defaultValue="parkhacker"
                  placeholder="your username here.."
                  className="tweetForm__input--username"
                  onChange={handleChangeUser}
                  // value={username}
                ></input>
                <textarea
                  className="tweetForm__input--message"
                  placeholder="input your tweet.."
                  onChange={handleChangeMsg}
                  // value={msg}
                ></textarea>
              </div>
              <div className="tweetForm__count" role="status">
                <span className="tweetForm__count__text">
                  {/* TODO : 트윗 총 개수를 보여줄 수 있는 Counter를 작성하세요. */}
                  {"total: " + countS}
                </span>
              </div>
            </div>
            <div className="tweetForm__submit">
              <div className="tweetForm__submitIcon">
                {/* TODO : 작성한 트윗을 전송할 수 있는 button 엘리먼트를 작성하세요. */}
                <button
                  className="tweetForm__submitButton"
                  onClick={handleButtonClick}
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tweet__selectUser"></div>
      <ul className="tweets">
        {/* TODO : 하나의 트윗이 아니라, 주어진 트윗 목록(dummyTweets) 갯수에 맞게 보여줘야 합니다. */}
        {dummyTweets.map((tweet) => {
          return <Tweet tweet={tweet} key={tweet.id} />;
        })}
      </ul>
      <Footer />
    </React.Fragment>
  );
};

export default Tweets;
