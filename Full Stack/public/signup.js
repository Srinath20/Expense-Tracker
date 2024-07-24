const apiUrl = 'http://localhost:3000/api/expenses';

function signup() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessageDiv = document.getElementById('errorMessage');

  if (!name || !email || !password) {
    errorMessageDiv.textContent = 'Please fill in all fields';
    return;
  }

  const user = { name, email, password };

  axios.post(`${apiUrl}/user/signup`, user)
    .then(response => {
      alert('Signup successful!');
      window.location.href = 'login.html';
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        errorMessageDiv.textContent = error.response.data.error;
      } else {
        console.error('Error during signup:', error);
        errorMessageDiv.textContent = 'An error occurred during signup. Please try again.';
      }
    });
}
