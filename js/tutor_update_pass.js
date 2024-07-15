document.addEventListener('DOMContentLoaded', function() {
    const changePasswordForm = document.getElementById('changePasswordForm');
 
    changePasswordForm.addEventListener('submit', function(event) {
       event.preventDefault();
 
       const oldPassword = document.getElementById('oldPassword').value;
       const newPassword1 = document.getElementById('newPassword1').value;
       const newPassword2 = document.getElementById('newPassword2').value;
 
      
 
       if (newPassword1 !== newPassword2) {
          alert("New passwords do not match.");
          return;
       }
 
     
       const formData = new FormData();
       formData.append('old_password', oldPassword);
       formData.append('new_password1', newPassword1);
       formData.append('new_password2', newPassword2);
 
       const token = localStorage.getItem('token');
 
   
       fetch('https://tution-media-platform.onrender.com/api/tutor/change-password/', {
          method: 'PUT',
          body: formData,
          headers: {
             'Authorization': `Bearer ${token}`,
          },
       })
       .then((res) => res.json())
       .then(data => {
          alert('Password changed successfully');
      
       })
       .catch(error => {
          console.error('Error changing password:', error);
          alert('Failed to change password. Please try again.');
       });
    });
 });
 