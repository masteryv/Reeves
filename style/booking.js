document.addEventListener("DOMContentLoaded", async function() {

    createInputForm();

    console.log("connected")



    });

let selectedBordNr = null;
let selectedDate = null; 

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
    dateInput.setAttribute("name", "date"); 
    dateInput.setAttribute("placeholder", "Click Here");

    amountLabel.setAttribute("for", "personer");
    amountLabel.textContent = "How many people?";
    amountInput.setAttribute("type", "number");
    amountInput.setAttribute("id", "works");
    amountInput.setAttribute("name", "personer"); 
    amountInput.setAttribute("min", "1");
    amountInput.setAttribute("max", "20");

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
        let res = await fetch('http://localhost:3000/getBordNrAndSeats'); 
        let data = await res.json();
        fetchBord(data);

        } catch (error) {
        }

        console.log("onsubmit");
    if (dateValidation()) {
        form.style.display = "none"; 
        alert("Form submitted successfully!");
        return true; 
    }
    return false;  




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


function fetchBord(data) {

    const dateInput = document.querySelector('input[type="date"]');
    const rawDate = new Date(dateInput.value);
    selectedDate = rawDate.toLocaleDateString('sv-SE'); 
    selectedDate = dateInput.value;


    console.log("fetch bord function called");
    const personerInput = document.getElementById('works');
    const antalPersoner = parseInt(personerInput.value, 10);
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

    
    if (!chosenBord) {
        chosenBord = enoughSeats.reduce((prev, curr) => 
            (curr.seats < prev.seats ? curr : prev)
        );
    }

   
    const bordElement = document.createElement('div');
    bordElement.classList.add('bord', 'selected');
    bordElement.textContent = `Bord ${chosenBord.bordNr} - Seats: ${chosenBord.seats}`;
    container.appendChild(bordElement);

    
    selectedBordNr = chosenBord.bordNr;
    createTimeTable()
}


function createTimeTable() {
    const timeContainer = document.querySelector('.time-container');
   

   
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
    availableHeader.textContent = "Select";
    headerRow.appendChild(timeHeader);
    headerRow.appendChild(availableHeader);
    table.appendChild(headerRow);

    for (let i = 1; i < 11; i++) {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        const availableCell = document.createElement('td');

        timeCell.textContent = `${i}:00 PM`;
        availableCell.textContent = "Select";

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


    timeInput.addEventListener('input', function() {
        const inputValue = parseInt(timeInput.value);

        if(inputValue < 0 || inputValue > 10){
            alert("Please enter a valid time between 1 and 10.");
            timeInput.value = 0;
            return;
        }
        const rows = table.querySelectorAll('tr:not(:first-child)');
        rows.forEach((row, index) => {
            const availableCell = row.querySelector('td:nth-child(2)');
            if (index === inputValue - 1) {
                availableCell.textContent = "Selected";
            } else {
                availableCell.textContent = "Select";
            }
        });
    });



timeForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const payload = {
        bordNr: selectedBordNr,
        dateDay: selectedDate,
        timmar: timeInput.value
    };

    console.log(payload);

    const bookingComplete = document.querySelector('.bookingComplete');

    try {
        const bookingRes = await fetch('http://localhost:3000/getTimeTable');
        const bookingData = await bookingRes.json();


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
      timeForm.style.display = "none";
        bookingComplete.style.display = "block";
    } catch (err) {
        console.error("Error submitting time table:", err);
        alert("Faild to send to the database");
    }

});


function bookingValidation(bookingData, payload) {
    for (const booking of bookingData) {
 

        const bookingDate = new Date(booking.dateDay);

        const bookingLocalDate = bookingDate.toLocaleDateString('sv-SE'); 

    

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