const x = 16.75;
const rounded = Math.round(x);
const squareRoot = Math.sqrt(x);
const power = Math.pow(x, 3);
const randomBetween10And50 = Math.floor(Math.random() * 41) + 10; // 10..50 inclusive
const summary = `\nMath Utility Summary\n---------------------\nInput x: ${x}\nRounded: ${rounded}\nSquare Root: ${squareRoot}\nPower x^3: ${power}\nRandom [10,50]: ${randomBetween10And50}\n`;
console.log(summary);
