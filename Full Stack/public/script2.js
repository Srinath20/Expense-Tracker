let bt1 = document.getElementById('ok');
bt1.addEventListener('click',  async () => {

    // if(window.location.href === "/success.html"){
      await  fetch("http://localhost:3000/premium", {
          method:"POST",
          body:JSON.stringify({premium:1})
        }) 
    //   }

      window.location.href = "./expenseTracker.html";

});