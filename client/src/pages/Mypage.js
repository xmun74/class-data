import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./components/Loading";
import User from "./components/UserInfo";

export default function Mypage({ setIsLogin, accessToken }) {
  const [githubUser, setGithubUser] = useState(null);
  const [serverResource, setServerResource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logoutHandler = (accessToken) => {
    // TODO: /logout을 통해 사용자가 로그아웃되도록 구현하세요.
    // prop으로 받은 Access Token을 이용해 /logout 엔드포인트로 요청을 보내야합니다.
    // 요청이 성공했다면 isLogin 상태를 false로 업데이트해야 합니다.
    axios
      .delete("https://localhost:4000/logout", { accessToken }) // 쿠키확인하고 유저정보보내는 엔드포인트
      .then((res) => {
        console.log("로그아웃", res.data);
        setIsLogin(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    // TODO: /userinfo를 통해 사용자 정보를 받아오세요.
    // prop으로 받은 Access Token을 이용해 /userinfo 엔드포인트로 요청을 보내야합니다.
    // 응답으로 받은 데이터를 githubUser, serverResource의 상태로 업데이트해야합니다.
    // isLoading 상태를 false로 업데이트해야 합니다.

    axios
      .post("https://localhost:4000/userinfo", { accessToken })
      .then((res) => {
        const { githubUserData, serverResource } = res.data;
        setIsLoading(true);
        setGithubUser(githubUserData);
        setServerResource(serverResource);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [accessToken]);

  return (
    <>
      <div className="left-box">
        {!isLoading && (
          <span>
            {`${githubUser.login}`}님,
            <p>반갑습니다!</p>
          </span>
        )}
      </div>
      <div className="right-box">
        <div className="input-field">
          {isLoading ? (
            <Loading />
          ) : (
            <User
              githubUser={githubUser}
              serverResource={serverResource}
              logoutHandler={logoutHandler}
            />
          )}
        </div>
      </div>
    </>
  );
}
