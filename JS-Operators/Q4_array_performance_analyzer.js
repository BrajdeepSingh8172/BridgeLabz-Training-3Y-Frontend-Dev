const scores = Array.from({ length: 8 }, () => Math.floor(Math.random() * 71) + 30);
const highest = Math.max(...scores);
const lowest = Math.min(...scores);
const total = scores.reduce((sum, s) => sum + s, 0);
const average = total / scores.length;
const passedCount = scores.filter(s => s >= 50).length;
const labeled = scores.map(s => ({ score: s, status: s >= 50 ? "Pass" : "Fail" }));
const report = `\nArray Performance Analyzer\n---------------------------\nScores: ${scores.join(", ")}\nHighest: ${highest}\nLowest: ${lowest}\nAverage: ${average.toFixed(2)}\nPassed (>= 50): ${passedCount}/${scores.length}\nDetails: ${labeled.map(x => `${x.score}(${x.status})`).join(", ")}\n`;
console.log(report);
