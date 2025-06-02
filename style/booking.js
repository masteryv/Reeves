document.addEventListener("DOMContentLoaded", async function() {
   // createTimeTable();
    createInputForm();

    console.log("connected")



    });

let selectedBordNr = null;
let selectedDate = null; // <-- Add this line

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
        event.preventDefault();
        try {
        let res = await fetch('http://localhost:3000/getBordNrAndSeats'); // Fetch data from backend
        let data = await res.json();
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

function fetchBord(data) {

    const dateInput = document.querySelector('input[type="date"]');
    const rawDate = new Date(dateInput.value);
selectedDate = rawDate.toLocaleDateString('sv-SE'); // sets as YYYY-MM-DD
    selectedDate = dateInput.value;


    console.log("fetch bord function called");
    const personerInput = document.getElementById('works');
    const antalPersoner = parseInt(personerInput.value, 10);// 10an r där för att det inte skall ska bli en bugg om det är en sträng
    const container = document.querySelector('.booking-container');

  
    const enoughSeats = data.filter(bord => bord.seats >= antalPersoner);

    if (enoughSeats.length === 0) {
        const noTableMsg = document.createElement('div');
        noTableMsg.textContent = "No available tables for the selected number of people.";
        container.appendChild(noTableMsg);
        selectedBordNr = null;
        return;
    }

    let chosenBord = enoughSeats.find(bord => bord.seats === antalPersoner);

    // If no exact match, pick the one with the smallest number of seats greater than antalPersoner
    if (!chosenBord) {
        chosenBord = enoughSeats.reduce((prev, curr) => 
            (curr.seats < prev.seats ? curr : prev)
        );
    }

    // Show only the chosen table
    const bordElement = document.createElement('div');
    bordElement.classList.add('bord', 'selected');
    bordElement.textContent = `Bord ${chosenBord.bordNr} - Seats: ${chosenBord.seats}`;
    container.appendChild(bordElement);

    // Set selectedBordNr automatically
    selectedBordNr = chosenBord.bordNr;
    createTimeTable()
}


function createTimeTable() {
    const timeContainer = document.querySelector('.time-container');
    //timeContainer.innerHTML = ""; 

    // Create form for time selection
    const timeForm = document.createElement('form');
    timeForm.setAttribute('method', 'post');
    timeForm.setAttribute('action', '/timeTable');

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const timeHeader = document.createElement('th');
    const availableHeader = document.createElement('th');
    const timeInput = document.createElement('input');
    const submitBtn = document.createElement('button');

    timeHeader.textContent = "Time";
    availableHeader.textContent = "Available";
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

    timeInput.setAttribute('type', 'number');
    timeInput.setAttribute('placeholder', 'please enter the time you wish to book');
    timeInput.setAttribute('name', 'timmar');

    submitBtn.setAttribute('type', 'submit');
    submitBtn.textContent = "Submit";

    timeForm.appendChild(table);
    timeForm.appendChild(timeInput);
    timeForm.appendChild(submitBtn);
    timeContainer.appendChild(timeForm);

    // Highlight chosen time in table
    timeInput.addEventListener('input', function() {
        const inputValue = parseInt(timeInput.value);

        if(inputValue < 0 ){
            alert("Please enter a valid time.");
            return;
        }
        const rows = table.querySelectorAll('tr:not(:first-child)');
        rows.forEach((row, index) => {
            const availableCell = row.querySelector('td:nth-child(2)');
            if (index === inputValue ) {
                availableCell.textContent = "Not Available";
            } else {
                availableCell.textContent = "Available";
            }
        });
    });

   // ...existing code...

timeForm.addEventListener('submit', async function(event) {
    event.preventDefault();
   /* const timmar = timeInput.value;
    if (!timmar) {
        alert("Please enter a time.");
        return;
    }
*/
    const payload = {
        bordNr: selectedBordNr,
        dateDay: selectedDate,
        timmar: timeInput.value
    };

    console.log(payload);

    try {
        const bookingRes = await fetch('http://localhost:3000/getTimeTable');
        const bookingData = await bookingRes.json();

        // Use the validation result to decide if booking is allowed
        if (!bookingValidation(bookingData, payload)) {
            alert("This time is already booked. Please choose another time.");
            return;
        }

        const response = await fetch('http://localhost:3000/timeTable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        alert("Booked!");
    } catch (err) {
        console.error("Error submitting time table:", err);
        alert("Faild to send to the database");
    }
});

// ...existing code...

function bookingValidation(bookingData, payload) {
    for (const booking of bookingData) {
        //console.log("Muahahahsh"  + booking.bordNr + "b " + payload.bordNr + "p " + booking.dateDay + "b " + payload.dateDay + "p " + booking.timmar + "b " + payload.timmar);

        //const bookingDate = new Date(booking.dateDay).toISOString().split('T')[0];
        //console.log("bookingDate", bookingDate)
        // console.log("payload", payload)
       //console.log("booking", booking)

        // Normalize booking date to local date string
        const bookingDate = new Date(booking.dateDay);

        // If you want to compare in **local timezone**, use:
        const bookingLocalDate = bookingDate.toLocaleDateString('sv-SE'); // 'YYYY-MM-DD'

        // Or if you want to keep using UTC:
        // const bookingUtcDate = bookingDate.toISOString().split('T')[0];

        if (
            booking.bordNr === payload.bordNr &&
            bookingLocalDate === payload.dateDay &&
            String(booking.timmar) === String(payload.timmar)
        
        ){
            console.log("batman")
            return false;
        }
    }
    return true;
}
}