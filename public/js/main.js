const initialTime = $("#remaining-time").text();

const $typingField = $(".typing-field");


// $(document).ready(... is the same of code below
$(function() {
    updatePhraseLength();
    initializeCounters();
    initializeTimer();

    $("#restart-button").click(restartGame);

    verifyText();
});

function verifyText() {
    const phrase = $(".phrase").text();
    $typingField.on("input", function() {
        const typingValue = $typingField.val();
        
        if(phrase.startsWith(typingValue)) {
            $typingField.addClass("typing-field--green-border");
            $typingField.removeClass("typing-field--red-border");
        } else {
            $typingField.addClass("typing-field--red-border");
            $typingField.removeClass("typing-field--green-border");
        }
    });
}


function updatePhraseLength() {
    const phrase = $(".phrase").text();

    const wordsNumbers = phrase.split(" ").length;
    const $phraseLength = $(".number-of-words");

    $phraseLength.text(wordsNumbers);
}


function initializeCounters() {
    $typingField.on("input", function() {
        const content = $typingField.val();
        const wordsQuantity = content.split(/\s+/).length - 1;

        $("#counter-words").text(wordsQuantity);
        
        const charactersQuantity = content.length;
        $("#counter-characters").text(charactersQuantity);

        $("#restart-button").attr("disabled", true);
    });
}


function initializeTimer() {
    let remainingTime = $("#remaining-time").text();
    
    $typingField.one("focus", function() {
        const timeCounter = setInterval(function() {
            remainingTime--;
            
            $("#remaining-time").text(remainingTime);
            
            if(remainingTime < 1) {
                endGame();
                
                clearInterval(timeCounter);
            }
        }, 1000);
    });
}

function endGame() {
    $typingField.attr("disabled", true);
    $("#restart-button").attr("disabled", false);

    $typingField.addClass("typing-field--disabled");

    $typingField.removeClass("typing-field--red-border");
    $typingField.removeClass("typing-field--green-border");

    scoreBoard();
}

function scoreBoard() {
    const $tbody = $(".score-board").find("tbody");
    const wordsCount = $("#counter-words").text();
    const user = "Volaxy";

    const $tr = createLine(user, wordsCount);
    $tr.find(".remove-button").click(removeLine);

    $tbody.append($tr); // The "prepend" adds before the element
}

function createLine(user, wordsCount) {
    const $tr = $("<tr>");

    const $tdUser = $("<td>").text(user);
    const $tdWords = $("<td>").text(wordsCount);
    
    const $tdRemoveButton = $("<td>");
    const $a = $("<a>")
        .addClass("remove-button")
        .attr("href", "#");
    const $i = $("<i>")
        .addClass("material-icons")
        .text("delete");

    $a.append($i);
    $tdRemoveButton.append($a);
    
    $tr.append($tdUser);
    $tr.append($tdWords);
    $tr.append($tdRemoveButton);

    return $tr;
}

function removeLine(event) {
    event.preventDefault();

    $(this).parent().parent().remove();
};


function restartGame() { // The "click()" function is the same of ".on("click")"
    const $typingField = $(".typing-field");
    $typingField.attr("disabled", false);
    $typingField.val("");

    $("#counter-words").text("0");
    $("#counter-characters").text("0");
    $("#remaining-time").text(initialTime);

    $typingField.removeClass("typing-field--disabled");

    initializeTimer();
}