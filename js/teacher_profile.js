function showSuccessAlert(message, title = "Success") {
  const alertBox = document.getElementById("success-alert");
  const alertTitle = document.getElementById("success-alert-title");
  const alertMessage = document.getElementById("success-alert-message");

  alertTitle.innerText = title;
  alertMessage.innerText = message;

  alertBox.classList.remove("hidden");
  alertBox.classList.add("flex");

  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 5000);
}

function showFailureAlert(message, title = "Failure") {
  const alertBox = document.getElementById("failure-alert");
  const alertTitle = document.getElementById("failure-alert-title");
  const alertMessage = document.getElementById("failure-alert-message");

  alertTitle.innerText = title;
  alertMessage.innerText = message;

  alertBox.classList.remove("hidden");
  alertBox.classList.add("flex");

  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 5000);
}

document.getElementById("close-success-alert").addEventListener("click", () => {
  document.getElementById("success-alert").classList.add("hidden");
});

document.getElementById("close-failure-alert").addEventListener("click", () => {
  document.getElementById("failure-alert").classList.add("hidden");
});
const loadUserDetails = () => {
  const user_id = localStorage.getItem("user_id");
  // console.log(user_id);
  fetch(`https://tution-media-platform-backend.vercel.app/api/tutor/list/${user_id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Campaign not found");
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data)
     const profile_header=document.getElementById("profile-header");
     profile_header.innerHTML=`
         <img src="https://res.cloudinary.com/dwsp8rft8/${data.image}" alt="Profile Picture" class="w-24 h-24 rounded-full">
         <div class="ml-6">
           <h1 class="text-3xl font-semibold text-gray-800">${data.first_name} ${data.last_name}  </h1>
           <p class="text-gray-500">${data.designation}</p>
           <p class="text-gray-500">${data.email}</p>
         </div>

     
                          `
      const profile_details=document.getElementById("profile_details");
      profile_details.innerHTML=`
      
      <div class="bg-gray-50 p-6 rounded-md">
         <h2 class="text-xl font-semibold text-gray-800">Bio</h2>
         <p class="text-gray-600 mt-4">
           ${data.bio}
         </p>
       </div>
       <div class="bg-gray-50 p-6 rounded-md">
         <h2 class="text-xl font-semibold text-gray-800">General Information</h2>
         <ul class="list-disc list-inside mt-4 text-gray-600">
           <ol>Phone: ${data.phone_number}</ol>
           <ol>Gender: ${data.gender}</ol>
           <ol>Location: ${data.location}</ol>
           <ol>Education: ${data.education}</ol>
         </ul>
       </div>
    <div class="bg-gray-50 p-6 rounded-md">
         <h2 class="text-xl font-semibold text-gray-800">Subjects</h2>
         <ul class="list-disc list-inside mt-4 text-gray-600">
            ${data.subjects}
         </ul>
      </div>
`



    })
    .catch((error) => {
      showFailureAlert("Error fetching user details");
    });
};

document.addEventListener("DOMContentLoaded", loadUserDetails);

// console.log("table")

document.addEventListener("DOMContentLoaded", () => {
  const tutorId = localStorage.getItem("user_id");

  fetch(`https://tution-media-platform-backend.vercel.app/api/application/?tutor=${tutorId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data)
      const tuitionList = document.getElementById("tuition-details").querySelector('tbody');
      tuitionList.innerHTML = ''; 

      data.forEach((application) => {
        // console.log(data)
        if (application.status === "accepted") {
          const tuition = application.tuition; 
          const newRow = `
            <tr>
              <td class="py-2">${application.tuition_title}</td>
              <td class="py-2">${application.fee} BDT</td>
              <td class="py-2">${application.status}</td>
            </tr>
          `;

          tuitionList.innerHTML += newRow; // Append the new row to the table body
        }
      });

      if (tuitionList.innerHTML === '') {
        tuitionList.innerHTML = `
          <tr>
            <td colspan="3" class="py-2 text-center">No accepted tuitions available.</td>
          </tr>
        `;
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});





function openEditProfileModal() {
  const tutorId=window.localStorage.getItem('user_id');
  fetch(`https://tution-media-platform-backend.vercel.app/api/tutor/list/${tutorId}/`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(tutorData => {
        // console.log(tutorData)
          document.getElementById('first_name').value = tutorData.first_name;
          document.getElementById('last_name').value = tutorData.last_name;
          document.getElementById('email').value = tutorData.email;
          document.getElementById('phone_number').value = tutorData.phone_number;
          document.getElementById('gender').value = tutorData.gender;
          document.getElementById('designation').value = tutorData.designation;
          document.getElementById('location').value = tutorData.location;
          document.getElementById('salary').value = tutorData.salary;
          document.getElementById('tutoring_experience').value = tutorData.tutoring_experience;
          document.getElementById('bio').value = tutorData.bio;
          document.getElementById('medium_of_instruction').value = tutorData.medium_of_instruction;
          document.getElementById('subjects').value = tutorData.subjects;


          document.getElementById('editProfileModal').classList.remove('hidden');
      })
      .catch(error => {
          console.error('Error fetching tutor data:', error);
      });
}

document.getElementById('closeModalBtn').addEventListener('click', function() {
  document.getElementById('editProfileModal').classList.add('hidden');
});

function updateProfile(event) {
  event.preventDefault();

  const tutorId = window.localStorage.getItem("user_id"); 
  const updatedData = {
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      email: document.getElementById('email').value,
      phone_number: document.getElementById('phone_number').value,
      gender: document.getElementById('gender').value,
      designation: document.getElementById('designation').value,
      location: document.getElementById('location').value,
      salary: document.getElementById('salary').value,
      tutoring_experience: document.getElementById('tutoring_experience').value,
      bio: document.getElementById('bio').value,
      medium_of_instruction: document.getElementById('medium_of_instruction').value,
      subjects: document.getElementById('subjects').value,
  };

  fetch(`https://tution-media-platform-backend.vercel.app/api/tutor/list/${tutorId}/`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to update profile');
      }
      return response.json();
  })
  .then(data => {
      // console.log('Profile updated successfully:', data);
      showSuccessAlert("Profile updated successfully");
      document.getElementById('editProfileModal').classList.add('hidden');
  })
  .catch(error => {
      // console.error('Error updating profile:', error);
      showFailureAlert("Error updating profile");
  });
}

