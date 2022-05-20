"use strict";

// pagination script for Project 2 CSIS-3380

// get all list items into an array
const contacts = document.querySelectorAll(`li`);
const contact_array = [...contacts];

// find the number of pages if each page has item_per_page elements
let current_page = 1;
const item_per_page = 10;
const num_pages = Math.floor(contact_array.length / item_per_page) + 1;

// find the element to add page buttons to
let buttonDiv = document.getElementsByClassName(`pagination`)[0];

// Function that displays elements depending on page
const displayElements = (contact_array, page_number) => {
    // first find the start and end index for the items
    let start_index = (page_number -1) * item_per_page;
    let end_index = start_index + item_per_page;
    if (end_index >= contact_array.length) { end_index = contact_array.length };

    // make every list element display none
    for(let i = 0; i< contact_array.length; i++) {
        contact_array[i].style.display = 'none';
    }
    // display only elements in the correct range
    for(let i = start_index; i < end_index; i++) {
        contact_array[i].style.display = 'block';
    }
}

// Create page button and change the current page number with buttons
// this part was written with the help of the following github repo
// it was not exactly copied
// https://github.com/TylerPottsDev/vanillajs-pagination/blob/master/main.js
const createButton = (contact_array, page) => {
    let button = document.createElement('button');
    button.innerText = page;

    if (current_page == page) {
        button.classList.add('active');
    }

    button.addEventListener('click', () => {
        current_page = page;
        displayElements(contact_array, current_page);
        
        // find the button that was previously active
        let cur_button = document.querySelector('.pagination button.active');
        cur_button.classList.remove('active');
        button.classList.add('active');
    });
    return button;
}

// create all buttons
const pageSetup = (contact_array, buttonDiv, num_pages) => {
    buttonDiv.innerHTML = "";
    let ol = document.createElement(`ol`);
    for (let i = 0; i < num_pages; i++) {
        let li = document.createElement(`li`);
        let btn = createButton(contact_array, i+1);
        li.appendChild(btn);
        ol.appendChild(li);
    }
    buttonDiv.appendChild(ol);
}

displayElements(contact_array, current_page);
pageSetup(contact_array, buttonDiv, num_pages);