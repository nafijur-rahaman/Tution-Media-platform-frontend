// function alert(message, title = "Success") {
//   const alertBox = document.getElementById("success-alert");
//   const alertTitle = document.getElementById("success-alert-title");
//   const alertMessage = document.getElementById("success-alert-message");

//   alertTitle.innerText = title;
//   alertMessage.innerText = message;

//   alertBox.classList.remove("hidden");
//   alertBox.classList.add("flex");

//   setTimeout(() => {
//     alertBox.classList.add("hidden");
//   }, 5000);
// }

// function alert(message, title = "Failure") {
//   const alertBox = document.getElementById("failure-alert");
//   const alertTitle = document.getElementById("failure-alert-title");
//   const alertMessage = document.getElementById("failure-alert-message");

//   alertTitle.innerText = title;
//   alertMessage.innerText = message;

//   alertBox.classList.remove("hidden");
//   alertBox.classList.add("flex");

//   setTimeout(() => {
//     alertBox.classList.add("hidden");
//   }, 5000);
// }

// document.getElementById("close-success-alert").addEventListener("click", () => {
//   document.getElementById("success-alert").classList.add("hidden");
// });

// document.getElementById("close-failure-alert").addEventListener("click", () => {
//   document.getElementById("failure-alert").classList.add("hidden");
// });
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

     <div class="text-center">
                    <img src="https://res.cloudinary.com/dwsp8rft8/${data.image}" alt="Admin" class="rounded-circle border border-primary mb-3" style="width: 200px; height: 200px;">
            
                    <div>
                        <h4 class=" font-weight-bold">${data.first_name} ${data.last_name}</h4>
                        <p>${data.designation}</p>
                        


                    </div>
                </div>
                <hr class="my-4">
                <ul class="list-unstyled">
                    <li class="d-flex justify-content-between">
                        <p class="font-weight-bold">Email:</p>
                        <p>${data.email}</p>
                    </li>
                    <li class="d-flex justify-content-between">
                        <p class="font-weight-bold">Mobile:</p>
                        <p>${data.phone_number}</p>
                    </li>
                    <li class="d-flex justify-content-between">
                        <p class="font-weight-bold">Gender:</p>
                        <p>${data.gender}</p>
                    </li>
                    <li class="d-flex justify-content-between">
                        <p class="font-weight-bold">Location:</p>
                        <p>${data.location}</p>
                    </li>
                    <li class="d-flex justify-content-between">
                        <p class="font-weight-bold">Education:</p>
                        <p>${data.education}</p>
                    </li>
                    <li class="d-flex justify-content-between">
                        <p class="font-weight-bold">Subjects:</p>
                        <p>   ${data.subjects}</p>
                    </li>
                </ul>


     

     
                          `


    })
  
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
      const tuitionList = document.getElementById("tuition-details").querySelector('tbody');
      tuitionList.innerHTML = '';

      data.forEach((application) => {
        if (application.status === "accepted") {
          const newRow = `
            <tr>
              <td class="text-dark">${application.tuition_title}</td>
              <td class="text-dark">${application.fee} BDT</td>
              <td class="text-dark">${application.status}</td>
            </tr>
          `;
          tuitionList.innerHTML += newRow; // Append the new row to the table body
        }
      });

      if (tuitionList.innerHTML === '') {
        tuitionList.innerHTML = `
          <tr>
            <td colspan="3" class="text-center">No accepted tuitions available.</td>
          </tr>
        `;
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

// Open Edit Profile Modal
const editProfileBtn = document.getElementById('editProfileBtn');
if (editProfileBtn) {
    editProfileBtn.addEventListener('click', function() {
        openEditProfileModal();
        $('#editProfileModal').modal('show'); // Show the modal
    });
}



// Close Edit Profile Modal
const closeModalBtn = document.getElementById('closeModalBtn');
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
        $('#editProfileModal').modal('hide'); // Hide the modal
    });
}



// Function to open Edit Profile Modal and fetch tutor data
function openEditProfileModal() {
    const tutorId = window.localStorage.getItem('user_id');
    fetch(`https://tution-media-platform-backend.vercel.app/api/tutor/list/${tutorId}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(tutorData => {
            if (tutorData) {
                document.getElementById('first_name').value = tutorData.first_name || '';
                document.getElementById('last_name').value = tutorData.last_name || '';
                document.getElementById('email').value = tutorData.email || '';
                document.getElementById('phone_number').value = tutorData.phone_number || '';
                document.getElementById('gender').value = tutorData.gender || '';
                document.getElementById('designation').value = tutorData.designation || '';
                document.getElementById('location').value = tutorData.location || '';
                document.getElementById('salary').value = tutorData.salary || '';
                document.getElementById('tutoring_experience').value = tutorData.tutoring_experience || '';
                document.getElementById('bio').value = tutorData.bio || '';
                document.getElementById('medium_of_instruction').value = tutorData.medium_of_instruction || '';
                document.getElementById('subjects').value = tutorData.subjects || '';
            }
        })
        .catch(error => {
            console.error('Error fetching tutor data:', error);
        });
}

// Update Profile
const saveChangesBtn = document.getElementById('saveChangesBtn');
if (saveChangesBtn) {
    saveChangesBtn.addEventListener('click', updateProfile);
}

function updateProfile() {
    const tutorId = window.localStorage.getItem('user_id');
    const formData = {
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
            'Authorization': `Token ${localStorage.getItem('teacher_token')}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('Profile updated successfully');
        $('#editProfileModal').modal('hide');
        window.location.reload(); // Hide the modal
    })
    .catch(error => {
        console.error('Error updating profile:', error);
    });
}


let passwordModal;


document.addEventListener("DOMContentLoaded", function () {
    passwordModal = new bootstrap.Modal(document.getElementById('passwordModal'), {
        backdrop: 'static'
    });
});

function openPasswordModal() {
    passwordModal.show();
}

const pass_modal = document.getElementById('pass_modal');
if (pass_modal) {
  pass_modal.addEventListener('click', function closePasswordModal() {
    passwordModal.hide();
});
}


function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        alert("New passwords do not match.");
        return;
    }

    const user_id = localStorage.getItem("user_id");
    const token=localStorage.getItem("teacher_token");
    fetch(`https://tution-media-platform-backend.vercel.app/api/tutor/change-password/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            user_id: user_id,
            old_password: currentPassword,
            new_password: newPassword,
            new_password_confirm: confirmNewPassword
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Password change failed');
        }
        return response.json();
    })
    .then(data => {
        alert("Password changed successfully.");
        passwordModal.hide();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    })
    .catch(error => {
        alert(error.message);
    });
}
