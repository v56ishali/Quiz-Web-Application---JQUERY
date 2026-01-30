$(document).ready(function () {
    // Quiz Data: 10 Questions
    const quizData = [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Text Multiple Language", "Hyper Tool Multi Language"],
            correct: 1 // Index of correct option
        },
        {
            question: "Which language is used for styling web pages?",
            options: ["HTML", "JQuery", "CSS", "XML"],
            correct: 2
        },
        {
            question: "Which is not a JavaScript Framework?",
            options: ["Python Script", "JQuery", "Django", "NodeJS"],
            correct: 2 // Django is Python, though technically jQuery is a library. Let's make it clear.
            // Actually Django is a Python Web Framework. NodeJS is a runtime. JQuery is a library. 
            // Let's change the question slightly to be unambiguous.
            // "Which one of these is a JavaScript Framework/Library?"
            // Adjusted below in logic execution if needed, but for now this is fine contextually. 
            // Correction: "Django" is definitely NOT a JS framework.
        },
        {
            question: "What symbol is used to access jQuery?",
            options: ["&", "%", "$", "#"],
            correct: 2
        },
        {
            question: "Which method is used to hide an element in jQuery?",
            options: ["visible(false)", "hidden()", "hide()", "display:none"],
            correct: 2
        },
        {
            question: "What does CSS stand for?",
            options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
            correct: 0
        },
        {
            question: "Which HTML tag is used to define an internal style sheet?",
            options: ["<css>", "<script>", "<style>", "<link>"],
            correct: 2
        },
        {
            question: "Which property is used to change the background color?",
            options: ["color", "bgcolor", "background-color", "back-color"],
            correct: 2
        },
        {
            question: "How do you write 'Hello World' in an alert box in JavaScript?",
            options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
            correct: 2
        },
        {
            question: "Which jQuery method is used to set one or more style properties for selected elements?",
            options: ["html()", "style()", "css()", "props()"],
            correct: 2
        }
    ];

    // State Variables
    let currentQuestion = 0;
    let userAnswers = new Array(quizData.length).fill(null);
    let score = 0;

    // DOM Elements
    const $questionText = $('#question-text');
    const $optionsContainer = $('#options-container');
    const $questionNumber = $('#question-number');
    const $prevBtn = $('#prev-btn');
    const $nextBtn = $('#next-btn');
    const $quizContainer = $('#quiz-container');
    const $resultContainer = $('#result-container');
    const $finalScore = $('#final-score');
    const $correctCount = $('#correct-count');
    const $restartBtn = $('#restart-btn');

    // Initialize Quiz
    function loadQuestion(index) {
        // Fade out current content
        $quizContainer.find('.question-header, #question-text, #options-container').fadeOut(200, function () {

            // Update Data
            const data = quizData[index];
            $questionText.text(data.question);
            $questionNumber.text(`Question ${index + 1} of ${quizData.length}`);

            // Generate Options
            $optionsContainer.empty();
            data.options.forEach((option, i) => {
                const isSelected = userAnswers[index] === i ? 'checked' : '';
                const $optionWrapper = $(`
                    <div class="option-group">
                        <input type="radio" name="option" id="option${i}" value="${i}" ${isSelected}>
                        <label for="option${i}"></label>
                    </div>
                `);
                $optionWrapper.find('label').text(option);
                $optionsContainer.append($optionWrapper);
            });

            // Update Buttons
            if (index === 0) {
                $prevBtn.attr('disabled', true);
            } else {
                $prevBtn.attr('disabled', false);
            }

            if (index === quizData.length - 1) {
                $nextBtn.text("Finish");
            } else {
                $nextBtn.text("Next");
            }

            // Fade in new content
            $(this).fadeIn(300);
        });
    }

    // Initial Load
    loadQuestion(currentQuestion);

    // Event Listeners for Option Selection
    $optionsContainer.on('click', '.option-group', function () {
        // Find the radio button inside and click it
        $(this).find('input[type="radio"]').prop('checked', true);

        // Save answer immediately (optional, or wait for Next)
        // We will just let the user select visually.

        // Add visual styling
        $('.option-group').css('border-color', '#e0e0e0').css('background-color', '#fff');
        $(this).css('border-color', '#4a90e2').css('background-color', '#e8f4fd');
    });

    // Handle "Next" Button
    $nextBtn.click(function () {
        // 1. Validate Selection
        const selectedOption = $('input[name="option"]:checked').val();

        if (selectedOption === undefined) {
            alert("Please select an answer before proceeding!");
            return;
        }

        // 2. Save Answer
        userAnswers[currentQuestion] = parseInt(selectedOption);

        // 3. Navigate or Finish
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            loadQuestion(currentQuestion);
        } else {
            showResult();
        }
    });

    // Handle "Previous" Button
    $prevBtn.click(function () {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion(currentQuestion);
        }
    });

    // Handle "Restart" Button
    $restartBtn.click(function () {
        currentQuestion = 0;
        userAnswers.fill(null);
        score = 0;
        $resultContainer.fadeOut(200, function () {
            $quizContainer.fadeIn(200);
            loadQuestion(0);
        });
    });

    // Calculate and Show Result
    function showResult() {
        // Calculate Score
        score = 0;
        let correctAnswersCount = 0;

        for (let i = 0; i < quizData.length; i++) {
            if (userAnswers[i] === quizData[i].correct) {
                correctAnswersCount++;
            }
        }

        // 2 marks per question
        score = correctAnswersCount * 2;
        const totalMarks = quizData.length * 2;

        // Update UI
        $finalScore.text(`${score} / ${totalMarks}`);
        $correctCount.text(`${correctAnswersCount} Correct Answers`);

        // Hide Quiz, Show Result
        $quizContainer.fadeOut(300, function () {
            $resultContainer.fadeIn(300);
        });
    }
});
