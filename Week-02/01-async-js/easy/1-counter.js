// Create a counter in JavaScript

// We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
// It should go up as time goes by in intervals of 1 second
function counter() {
  let n = 0;
  setInterval(() => {
    console.log(`\x1B[2J\x1B[0;0H${n}`);
    n++;
  }, 1000);
}

counter();
