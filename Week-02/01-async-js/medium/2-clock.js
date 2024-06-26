// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats -

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

function clock(format) {
  setInterval(function () {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    minutes = minutes >= 10 ? minutes : `0${minutes}`;
    seconds = seconds >= 10 ? seconds : `0${seconds}`;
    if (format === "HH:MM::SS") {
      hours = hours >= 10 ? hours : `0${hours}`;
      console.log(`\x1B[2J\x1B[0;0H${hours}:${minutes}:${seconds}`);
    } else if (format === "HH:MM::SS AM/PM") {
      let indicator;
      if (hours > 12) {
        hours = hours - 12;
        indicator = "PM";
      } else {
        indicator = "AM";
      }
      hours = hours >= 10 ? hours : `0${hours}`;
      console.log(
        `\x1B[2J\x1B[0;0H${hours}:${minutes}:${seconds} ${indicator}`
      );
    }
  }, 1000);
}

clock("HH:MM::SS AM/PM");
