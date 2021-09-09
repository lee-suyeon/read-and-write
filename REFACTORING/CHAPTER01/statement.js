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
  let volumeCredits = 0; // 포인트
  let result = `청구 내역 (고객명: ${invoice.customer})`
  const format = new Intl.NumberFormat("en-US", 
    { style: "currency", currency: "USD",
      minimumFractionDigits: 2 }).format;

  for(let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play);

    // 포인트를 적립한다. 
    volumeCredits += Math.max(perf.audience - 30, 0);

    // 희극 관객 5명마다 추가 포인트를 제공한다. 
    if("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다. 
    result += `${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점 \n`;
  return result;
}

// result
// 청구 내역 (고객명: BigCo)
// Hamlet: $650.00 (55석)
// As You Like It: $475.00 (35석)
// Othello: $500.00 (40석)
// 총액: $1,730.00
// 적립 포인트: 47점

function amountFor(perf, play) {
  let result = 0;

  switch(play.type) {
    case "tragedy": // 비극
      result = 40000;
      if(perf.audience > 30) {
        result += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy": // 희극
      result = 30000;
      if(perf.audience > 20) {
        result += 10000 + 500 * (perf.audience - 20);
      }
      result += 300 * perf.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`)
  }
  return result; // 함수의 반환값 
}
