// Fetch logged-in user
let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

// If no user is logged in, redirect to login page
if (!currentUser) {
    window.location.href = 'login.html';
}

// Initialize contacts from localStorage (if any)
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Display Contacts
function displayContacts() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const contactItem = document.createElement('li');
        contactItem.innerHTML = `
            <div>
                <span><strong>${contact.name}</strong></span>
                <br>
                <span>${contact.number}</span>
                <br>
                <span>Category: ${contact.category}</span>
            </div>
            <div>
                <button class="btn" onclick="editContact(${index})">Edit</button>
                <button class="btn" onclick="deleteContact(${index})">Delete</button>
            </div>
        `;
        contactList.appendChild(contactItem);
    });
}

// Add a new contact
function addContact(contact) {
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
}

// Delete a contact
function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
}

// Edit a contact
function editContact(index) {
    const contact = contacts[index];
    document.getElementById('contactName').value = contact.name;
    document.getElementById('contactNumber').value = contact.number;
    document.getElementById('contactCategory').value = contact.category;
    document.getElementById('isFavorite').checked = contact.isFavorite || false;

    // Update the form submit handler for editing
    const form = document.getElementById('contactForm');
    form.onsubmit = (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value;
        const number = document.getElementById('contactNumber').value;
        const category = document.getElementById('contactCategory').value;
        const isFavorite = document.getElementById('isFavorite').checked;

        // Update the contact in the array
        contacts[index] = { name, number, category, isFavorite };
        localStorage.setItem('contacts', JSON.stringify(contacts));
        displayContacts();
        closeModal();
    };
    openModal();
}

// Open Modal for Add/Edit
function openModal() {
    document.getElementById('contactModal').style.display = 'block';
}

// Close Modal
function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
}

// Handle New Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value;
    const number = document.getElementById('contactNumber').value;
    const category = document.getElementById('contactCategory').value;
    const isFavorite = document.getElementById('isFavorite').checked;

    const newContact = { name, number, category, isFavorite };

    // Add the new contact to the list
    addContact(newContact);
    closeModal();
    resetForm();
});

// Reset form after submission
function resetForm() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactNumber').value = '';
    document.getElementById('contactCategory').value = 'family';
    document.getElementById('isFavorite').checked = false;
}

// Close the modal on clicking the "X" button
document.querySelector('.close').addEventListener('click', closeModal);

// Initially load contacts from localStorage
displayContacts();

