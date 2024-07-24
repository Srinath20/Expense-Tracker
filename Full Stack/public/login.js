const apiUrl = 'http://localhost:3000/api/expenses';
console.log("Login javaScript file loaded, line 2 in login.js");

async function login() {
  console.log("Inside login function");
  const email = document.getElementById('email').value;
  console.log(email,"login.js line 7");
  const password = document.getElementById('password').value;
  const errorMessageDiv = document.getElementById('errorMessage');

  if (!email || !password) {
    errorMessageDiv.textContent = 'Please fill in all fields';
    return;
  }

  await axios.post(`${apiUrl}/user/login`, { email, password })
    .then((res) => {
      let useremail = res.data.email;
      localStorage.setItem('Useremail', useremail);
      window.location.href = './expenseTracker.html';
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        errorMessageDiv.textContent = error.response.data.error;
      } else {
        console.error('Error during login:', error);
        errorMessageDiv.textContent = 'An error occurred during login. Please try again.';
      }
    });
}
