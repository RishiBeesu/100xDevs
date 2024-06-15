// Create a terminal clock (HH:MM:SS)

function clock() {
  setInterval(function () {
    let now = new Date();
    let hours = now.getHours();
    hours = hours >= 10 ? hours : `0${hours}`;
    let minutes = now.getMinutes();
    minutes = minutes >= 10 ? minutes : `0${minutes}`;
    let seconds = now.getSeconds();
    seconds = seconds >= 10 ? seconds : `0${seconds}`;
    console.log(`\x1B[2J\x1B[0;0H${hours}:${minutes}:${seconds}`);
  }, 1000);
}

clock();
