document.addEventListener("DOMContentLoaded", function() {
    console.log("connected")
    createInputForm();
    });

//genererar html
function createInputForm() {
    console.log("created");
    // creating all necessary elements
    const container = document.querySelector('.booking-container'); // Fixed selector to use class
    const formContainer = document.createElement('div');
    const form = document.createElement('form');
    const dateLabel = document.createElement('label');
    const dateInput = document.createElement('input');
    const amountLabel = document.createElement('label');
    const amountInput = document.createElement('input');
    const submitButton = document.createElement('button'); // Create submit button

    // setting attributes and content
    form.setAttribute("method", "post");
    dateLabel.setAttribute("for", "date");
    dateLabel.textContent = "Enter the date you want to come";
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("placeholder", "Click Here");

    amountLabel.setAttribute("for", "Amount");
    amountLabel.textContent = "How many people?";
    amountInput.setAttribute("type", "number");
    amountInput.setAttribute("placeholder", "Enter Here");

    submitButton.setAttribute("type", "submit"); // Set button type to submit
    submitButton.textContent = "Submit"; // Set button text

    // setting classes
    formContainer.classList.add('formContainer');

    // appending elements
    container.appendChild(formContainer);
    formContainer.appendChild(form);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(amountLabel);
    form.appendChild(amountInput);
    form.appendChild(submitButton); // Append submit button to the form
}


function dateValidation() {
    const dateInput = document.querySelector('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    if (dateInput.value < today) {
        alert("Please select a future date.");
        return false;
    }
    return true;
}   
