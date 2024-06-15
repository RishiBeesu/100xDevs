// calculate the time it takes between a setTimeout call and the inner function actually running

let before = new Date();
let beforeTime = before.getTime();
let p = new Promise(function (resolve) {
  setTimeout(function () {
    let after = new Date();
    let afterTime = after.getTime();
    resolve(afterTime);
  }, 1000);
});
p.then(function (afterTime) {
  console.log(afterTime - beforeTime);
});
