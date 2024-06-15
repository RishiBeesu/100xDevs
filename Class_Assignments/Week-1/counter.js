// Create a counter in Javascript (counts down from 30 to 0)

function counter() {
  let n = 30;
  setInterval(function () {
    if (n >= 0) {
      console.log(`\x1B[2J\x1B[0;0H${n}`);
      n--;
    } else {
      process.exit(0);
    }
  }, 1000);
}

counter();
