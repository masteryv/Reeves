document.addEventListener("DOMContentLoaded", async function () {
    try {
        let res = await fetch('http://localhost:3000/test'); // Fetch data from backend
        let data = await res.json(); // Parse response as JSON
        console.log(data); // Check if data is received correctly

        fetchData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    try {
        let res = await fetch('http://localhost:3000/tableDisplay'); // Fetch data from backend
        let data = await res.json(); // Parse response as JSON
        console.log(data); // Check if data is received correctly

        fetchTableData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
    
});

// Function to display fetched data in a table
function fetchData(data) {
    const table = document.getElementById("menuDisplay");

    // Ensure table exists before populating
    if (!table) {
        console.error("Table with id 'menuDisplay' not found.");
        return;
    }

    // Clear existing table rows
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Price</th>
            <th>Ingredients</th>
        </tr>
    `;

    // Populate table with fetched data
    data.forEach(item => {
        let row = table.insertRow();
        row.insertCell(0).textContent = item.id;
        row.insertCell(1).textContent = item.items;
        row.insertCell(2).textContent = item.price + "SEK";
        row.insertCell(3).textContent = item.ingredients;
    });
}


function fetchTableData(data) {
    const table = document.getElementById("tableDisplay");

    // Ensure table exists before populating
    if (!table) {
        console.error("Table with id 'tableDisplay' not found.");
        return;
    }

    // Clear existing table rows (if any)
    table.innerHTML = `
        <tr>
        <th>ID</th>
        <th>bordNr</th>
        <th>seats</th>
        </tr>
    `;

    // Populate table with fetched data
    data.forEach(item => {
        let row = table.insertRow();
        row.insertCell(0).textContent = item.id;
        row.insertCell(1).textContent = item.bordNr;
        row.insertCell(2).textContent = item.seats;
    });
}
