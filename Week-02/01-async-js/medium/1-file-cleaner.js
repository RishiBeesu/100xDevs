// File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require("fs");

function readFromFile() {
  return new Promise(function (resolve) {
    fs.readFile("a.txt", "utf-8", (err, data) => {
      resolve(data);
    });
  });
}

async function writeToFile() {
  let data = await readFromFile();
  data = data.trim();
  dataArr = data.split("");
  let spaceCount = 0;
  let newStr = "";
  dataArr.forEach((letter) => {
    if (letter !== " ") {
      newStr += letter;
      spaceCount = 0;
    } else if (letter === " " && spaceCount === 0) {
      spaceCount += 1;
      newStr += letter;
    }
  });
  fs.writeFile("a.txt", newStr, "utf-8", () => {
    console.log("Data modified and written to file.");
  });
}

writeToFile();
