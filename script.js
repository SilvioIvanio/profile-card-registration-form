// Function - runs after loaded HTML
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const programInput = document.getElementById('program');
    const yearInput = document.getElementById('year');
    const photoInput = document.getElementById('photo');

    // Get error elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const programError = document.getElementById('program-error');
    const yearError = document.getElementById('year-error');

    // Function - checks if the name field is empty
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Full name is required.';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }

    // Function - checks if the email is valid
    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    // Function - checks if a program has been selected
    function validateProgram() {
        if (programInput.value === '') {
            programError.textContent = 'Please select a program.';
            return false;
        } else {
            programError.textContent = '';
            return true;
        }
    }

    // Function checks if a year has been selected
    function validateYear() {
        if (yearInput.value === '') {
            yearError.textContent = 'Please select a year.';
            return false;
        } else {
            yearError.textContent = '';
            return true;
        }
    }

    // Event listeners - check the inputs as the user types or changes them
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    programInput.addEventListener('change', validateProgram);
    yearInput.addEventListener('change', validateYear);

    // Function- runs when the form is submitted
    form.addEventListener('submit', function(event) {
        // Check fields before submission
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isProgramValid = validateProgram();
        const isYearValid = validateYear();

        // Stop submission if the fields are not valid
        if (!isNameValid || !isEmailValid || !isProgramValid || !isYearValid) {
            event.preventDefault();
        } else {
            event.preventDefault();
            addEntry(); // If everything is okay, add the new entry
        }
    });

    // Function - creates a profile card and adds a row to the summary table
    function addEntry() {
        // Get the values from the form
        const name = nameInput.value;
        const email = emailInput.value;
        const program = programInput.value;
        const year = yearInput.value;
        const interests = document.getElementById('interests').value;
        let photo = photoInput.value;

        // Default photo in case none is provided
        if (photo.trim() === '') {
            photo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4MJsV58xh-vFYz3u4WMpS65vCvnGwBYc54SfmKToORTHdZALkZNGvpBlt4dc45A0M-y0&usqp=CAU';
        }

        // Card and table row IDs for removing or editing
        const cardId = 'card-' + Date.now();
        const rowId = 'row-' + Date.now();

        // HTML for the profile card
        const cardContainer = document.getElementById('cards-container');
        const card = document.createElement('div');
        card.className = 'profile-card';
        card.id = cardId;
        card.innerHTML = `
            <img src="${photo}" alt="Profile Photo">
            <h3>${name}</h3>
            <p>${email}</p>
            <p>Program: ${program}</p>
            <p>Year: ${year}</p>
            <p>Interests: ${interests}</p>
        `;
        cardContainer.appendChild(card);

        // HTML for new row in summary table
        const tableBody = document.querySelector('#summary-table tbody');
        const row = document.createElement('tr');
        row.id = rowId;
        row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${program}</td>
            <td>${year}</td>
            <td><button class="remove-btn">Remove</button></td>
        `;
        tableBody.appendChild(row);

        // Event listener - Remove button
        row.querySelector('.remove-btn').addEventListener('click', function() {
            document.getElementById(cardId).remove();
            document.getElementById(rowId).remove();
        });

        // Clear the form
        form.reset();
    }
});