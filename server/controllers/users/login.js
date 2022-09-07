const { USER_DATA } = require("../../db/data");
const session = require("express-session");

module.exports = (req, res) => {
  const { userId, password } = req.body.loginInfo;
  const { checkedKeepLogin } = req.body;
  const userInfo = {
    ...USER_DATA.filter(
      (user) => user.userId === userId && user.password === password
    )[0],
  };

  // console.log(req.body);
  // console.log(userInfo);

  const cookieOptions = {
    domain: `localhost`,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: `none`, // secure을 같이 작성해야 함
  };

  /* 이 때. userInfo === undefined 로 분기하면 안 돼요!
    빈 객체도 주소 값을 가지므로 제대로 작동하지 않음!!
    if (userInfo.id === undefined) <= 이렇게 userInfo에 아무 키나 찍어서 분기해주세요. 여기서는 첫번째로 들어오는 id로 분기함
 */

  // 로그인 실패시
  if (userInfo.id === undefined) {
    return res.status(401).send("Not Authorized");
  } else if (checkedKeepLogin) {
    // 로그인 상태 유지 - 로그인 유지 체크함
    cookieOptions.maxAge = 1000 * 60 * 30; //30분 뒤 소멸되는 Persistent Cookie
    res.cookie("cookieId", userInfo.id, cookieOptions);
    res.redirect("/userinfo");
  } else {
    // 로그인 상태 일시적 유지 - 로그인 유지 체크안함
    res.cookie("cookieId", userInfo.id, cookieOptions); // Expires 옵션이 없는 Session Cookie
    res.redirect("/userinfo");
  }
  /*
   * TODO: 로그인 로직을 구현하세요.
   *
   * userInfo에는 요청의 바디를 이용해 db에서 조회한 유저정보가 담겨있습니다. 콘솔에서 userInfo를 출력해보세요.
   * 유저의 정보가 출력된다면 해당 유저가 존재하는 것임으로 로그인 성공에 대한 응답을 전송해야 합니다.
   * 만약 undefined가 출력된다면 해당하는 유저가 존재하지 않는 것임으로 로그인 실패에 대한 응답을 전송해야 합니다.
   *
   * 로그인 성공 시에는 클라이언트에 쿠키를 전송해야합니다. 쿠키의 cookieId에는 userInfo.id가 담겨야 합니다.
   * 테스트케이스에서 요구하는 쿠키 옵션을 모두 설정하세요.
   * 영속성있는 쿠키를 보내려면 max-age 또는 expires 옵션을 설정하세요.
   *
   * 클라이언트에게 바로 응답을 보내지않고 서버의 /useinfo로 리다이렉트해야 합니다.
   * express의 res.redirect 메서드를 참고하여 서버의 /userinfo로 리다이렉트 될 수 있도록 구현하세요.
   */
};
