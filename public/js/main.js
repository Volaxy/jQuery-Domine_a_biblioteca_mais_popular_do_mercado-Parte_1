const phrase = $(".phrase").text();

const wordsNumbers = phrase.split(" ").length;
const $phraseLength = $(".number-of-words");

$phraseLength.text(wordsNumbers);


const $typingField = $(".typing-field");
$typingField.on("input", function() { // The "on()" execute a function when the event type in the 1º parameters is activated
    const content = $typingField.val(); // The "val()" gets the content value of an element
    const wordsQuantity = content.split(/\s+/).length - 1;

    $("#counter-words").text(wordsQuantity);

    const charactersQuantity = content.length;
    $("#counter-characters").text(charactersQuantity);
});