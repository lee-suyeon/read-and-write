let plays = {
  "hamlet": { "name": "Hamlet", "type": "tragedy" },
  "as-like": { "name": "As You Like It", "type": "comedy" },
  "othello": { "name": "Othello", "type": "tragedy" }
}

let invoice = 
  {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "hamlet",
        "audience": 55
      },
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othello",
        "audience": 40
      }
    ]
  }


// 공연료 청구서를 출력하는 코드
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})`
  const format = new Intl.NumberFormat("en-US", 
    { style: "currency", currency: "USD",
      minimumFractionDigits: 2 }).format;

  for(let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적

    // 희극 관객 5명마다 추가 포인트를 제공한다. 
    if("comedy" === playFor(perf).type)
      volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다. 
    result += `${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`; // thisAmount 변수를 인라인
    totalAmount += amountFor(perf); // thisAmount 변수를 인라인
  }
  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점 \n`;
  return result;
}

function amountFor(aPerformance) { // play 매개 변수 제거 
  let result = 0;

  switch(playFor(aPerformance).type) { 
    case "tragedy": // 비극
      result = 40000;
      if(aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy": // 희극
      result = 30000;
      if(aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
  }
  return result; // 함수의 반환값 
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

// volumeCredits의 복제본을 초기화한 뒤 계산 결과를 반환
function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audienc - 30, 0);

  if("commedy" === playFor(aPerformance).type)
  result += Math.floor(aPerformance.audience / 5);
  return result;
}

statement(invoice, plays)
// result
// 청구 내역 (고객명: BigCo)
// Hamlet: $650.00 (55석)
// As You Like It: $475.00 (35석)
// Othello: $500.00 (40석)
// 총액: $1,730.00
// 적립 포인트: 47점