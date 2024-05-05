
document.addEventListener('DOMContentLoaded', function () {
    axios.get('https://crudcrud.com/api/37de8bc658694287af93f4d0bc6457e4')
      .then(function (response) {
        displayUserDetails(response.data);
      })
      .catch(function (error) {
        console.error('Error retrieving user details:', error);
      });
  });
  
  function addAppointment() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
  
    if (username && email) {
      var appointmentData = { username: username, email: email };
      axios.post('https://crudcrud.com/api/37de8bc658694287af93f4d0bc6457e4', appointmentData)
        .then(function (response) {
          console.log(response.data);
          var appointmentList = JSON.parse(localStorage.getItem('appointments')) || [];
          appointmentList.push(appointmentData);
          localStorage.setItem('appointments', JSON.stringify(appointmentList));
          document.getElementById('username').value = '';
          document.getElementById('email').value = '';
          displayAppointments();
        })
        .catch(function (error) {
          console.error('Error adding appointment:', error);
        });
    }
  }
  
  function displayUserDetails(userDetails) {
    var userDetailsContainer = document.getElementById('userDetailsContainer');
    userDetailsContainer.innerHTML = `
      <p>Username: ${userDetails.username}</p>
      <p>Email: ${userDetails.email}</p>
      <button onclick="editUser()">Edit User</button>
      <button onclick="deleteUser()">Delete User</button>
    `;
  }
  
  function editUser() {
    var username = prompt('Enter new username:', '');
    var email = prompt('Enter new email:', '');
  
    if (username !== null && email !== null) {
      var userData = { username: username, email: email };
      axios.put('https://crudcrud.com/api/37de8bc658694287af93f4d0bc6457e4', userData)
        .then(function (response) {
          console.log('User updated:', response.data);
          displayUserDetails(userData);
        })
        .catch(function (error) {
          console.error('Error updating user:', error);
        });
    }
  }
  
  function deleteUser() {
    axios.delete('https://crudcrud.com/api/37de8bc658694287af93f4d0bc6457e4')
      .then(function (response) {
        console.log('User deleted:', response.data);
        localStorage.removeItem('appointments');
        displayUserDetails({});
      })
      .catch(function (error) {
        console.error('Error deleting user:', error);
      });
  }
  