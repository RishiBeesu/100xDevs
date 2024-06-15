/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  str1Arr = str1.toLowerCase().split("");
  str1Arr = str1Arr.sort();
  str2Arr = str2.toLowerCase().split("");
  str2Arr = str2Arr.sort();
  return str1Arr.toString() === str2Arr.toString();
}

module.exports = isAnagram;
