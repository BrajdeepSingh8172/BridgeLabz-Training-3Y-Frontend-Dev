let count = 0;

function increment() {
  const prev = count;
  count += 1;
  function logUpdate(before, after) {
    console.log(`Count updated: ${before} -> ${after}`);
  }
  logUpdate(prev, count);
}

function decrement() {
  const prev = count;
  count -= 1;
  function logUpdate(before, after) {
    console.log(`Count updated: ${before} -> ${after}`);
  }
  logUpdate(prev, count);
}

console.log(`Initial count: ${count}`);
increment();
increment();
decrement();
increment();
