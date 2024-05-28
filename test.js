let totalAmount = 0;

function addNewExpense(e) {
    e.preventDefault();

    const expenseDetails = {
        id: Date.now(),
        expenseamount: e.target.expenseamount.value,
        description: e.target.description.value,
        category: e.target.category.value,
    };

    addNewExpensetoUI(expenseDetails);
    saveExpenseToLocalStorage(expenseDetails);
    updateTotalAmount();
}

function addNewExpensetoUI(expense) {
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    const expenseItem = `
        <li id="${expenseElemId}">
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
            <button onclick='editExpense(${expense.id})'>Edit Expense</button>
            <button onclick='deleteExpense(${expense.id})'>Delete Expense</button>
        </li>`;
    parentElement.innerHTML += expenseItem;

    totalAmount += parseFloat(expense.expenseamount);
    document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
}

function editExpense(expenseId) {
    const expenseElem = document.getElementById(`expense-${expenseId}`);
    const expenseText = expenseElem.textContent.trim();
    const [amount, category, description] = expenseText.split(' - ').map(item => item.trim());
    document.querySelector('input[name="expenseamount"]').value = amount;
    document.querySelector('input[name="description"]').value = description;
    document.querySelector('select[name="category"]').value = category.toLowerCase();
    deleteExpense(expenseId, true);
}

function deleteExpense(expenseId, isEdit = false) {
    removeExpenseFromLocalStorage(expenseId);
    removeExpensefromUI(expenseId, isEdit);
}

function removeExpensefromUI(expenseId, isEdit) {
    const expenseElemId = `expense-${expenseId}`;
    const expenseElem = document.getElementById(expenseElemId);
    const [amount] = expenseElem.textContent.split(' - ').map(item => item.trim());

    expenseElem.remove();

    if (!isEdit) {
        totalAmount -= parseFloat(amount);
        document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
    }
}

function saveExpenseToLocalStorage(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function removeExpenseFromLocalStorage(expenseId) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(exp => exp.id !== expenseId);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function updateTotalAmount() {
    totalAmount = Array.from(document.getElementById('listOfExpenses').children)
        .reduce((sum, expense) => {
            const [amount] = expense.textContent.split(' - ').map(item => item.trim());
            return sum + parseFloat(amount);
        }, 0);
    document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
}

function loadExpensesFromLocalStorage() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => addNewExpensetoUI(expense));
    updateTotalAmount();
}

function showError(err) {
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`;
}

window.addEventListener('DOMContentLoaded', () => {
    loadExpensesFromLocalStorage();
});
