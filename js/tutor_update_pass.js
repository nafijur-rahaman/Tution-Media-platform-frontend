document.getElementById('changePasswordForm').addEventListener('submit', async function(event) {
   event.preventDefault();

   const oldPassword = document.getElementById('old_Password').value;
   const newPassword = document.getElementById('new_password').value;
   const newPasswordConfirm = document.getElementById('new_password_confirm').value;
   const token=localStorage.getItem("tea_token")
   // console.log(token)
   // console.log(oldPassword)
   // console.log(newPassword)
   // console.log(newPasswordConfirm)
   try {
       const response = await fetch('http://127.0.0.1:8000/api/tutor/change-password/', {
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Token ${token}`  
           },
           body: JSON.stringify({
               old_password: oldPassword,
               new_password: newPassword,
               new_password_confirm: newPasswordConfirm
           })
           
       });
      //  console.log(`Bearer ${token}`);
       const result = await response.json();
       if (response.ok) {
         console.log(response)
           alert('Password changed successfully');
           window.location.href = "./teacher_profile.html"
       } else {
           alert('Error: ' + result.detail);
       }
   } catch (error) {
       console.error('Error:', error);
   }
});