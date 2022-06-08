import React, { useState } from "react";
import Footer from "../Footer";
import Tweet from "../Components/Tweet";
import "./Tweets.css";
import dummyTweets from "../static/dummyData";

const Tweets = (props) => {
  const [username, setUsername] = useState("parkhacker");
  const [msg, setMsg] = useState("");
  const [Lists, setLists] = useState(dummyTweets);

  // input, textarea 내용을 제출버튼을 누르면 unshift로 최상단에 추가해라
  const handleButtonClick = (event) => {
    const createdAt = new Date().toLocaleDateString("ko-kr");
    const picture = dummyTweets[0].picture;
    const tweet = {
      id: String(Date.now()),
      username,
      picture,
      content: msg,
      createdAt,
      updatedAt: createdAt,
    };
    // TODO : Tweet button 엘리먼트 클릭시 트윗 전송이 작동되는 함수를 완성하세요.
    // dummyTweets.unshift(tweet);  // 기존배열에 추가 mutable
    setLists([tweet, ...Lists]); // 새로운 배열에 추가 immutable
    // dummyTweets.unshift(tweet); // mypage를 위한 추가.
  };

  const handleChangeUser = (event) => {
    // TODO : Tweet input 엘리먼트에 입력 시 작동하는 함수를 완성하세요.
    setUsername(event.target.value);
  };

  const handleChangeMsg = (event) => {
    // TODO : Tweet textarea 엘리먼트에 입력 시 작동하는 함수를 완성하세요.
    setMsg(event.target.value);
  };

  // select 사용자 조회메뉴
  const [choice, setChoice] = useState("");

  const filterUser = Lists.filter((user) => user.username === choice);
  const mapUsers = Lists.map((el) => el.username);
  const options = mapUsers.map((name, idx) => {
    return (
      <option key={idx} value={name}>
        {name}
      </option>
    );
  });
  const handleSelectUser = (event) => {
    setChoice(event.target.value);
  };

  // const onRemove = (id) => {
  //   setLists(Lists.filter((user) => user.id !== id));
  // };
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
                  {"total: " + Lists.length}
                </span>
              </div>
            </div>
            <div className="tweetForm__submit">
              <div className="tweetForm__submitIcon"></div>
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
      <div className="tweet__selectUser">
        <select onChange={handleSelectUser}>
          <option value="">-- click to filter tweets by username --</option>
          {options}
        </select>
      </div>
      <ul className="tweets">
        {/* TODO : 하나의 트윗이 아니라, 주어진 트윗 목록(dummyTweets) 갯수에 맞게 보여줘야 합니다. */}
        {/* select 하면 선택된것만 출력 : 아니면 전체출력 */}
        {choice !== ""
          ? filterUser.map((tweet) => {
              return <Tweet tweet={tweet} key={tweet.id} />;
            })
          : Lists.map((tweet) => {
              return <Tweet tweet={tweet} key={tweet.id} />;
            })}

        {/* {Lists.map((tweet) => {
          return <Tweet tweet={tweet} key={tweet.id} />;
        })} */}
      </ul>
      <Footer />
    </React.Fragment>
  );
};
export default Tweets;
