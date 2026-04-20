I have analyzed the codebase and found that the feature you requested is already implemented. Here is a summary of how it works:

**Backend:**

The file `backend/src/server.mjs` contains the backend server code. It has an API endpoint at `/api/auth/register` that handles user registration. When a `POST` request is made to this endpoint, it:

1.  Validates the user's name, email, and password.
2.  Checks if a user with the same email already exists.
3.  Hashes the password for security.
4.  Creates a new user object and saves it to the `backend/db/db.json` file.
5.  Returns a `201 Created` status code, along with the new user's information and a JSON Web Token (JWT) for authentication.

Here is the relevant code from `backend/src/server.mjs`:

```javascript
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const existingUser = db.get('users').find({ email }).value();
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(),
      email,
      name,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      streak: 0,
      totalScore: 0,
      languages: ['en']
    };

    db.get('users').push(user).write();

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        streak: user.streak,
        totalScore: user.totalScore,
        languages: user.languages
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});
```

**Frontend:**

The file `frontend/src/pages/signup.js` contains the code for the signup form. When the user fills out the form and clicks "Create Account", the following happens:

1.  The form data (name, email, and password) is collected.
2.  A `fetch` request is sent to the `/api/auth/register` endpoint on the backend.
3.  If the registration is successful, the frontend stores the authentication token and user data, and then navigates the user to the main application.

Here is the relevant code from `frontend/src/pages/signup.js`:

```javascript
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        
        // ... (error handling and loading state)

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user data
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify(data.user));

                // ... (update UI)
            } else {
                // Show error
                errorText.textContent = data.error || 'Registration failed';
                errorDiv.style.display = 'block';
            }
        } catch (error) {
            console.error('Signup error:', error);
            errorText.textContent = 'Network error. Please try again.';
            errorDiv.style.display = 'block';
        } finally {
            // ... (reset button)
        }
    });
```

Based on this analysis, the feature you requested is already present and appears to be working as expected.
