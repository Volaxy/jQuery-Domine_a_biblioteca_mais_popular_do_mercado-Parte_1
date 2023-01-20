const phrase = $(".phrase").text();
// The "$" is a shorthand for jQuery(".phrase")
// The ".text()" gets the text content of an element

const wordsNumbers = phrase.split(" ").length;
const $phraseLength = $(".number-of-words");

$phraseLength.text(wordsNumbers);