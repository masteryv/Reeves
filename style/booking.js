document.addEventListener("DOMContentLoaded", function() {
    console.log("connected")
    createInputForm();
    createTimeTable()
    });

//genererar html
function createInputForm() {
    console.log("created");
    const container = document.querySelector('.booking-container');
    const formContainer = document.createElement('div');
    const form = document.createElement('form');
    const dateLabel = document.createElement('label');
    const dateInput = document.createElement('input');
    const amountLabel = document.createElement('label');
    const amountInput = document.createElement('input');
    const submitButton = document.createElement('button');

    form.setAttribute("method", "post");
    form.setAttribute("action", "/booking");

    dateLabel.setAttribute("for", "date");
    dateLabel.textContent = "Enter the date you want to come";
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("name", "date"); // Add name attribute
    dateInput.setAttribute("placeholder", "Click Here");

    amountLabel.setAttribute("for", "personer");
    amountLabel.textContent = "How many people?";
    amountInput.setAttribute("type", "number");
    amountInput.setAttribute("name", "personer"); // Add name attribute
    amountInput.setAttribute("placeholder", "Enter Here");

    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Submit";

    formContainer.classList.add('formContainer');
    container.appendChild(formContainer);
    formContainer.appendChild(form);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(amountLabel);
    form.appendChild(amountInput);
    form.appendChild(submitButton);



    form.addEventListener('submit', function(event) {
        
        console.log("onsubmit");
    if (dateValidation()) {
        form.style.display = "none"; // Hide the form
        alert("Form submitted successfully!");
        return true; // Allow form submission
    }
    return false; // Prevent form submission if validation fails
})


function dateValidation() {
    const dateInput = document.querySelector('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    if (dateInput.value < today) {
        alert("Please select a future date.");
        return false;
    }
    return true;


  
}
}


// time tables
function createTimeTable() {

    const timeContainer = document.querySelector('.time-container');
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const timeHeader = document.createElement('th');
    const availableHeader = document.createElement('th');
    const timeInput = document.createElement('input')
    timeHeader.textContent = "Time";
    availableHeader.textContent = "Available";

    timeInput.setAttribute

    headerRow.appendChild(timeHeader);
    headerRow.appendChild(availableHeader);
    table.appendChild(headerRow);


    for (let i = 0; i < 10; i++) {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        const availableCell = document.createElement('td');

        timeCell.textContent = `${i + 1}:00 PM`;
        availableCell.textContent = "Available";

        row.appendChild(timeCell);
        row.appendChild(availableCell);
        table.appendChild(row);
    }

    timeContainer.appendChild(table);
}
