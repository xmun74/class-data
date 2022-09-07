const calculator = document.querySelector(".calculator"); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector(".calculator__buttons"); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector(".calculator__operend--left"); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector(".calculator__operator"); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector(".calculator__operend--right"); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector(".calculator__result"); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

function calculate(n1, operator, n2) {
  let result = 0;
  n1 = Number(n1);
  n2 = Number(n2);
  if (operator === "+") {
    result = n1 + n2;
  }
  if (operator === "-") {
    result = n1 - n2;
  }
  if (operator === "*") {
    result = n1 * n2;
  }
  if (operator === "/") {
    result = n1 / n2;
  }
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.
  return String(result);
}

buttons.addEventListener("click", function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

  // TODO : 계산기가 작동할 수 있도록 아래 코드를 수정하세요. 작성되어 있는 조건문과 console.log를 활용하시면 쉽게 문제를 풀 수 있습니다.
  // 클릭된 HTML 엘리먼트가 button이면
  if (action === "number") {
    // 그리고 버튼의 클레스가 number이면
    // 아래 코드가 작동됩니다.
    if (firstOperend.textContent === "0") {
      firstOperend.textContent = buttonContent;
    } else {
      secondOperend.textContent = buttonContent;
    }
    console.log("숫자 " + buttonContent + " 버튼");
  }

  if (action === "operator") {
    operator.textContent = buttonContent;
    console.log("연산자 " + buttonContent + " 버튼");
  }

  if (action === "decimal") {
    console.log("소수점 버튼");
  }

  if (action === "clear") {
    firstOperend.textContent = "0";
    secondOperend.textContent = "0";
    calculatedResult.textContent = "0";
    console.log("초기화 버튼");
  }

  if (action === "calculate") {
    calculatedResult.textContent = calculate(
      firstOperend.textContent,
      operator.textContent,
      secondOperend.textContent
    );
    console.log("계산 버튼");
  }
});

// ! Advanced Challenge test와 Nightmare test를 위해서는 아래 주석을 해제하세요.

const display = document.querySelector(".calculator__display--for-advanced"); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum = "",
  operatorForAdvanced = "",
  previousKey = "",
  previousNum = "";

buttons.addEventListener("click", function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드는 수정하지 마세요.

  // ! 여기서부터 Advanced Challenge & Nightmare 과제룰 풀어주세요.
  if (target.matches("button")) {
    if (action === "number") {
      if (display.textContent === "0" && operatorForAdvanced === "") {
        // 연산자 누르기 전 초기 입력값
        display.textContent = buttonContent;
        firstNum = display.textContent; // 이거를 2번째 에다가만 넣어줘서 한자리수 연산이 안됐음,.;;
      } else if (display.textContent !== "0" && operatorForAdvanced === "") {
        //연산자 누르기전 초기완료값
        display.textContent = display.textContent + buttonContent;
        firstNum = display.textContent;
        console.log("2번째");
      } else if (display.textContent !== "0" && operatorForAdvanced !== "") {
        // 오퍼레이터가 누르고 그후, 앞에 값은 퍼스트 넘에 저장되었고
        // 위아래 같이해서 했지만 4번째 조건값으로 넘어가지 못하고 3번째에서 걸러졌다, 그렇기에 디스플레이를 건들수 없으니깐 opreator에다가 조건을...달아보자,
        if (display.textContent.includes(".") === true && previousNum === "") {
          console.log("여기?");
          previousKey = display.textContent;
          display.textContent = "0.";
        }
        if (previousKey === operatorForAdvanced) {
          display.textContent = buttonContent;
          previousKey = display.textContent; // 1을 할당 하는 이유는 3번째 if 에서 걸러주기 위한, 즉 else 까지 전달!
          previousNum = display.textContent; // 12 + 34
          console.log("3번째");
        } else if (previousKey !== operatorForAdvanced) {
          display.textContent = display.textContent + buttonContent;
          previousNum = display.textContent;
        }

        // }else if(display.textContent !== '0' && operatorForAdvanced !== ''){
        //   display.textContent = display.textContent + buttonContent;
        //   console.log('4')
        // }
      }
    }

    if (action === "operator") {
      operatorForAdvanced = buttonContent;
      previousKey = operatorForAdvanced;
    }
    if (action === "decimal") {
      if (display.innerText !== "." && firstNum.includes(".") === false) {
        // 디스플레이에 . 가 없는경우 솔직히 이게될줄 몰랐다.//
        display.innerText = firstNum + buttonContent;
        firstNum = display.innerText;
      }
      if (operatorForAdvanced !== "") {
        display.innerText = ".";
      } else {
        display.innerText = previousNum + buttonContent;
      }
    }
    if (action === "clear") {
      display.textContent = "0";
      firstNum = "";
      previousNum = "";
      operatorForAdvanced = "";
      previousKey = "";
    }
    if (action === "calculate") {
      // 3 + 3 = 6 12,34  12first previ 3 , prenum 34
      if (previousNum < 1) {
        display.textContent = calculate(
          firstNum.slice(0.3),
          operatorForAdvanced,
          previousNum
        );
      }
      if (firstNum !== "" && previousNum === "") {
        display.textContent = calculate(
          firstNum,
          operatorForAdvanced,
          firstNum
        );
      }
      if (firstNum === previousKey) {
        display.textContent = calculate(
          display.textContent,
          operatorForAdvanced,
          firstNum
        );
      }
      if (previousKey === display.textContent) {
        //12+34
        display.textContent = calculate(
          firstNum,
          operatorForAdvanced,
          previousNum
        );
      }
    }
  }
});
