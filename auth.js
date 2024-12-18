// Handle user login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim(); // Trimming to avoid leading/trailing spaces
    const password = document.getElementById('password').value.trim();
    const errorElement = document.getElementById('loginError');

    if (email === "" || password === "") {
        errorElement.textContent = "Please fill out both fields!";
        return;
    }

    try {
        // For demo purposes, we will just save the credentials to localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if email and password match a user in localStorage
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'index.html'; // Redirect to main page
        } else {
            errorElement.textContent = "Invalid credentials! Please try again.";
        }
    } catch (error) {
        errorElement.textContent = error.message;
    }
});

// Handle user registration
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorElement = document.getElementById('registerError');

    if (name === "" || email === "" || password === "") {
        errorElement.textContent = "Please fill out all fields!";
        return;
    }

    try {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            errorElement.textContent = "User already exists! Please use a different email.";
            return;
        }

        // Save new user data
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login after registration
        localStorage.setItem('loggedInUser', JSON.stringify({ name, email, password }));

        window.location.href = 'index.html'; // Redirect to main page
    } catch (error) {
        errorElement.textContent = error.message;
    }
});

