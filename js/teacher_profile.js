
const loadUserDetails = () => {
  const user_id = localStorage.getItem("user_id");
  console.log(user_id);
  fetch(`https://tution-media-platform.onrender.com/api/tutor/list/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const profileHtml = `
          <img src="${data.image}" class="image" alt="">
          <h3 class="name">${data.user.username}</h3>
          <p class="role">Teacher</p>
          <a href="student_profile.html" class="btn">View Profile</a>
          <div class="flex-btn">
            <a onclick="TutorHandleLogout()" class="option-btn">Logout</a>
          </div>
        `;

      const sidebarProfileHtml = `
          <img src="${data.image}" class="image" alt="">
          <h3 class="name">${data.user.username}</h3>
          <p class="role">Teacher</p>
          <a href="student_profile.html" class="btn">View Profile</a>
        `;

      document.getElementById("header-profile").innerHTML = profileHtml;
      document.getElementById("sidebar-profile").innerHTML = sidebarProfileHtml;

      const parent = document.getElementById("profile-details");
      parent.innerHTML = `
          <img style="width: 300px;" src="${data.image}" class="image" alt="">
          <h1>Name: ${data.user.first_name} ${data.user.last_name}</h1>
          <h2>Username: ${data.user.username}</h2>
          <h3>Email: ${data.user.email}</h3>
          <h3>Phone: ${data.phone_number}</h3>
          <h3>Status: ${data.status}</h3>
          <h3>Experience: ${data.tutoring_experience}</h3>
          <h3>Medium Of Instruction: ${data.medium_of_instruction}</h3>
          <h3>Salary: ${data.minimum_salary}</h3>
          <h3>Location: ${data.location}</h3>
          <a style="text-decoration: none;" href="update_pass.html" class="inline-btn">Change Password</a>
          <a style="text-decoration: none;" href="update.html" class="inline-btn">Update Profile</a>

        `;
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });
};

document.addEventListener("DOMContentLoaded", loadUserDetails);


console.log("appliaction")
document.addEventListener('DOMContentLoaded', () => {
  const tutorId = localStorage.getItem('user_id');
  
  fetch(`https://tution-media-platform.onrender.com/api/application/?tutor_id=${tutorId}`)
      .then(res => {
          if (!res.ok) {
              throw new Error('Network response was not ok');
          }
          return res.json();
      })
      .then(data => {
          console.log(data);
          const tuitionList = document.getElementById('tuition-list');
          data.forEach(application => {
            console.log(application.tuition.data)
            
            
            const tr = document.createElement('tr');
            const tdId = document.createElement('td');
            tdId.classList.add('px-4', 'py-2', 'border');
            tdId.textContent = application.id;

            const tdTuition = document.createElement('td');
            tdTuition.classList.add('px-4', 'py-2', 'border');
            tdTuition.textContent = application.tuition.title

            const tdsalary = document.createElement('td');
            tdsalary.classList.add('px-4', 'py-2', 'border');
            tdsalary.textContent = application.tuition.salary

              const tdStatus = document.createElement('td');
              tdStatus.classList.add('px-4', 'py-2', 'border');
              tdStatus.textContent = application.status;

              localStorage.setItem("status", application.status);

              tr.appendChild(tdId);
              tr.appendChild(tdTuition);
              tr.appendChild(tdsalary);
              tr.appendChild(tdStatus);

              tuitionList.appendChild(tr);
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
});
