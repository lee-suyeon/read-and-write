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
  const statementData = {};
  statementData.customer = invoice.customer; 
  statementData.performances = invoice.performances.map(enrichPerformance);
  return renderPlainText(statementData, plays);

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance); 
    result.play = playFor(result); 
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  function playFor(aPerformance) { 
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) { 
    let result = 0;

    switch(aPerformance.play.type) { 
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
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
    }
    return result; // 함수의 반환값 
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if("commedy" === aPerformance.play.type)
    result += Math.floor(aPerformance.audience / 5);
    return result;
  }
}

function renderPlainText(data, plays) { 
  let result = `청구 내역 (고객명: ${data.customer})`
  for(let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }
  result += `총액: ${usd(totalAmount())}\n`; 
  result += `적립 포인트: ${totalVolumeCredits()}점 \n`;
  console.log('result', result)
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", 
                        { style: "currency", currency: "USD",
                          minimumFractionDigits: 2 }).format(aNumber/100);
  }

  function totalVolumeCredits() {
    let result = 0; // 변수 선언(초기화)을 반복문 앞으로 이동
    for(let perf of data.performances) { // 값 누적 로직을 별도 for 문으로 분리
      result += perf.volumeCredits;
    }
    return result;
  }

  function totalAmount() { // 함수 이름 변경
    let result = 0;
    for(let perf of data.performances) {
      result += perf.amount;
    }
    return result;
  }
}

statement(invoice, plays)
// result
// 청구 내역 (고객명: BigCo)
// Hamlet: $650.00 (55석)
// As You Like It: $475.00 (35석)
// Othello: $500.00 (40석)
// 총액: $1,730.00
// 적립 포인트: 47점