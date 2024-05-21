function addExpense() {
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    if (!amount || !description || !category) {
      alert('Please fill in all fields');
      return;
    }

    const expense = {
      amount,
      description,
      category
    };

    displayExpense(expense);
    clearForm();
  }

  function displayExpense(expense) {
    const expensesList = document.getElementById('expensesList');
    const li = document.createElement('li');
    li.classList.add('expense');
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

    const newAmount = prompt('Update amount:', amount);
    const newDescription = prompt('Update description:', description);
    const newCategory = prompt('Update category:', category.slice(0, -1));

    if (newAmount !== null && newDescription !== null && newCategory !== null) {
      span.textContent = `${newDescription} - ${newAmount} (${newCategory})`;
    }
  }

  function deleteExpense(button) {
    const li = button.parentNode;
    li.remove();
  }