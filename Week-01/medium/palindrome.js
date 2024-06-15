/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const notReqArr = [",", "?", " ", "!", "'", '"', "."];
  str = str.toLowerCase();
  let newStr = "";
  let revStr = "";
  const strArr = str.split("");
  strArr.forEach((letter) => {
    if (!notReqArr.includes(letter)) {
      revStr = letter + revStr;
      newStr = newStr + letter;
    }
  });
  return revStr === newStr;
}

module.exports = isPalindrome;
