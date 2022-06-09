import React, { useState } from "react";
import Footer from "../Footer";
import Tweet from "../Components/Tweet";
import "./Tweets.css";
import dummyTweets from "../static/dummyData";

// 배열에 unshift 추가해도 안되는 이유>>
// state가 렌더링 조건 -  새로운배경 새주소여야 렌더링된다
// states는 주소값이 바뀐 거를 본다. 근데 unshift해도 늦게되긴 하지만 렌더링 되는데??
// username, msg state때문에 렌더링된거임, Lists 렌더링된거 아님!!! --> 그래서 list를 새 배열, 새 주소에 넣어줘야 함
const Tweets = (props) => {
  const [username, setUsername] = useState("parkhacker");
  const [msg, setMsg] = useState("");
  const [Lists, setLists] = useState(dummyTweets);
  const [choice, setChoice] = useState(""); // select 사용자 조회메뉴
  const [filteredTweets, setIsFilteredTweets] = useState(dummyTweets);

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
    // dummyTweets.unshift(tweet);  // 기존 배열,주소에 추가 mutable
    setLists([tweet, ...Lists]); // 새로운 배열,주소에 추가 immutable
  };

  const handleChangeUser = (event) => {
    // TODO : Tweet input 엘리먼트에 입력 시 작동하는 함수를 완성하세요.
    setUsername(event.target.value);
  };

  const handleChangeMsg = (event) => {
    // TODO : Tweet textarea 엘리먼트에 입력 시 작동하는 함수를 완성하세요.
    setMsg(event.target.value);
  };

  const filterUser = Lists.filter((user) => user.username === choice);

  const mapUsers = Lists.map((el) => el.username);
  const options = mapUsers.map((el, idx) => {
    return (
      <option key={idx} value={el}>
        {el}
      </option>
    );
  });

  // 내 코드 - filter기능
  const handleSelectUser = (event) => {
    setChoice(event.target.value);
  };

  // 강사님 코드 - filter기능
  const handleFilter = (event) => {
    if (event.target.value === "cola") {
      setLists(Lists);
      setChoice(false);
    } else {
      const filtered = Lists.filter(
        (tweet) => tweet.username === event.target.value
      );
      setChoice(true);
      setIsFilteredTweets(filtered);
    }
  };
  const handleDelete = (username, deleteidx) => {
    const deletes = Lists.filter((tweet, idx) => idx !== deleteidx);
    setLists(deletes);
  };
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
        <select onChange={handleFilter}>
          <option value="">-- click to filter tweets by username --</option>
          {options}
        </select>
      </div>
      <ul className="tweets">
        {/* TODO : 하나의 트윗이 아니라, 주어진 트윗 목록(dummyTweets) 갯수에 맞게 보여줘야 합니다. */}
        {/* select 하면 선택된것만 출력 : 아니면 전체출력 */}
        {choice
          ? filteredTweets.map((tweet, idx) => {
              return (
                <Tweet
                  tweet={tweet}
                  key={tweet.id}
                  handleDelete={handleDelete}
                  idx={idx}
                />
              );
            })
          : Lists.map((tweet, idx) => {
              return (
                <Tweet
                  tweet={tweet}
                  key={tweet.id}
                  handleDelete={handleDelete}
                  idx={idx}
                />
              );
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
