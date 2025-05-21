document.addEventListener("DOMContentLoaded", async function() {
    createTimeTable();
    createInputForm();

    console.log("connected")



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
    amountInput.setAttribute("id", "works");
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



    form.addEventListener('submit', async function(event) {
        try {
        let res = await fetch('http://localhost:3000/getBordNrAndSeats'); // Fetch data from backend
        let data = await res.json(); // Parse response as JSON
        console.log("data"); // Check if data is received correctly
        console.log(event); // Check if data is received correctly
        fetchBord(data);

        } catch (error) {
        }

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

    timeInput.setAttribute('type', 'number');
    timeInput.setAttribute('placeholder', 'please enter the time you wish to book');

    headerRow.appendChild(timeHeader);
    headerRow.appendChild(availableHeader);
    table.appendChild(headerRow);


    for (let i = 11; i < 22; i++) {
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
    timeContainer.appendChild(timeInput);
    timeInput.addEventListener('input', function() {
        const inputValue = parseInt(timeInput.value);
        const rows = table.querySelectorAll('tr:not(:first-child)'); // Exclude header row
        rows.forEach((row, index) => {
            const availableCell = row.querySelector('td:nth-child(2)');
            if (index === inputValue - 1) {
                availableCell.textContent = "Not Available";
            } else {
                availableCell.textContent = "Available";
            }
        });
    });


    
}
function fetchBord(data){
        console.log("dasdsad")
        const personerInput = document.getElementById('works');
        console.log(personerInput)

  
        Console.log(":används");
        console.log(personerInput.value)

        if (personerInput) {
            console.log(personerInput.value, "hh")

            return personerInput.value;
        }    
    }