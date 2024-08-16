
const loadUserDetails = () => {
  const user_id = localStorage.getItem("user_id");
  // console.log(user_id);
  fetch(`https://tuition-media-platform-backend.onrender.com/api/tutor/list/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);

      const profileHtml = `
          <img style="margin-left: 85px;"  src="${data.image}" class="image" alt="">
          <h3 class="name">${data.user.username}</h3>
          <p class="role">Teacher</p>
          <a href="teacher_profile.html" class="btn">View Profile</a>
          <div class="flex-btn">
            <a style="text-decoration:none;" onclick="TutorHandleLogout()" class="option-btn">Logout</a>
          </div>
        `;

      const sidebarProfileHtml = `
          <img style="margin-left: 85px;" src="${data.image}" class="image" alt="">
          <h3 class="name">${data.user.username}</h3>
          <p class="role">Teacher</p>
          <a href="teacher_profile.html" class="btn">View Profile</a>
        `;

      document.getElementById("header-profile").innerHTML = profileHtml;
      document.getElementById("sidebar-profile").innerHTML = sidebarProfileHtml;
const parent = document.getElementById("profile-details");
parent.innerHTML = `
<div class="flex flex-col items-center">
    <img class="w-48 h-48 object-cover rounded-full mx-auto mb-4 shadow-md" src="${data.image}" alt="Profile Image">
    <h1 class="text-4xl font-bold text-white mb-2">Name: ${data.user.first_name} ${data.user.last_name}</h1>
    <h2 class="text-3xl text-white mb-3">Username: ${data.user.username}</h2>
    <h3 class="text-3xl text-white mb-3">Email: ${data.user.email}</h3>
    <h3 class="text-3xl text-white mb-3">Phone: ${data.phone_number}</h3>
    <h3 class="text-3xl text-white mb-3">Status: ${data.status}</h3>
    <h3 class="text-3xl text-white mb-3">Experience: ${data.tutoring_experience} Years</h3>
    <h3 class="text-3xl text-white mb-3">Medium Of Instruction: ${data.medium_of_instruction}</h3>
    <h3 class="text-3xl text-white mb-3">Salary: ${data.minimum_salary}</h3>
    <h3 class="text-3xl text-white mb-4">Location: ${data.location}</h3>
    <div class="flex justify-center space-x-4">
        <a style="text-decoration:none" class="bg-yellow-500 text-white text-3xl px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition-colors duration-300" href="update_pass.html">Change Password</a>
        <a style="text-decoration:none" class="bg-green-500 text-white text-3xl px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 transition-colors duration-300" href="update.html">Update Profile</a>
    </div>
    </div>
`;

    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });
};

document.addEventListener("DOMContentLoaded", loadUserDetails);


// console.log("table")


document.addEventListener('DOMContentLoaded', () => {
  const tutorId = localStorage.getItem('user_id');
  // console.log(tutorId)
  fetch(`https://tuition-media-platform-backend.onrender.com/api/application/?tutor=${tutorId}`)
      .then(res => {
          if (!res.ok) {
              throw new Error('Network response was not ok');
          }
          return res.json();
      })
      .then(data => {
          const tuitionList = document.getElementById('tuition-list');
          data.forEach(application => {
            console.log(application.tuition.data)
            if(application.status=="accepted"){

              const tr = document.createElement('tr');
              tr.classList.add('hover:bg-gray-100');
              const tdId = document.createElement('td');

              
              tdId.classList.add('px-4', 'py-2', 'border', 'text-2xl', 'text-gray-900');
              tdId.textContent = application.id;
  
              const tdTuition = document.createElement('td');
              tdTuition.classList.add('px-4', 'py-2', 'border', 'text-2xl', 'text-gray-900');
              tdTuition.textContent = application.tuition_title;
  
              const tdStatus = document.createElement('td');
              tdStatus.classList.add('px-4', 'py-2', 'border', 'text-2xl', 'text-gray-900');
              tdStatus.textContent = application.status;
                // staus set korlam
                // localStorage.setItem("status", application.status);
  
                tr.appendChild(tdId);
                tr.appendChild(tdTuition);
                tr.appendChild(tdStatus);
  
                tuitionList.appendChild(tr);
            }
            
            
          });
      })
    
});