document.getElementById('editProfileForm').addEventListener('submit', updateProfile);


openEditProfileModal()




document.getElementById('changePasswordForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const oldPassword = document.getElementById('currentPassword').value
  const newPassword = document.getElementById('newPassword').value;
  const newPasswordConfirm = document.getElementById('confirmPassword').value;
  const token=localStorage.getItem("teacher_token")

  if(newPassword===newPasswordConfirm){

      if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(newPassword)){
        
          fetch("https://tution-media-platform-backend.vercel.app/api/tutor/change-password/",{
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

          })
          .then(res=>{
              
              if (!res.ok) {
              
                  return res.json().then(errorData => {
                     
                      let errorMessage = 'Unknown error';
                      if (errorData.old_password && Array.isArray(errorData.old_password)) {
                          errorMessage = errorData.old_password.join(' '); 
                      }
                      
                      showFailureAlert(`Password change failed: ${errorMessage}`);
                  });


              }else{
               showSuccessAlert("Password change successfully");
                  setTimeout(() => {
                     window.location.reload();
                  }, 3000);
              }
              
          })





      }else{
          showFailureAlert("Password must contain at least 8 characters, at least one letter, one number, and one special character.")
      }

 




  }else{
      showFailureAlert("password doesn't match");
  }

});

document.getElementById('closeChangePasswordModalBtn').addEventListener('click', function() {
  document.getElementById('changePasswordModal').style.display = 'none';
});






