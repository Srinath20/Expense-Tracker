let bt1 = document.getElementById('ok');
bt1.addEventListener('click', async () => {
  await fetch("http://localhost:3000/premium", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ premium: 1 })
  });
  window.location.href = "./expenseTracker.html";
});