const phrase = $(".phrase").text();

const wordsNumbers = phrase.split(" ").length;
const $phraseLength = $(".number-of-words");

$phraseLength.text(wordsNumbers);


// Logic for When the User Type in the Textarea
const $typingField = $(".typing-field");
$typingField.on("input", function() {
    const content = $typingField.val();
    const wordsQuantity = content.split(/\s+/).length - 1;

    $("#counter-words").text(wordsQuantity);

    const charactersQuantity = content.length;
    $("#counter-characters").text(charactersQuantity);
});

let remainingTime = $("#remaining-time").text();
$typingField.one("focus", function() { // The "one()" listening only one time the event and the execution
    const timeCounter = setInterval(function() {
        remainingTime--;

        $("#remaining-time").text(remainingTime);

        if(remainingTime < 1) {
            $typingField.attr("disabled", true); // Get or set an attibute value of an HTML element
            // If the attribute not contains a value in the HTML, the second parameter defines if the attribute there are in the element or no

            clearInterval(timeCounter);
        }
    }, 1000);
});