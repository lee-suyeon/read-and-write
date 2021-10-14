import createStatementData from './createStatementData';

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

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data, plays) { 
  let result = `청구 내역 (고객명: ${data.customer})`
  for(let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }
  result += `총액: ${usd(data.totalAmount)}\n`; 
  result += `적립 포인트: ${data.totalVolumeCredits}점 \n`;
  return result;
}

function htmlStatement(invoice, plays) { 
  return renderHtml(createStatementData(invoice, plays)); // 중간 데이터 생성 함수를 공유
}

function renderHtml(data) { 
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h>\n`;
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석 수></th><th>금액</th></tr>";
  for(let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>\n`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`; 
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", 
                      { style: "currency", currency: "USD",
                        minimumFractionDigits: 2 }).format(aNumber/100);
}

statement(invoice, plays)
// result
// 청구 내역 (고객명: BigCo)
// Hamlet: $650.00 (55석)
// As You Like It: $475.00 (35석)
// Othello: $500.00 (40석)
// 총액: $1,730.00
// 적립 포인트: 47점