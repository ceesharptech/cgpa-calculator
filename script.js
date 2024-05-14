document.addEventListener("DOMContentLoaded", function() {
    // Initialize GPA calculation
    calculateGPA();

    document.addEventListener("input", () => {
        calculateGPA();
        calculateSubjectCount();
    });

    function calculateSubjectCount() {
        // Get all subject blocks for the active semester
        var subjectBlocks = document.querySelectorAll(".subjectsContainer .subjectBlock");
        var subjectCount = 0;

        // Loop through each subject block
        subjectBlocks.forEach(function(block) {
            // Check if any input field has a value
            var inputs = block.querySelectorAll("input[type='text'], input[type='number']");
            var hasInput = Array.from(inputs).some(input => input.value.trim() !== '');

            // Increment subject count if any input field has a value
            if (hasInput) {
                subjectCount++;
            }
        });

        // Display the subject count
        document.getElementById("numberOfSubjects").innerText = subjectCount;
    }

    // Add event listener for "Add Subject" button
    document.getElementById("addSubject-Btn").addEventListener("click", function() {
        addSubjectBlock();
    });

    // Function to calculate GPA
    function calculateGPA() {
        // Get all the subject blocks
        var subjectBlocks = document.querySelectorAll(".subjectBlock");

        var totalGradePoints = 0;
        var totalUnits = 0;

        // Map of grades to grade points
        var gradePoints = {
            'A': 5,
            'B': 4,
            'C': 3,
            'D': 2,
            'E': 1,
            'F': 0
        };

        // Loop through each subject block
        subjectBlocks.forEach(function(block) {
            var grade = block.querySelector(".grade").value.toUpperCase(); // Convert to uppercase
            var units = parseInt(block.querySelector(".unit").value);

            // Calculate grade point based on grade
            var gradePoint = gradePoints[grade];

            if (!isNaN(gradePoint) && !isNaN(units)) {
                totalGradePoints += gradePoint * units;
                totalUnits += units;
            }
        });

        // Calculate GPA
        var gpa = totalGradePoints / totalUnits;

        // Display GPA
        document.getElementById("gpa").innerText = isNaN(gpa) ? "N/A" : gpa.toFixed(2);
        document.getElementById("cgpa").innerText = isNaN(gpa) ? "N/A" : gpa.toFixed(2);
    }

    // Function to add a new subject block
    function addSubjectBlock() {
        // Create new block
        var newBlock = document.createElement("div");
        newBlock.classList.add("subjectBlock");

        // HTML for the new block
        newBlock.innerHTML = `
        <input type="text" class="textInput subName" id="subjectName" placeholder="Course Code" required>
        <input type="text" class="textInput grade" id="subjectGrade" placeholder="Grade(A-F)" required>
        <input type="number" class="textInput unit" id="subjectUnits" placeholder="Units" required min="1">
        <img class="cancel-icon" src="icons8-cancel-32.png" alt="">
        `;

        // Append new block to the container
        document.getElementById("subjectsContainer").appendChild(newBlock);

        newBlock.querySelectorAll(".grade, .unit").forEach(function(input) {
            input.addEventListener("input", function() {
                calculateGPA(); // Recalculate GPA when inputs change
            });
        });

        // Add event listener for cancel button in the new block
        newBlock.querySelector(".cancel-icon").addEventListener("click", function() {
            newBlock.remove(); // Remove the block when cancel button is clicked
            calculateGPA(); // Recalculate GPA after removing the block
            calculateSubjectCount();
        });

        // Recalculate GPA after adding the new block
        calculateGPA();
        calculateSubjectCount();
    }
});
