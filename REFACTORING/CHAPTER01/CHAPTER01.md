## 01 리팩터링: 첫 번째 예시

---

<br />

> 프로그램이 새로운 기능을 추가하기에 편한 구조가 아니라면, 먼저 기능을 추가하기 쉬운 형태로 리팩터링하고 나서 원하는 기능을 추가한다.  
> -p.27

<br />

> 리팩터링하기 전에 제대로 된 테스트부터 마련한다. 테스트는 반드시 자가진단하도록 만든다.

<br />

> 먼저 전체 동작을 각각의 부분으로 나눌 수 있는 지점을 찾는다.

<br />

**함수 추출하기**

- 전체 동작을 각각의 부분으로 나눌 수 있는 지점을 찾는다. ➡️ **switch문**
- 추출한 함수에는 그 코드가 하는 일을 설명하는 이름을 지어준다.
- 유효범위를 벗어나는 변수, 즉 새 함수에서는 곧바로 사용할 수 없는 변수가 있는지 확인한다. ➡️ `play`, `perf`, `thisAmount`
  - play, perf는 값을 변경하지 않기 때문에 매개변수로 전달
  - thisAmount 함수 안에서 값이 바뀌는 변수

```javascript
function amountFor(perf, play) {
  // 값이 바뀌지 않는 변수는 매개변수로 전달
  let thisAmount = 0; // 변수를 초기화 하는 코드

  switch (play.type) {
    case "tragedy": // 비극
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy": // 희극
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`);
  }
  return thisAmount; // 함수 안에서 값이 바뀌는 변수 반환
}
```

**함수 추출하기 적용**

```javascript
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0; // 포인트
  let result = `청구 내역 (고객명: ${invoice.customer})`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];

    let thisAmount = amountFor(perf, play); // 추출한 함수 이용

    volumeCredits += Math.max(perf.audience - 30, 0);

    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    result += `${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점 \n`;
  return result;
}
```

<br />

> 간단한 수정이라도 리팩터링 후에는 항상 테스트하는 습관을 들이는 것이 바람직하다.

<br />

> 리팩터링은 프로그램 수정을 작은 단계로 나눠 진행한다. 그래서 중간에 실수하더라도 버그를 쉽게 찾을 수 있다.
