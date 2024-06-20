const apiUrl = 'http://localhost:3000/api/expenses';

document.addEventListener('DOMContentLoaded', fetchExpenses);

function addExpense() {
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  if (!amount || !description || !category) {
    alert('Please fill in all fields');
    return;
  }

  const expense = { amount, description, category };

  axios.post(apiUrl, expense)
    .then(response => {
      displayExpense(response.data);
      clearForm();
    })
    .catch(error => console.error('Error adding expense:', error));
}

function fetchExpenses() {
  axios.get(apiUrl)
    .then(response => {
      response.data.forEach(displayExpense);
    })
    .catch(error => console.error('Error fetching expenses:', error));
}

function displayExpense(expense) {
  const expensesList = document.getElementById('expensesList');
  const li = document.createElement('li');
  li.classList.add('expense');
  li.dataset.id = expense.id;
  li.innerHTML = `
    <span>${expense.description} - ${expense.amount} (${expense.category})</span>
    <button onclick="editExpense(this)">Edit</button>
    <button onclick="deleteExpense(this)">Delete</button>
  `;
  expensesList.appendChild(li);
}

function clearForm() {
  document.getElementById('amount').value = '';
  document.getElementById('description').value = '';
  document.getElementById('category').value = 'food';
}

function editExpense(button) {
  const li = button.parentNode;
  const span = li.querySelector('span');
  const [description, amountCategory] = span.textContent.split(' - ');
  const [amount, category] = amountCategory.split(' (');
  const id = li.dataset.id;

  const newAmount = prompt('Update amount:', amount);
  const newDescription = prompt('Update description:', description);
  const newCategory = prompt('Update category:', category.slice(0, -1));

  if (newAmount !== null && newDescription !== null && newCategory !== null) {
    axios.put(`${apiUrl}/${id}`, { amount: newAmount, description: newDescription, category: newCategory })
      .then(response => {
        span.textContent = `${newDescription} - ${newAmount} (${newCategory})`;
      })
      .catch(error => console.error('Error updating expense:', error));
  }
}

function deleteExpense(button) {
  const li = button.parentNode;
  const id = li.dataset.id;

  axios.delete(`${apiUrl}/${id}`)
    .then(() => {
      li.remove();
    })
    .catch(error => console.error('Error deleting expense:', error));
}

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

  axios.post('http://localhost:3000/api/expenses/user/signup', user)
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

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessageDiv = document.getElementById('errorMessage');

  if (!email || !password) {
    errorMessageDiv.textContent = 'Please fill in all fields';
    return;
  }

  axios.post('http://localhost:3000/api/expenses/user/login', { email, password })
    .then(response => {
    //  alert('Login successful!');
      window.location.href = 'expenseTracker.html';
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
