// Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.
function waitOneSecond() {
  let p = new Promise(function (resolve) {
    setTimeout(() => {
      resolve("one second done");
    }, 1000);
  });
  return p;
}

async function counter() {
  let n = 0;
  while (true) {
    let value = await waitOneSecond();
    console.log(`\x1B[2J\x1B[0;0H${n}`);
    n++;
  }
}

counter();

// (Hint: setTimeout)
