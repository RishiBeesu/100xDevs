// Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs");

data = "Hello Milkyway!!!";

fs.writeFile("b.txt", data, "utf-8", (err) => {
  if (err) {
    console.log(`error recieved: ${err}`);
  } else {
    console.log("Written to file successfully");
  }
});
