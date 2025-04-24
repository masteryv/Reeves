document.addEventListener("DOMContentLoaded", function(){
    console.log("hello world")
    createForm();


    
});

function createForm(){
// tar in alla elemnt needed
let bookingContainer = document.querySelector('.bookingContainer')
let formContainer = document.querySelector('.formContainer')
let form = document.getElementById('form')
let body = document.querySelector('.bookingBody')
console.log(body)

// skapar element
 let labelDate = document.createElement('label')
 let inputDate = document.createElement('input')
 let submit = document.createElement('button')


//label
labelDate.innerText = "Please Enter the date you want book";
submit.innerText = "Submit";
labelDate.classList.add("bookingFormLbl")
inputDate.classList.add("bookingFormInput") 
submit.classList.add("bookingFormBtn")



//input
inputDate.type = "date"

//submit knappen

 
// formatterar
body.appendChild(bookingContainer)
bookingContainer.appendChild(form)
formContainer.appendChild(labelDate)
formContainer.appendChild(inputDate)
form.appendChild(submit)
console.log("fwl")


console.log("loaded2")
}
