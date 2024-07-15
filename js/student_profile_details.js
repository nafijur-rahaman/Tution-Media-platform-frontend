const loadUserDetails = () => {
  const user_id = localStorage.getItem("user_id");
  // console.log(user_id);
  fetch(`https://tution-media-platform.onrender.com/api/student/list/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);

      const profileHtml = `
        <h3 class="name">${data.user.username}</h3>
        <p class="role">Student</p>
        <a href="student_profile.html" class="btn">View Profile</a>
        <div class="flex-btn">
          <a onclick="handleLogout()" class="option-btn">Logout</a>
        </div>
      `;

      const sidebarProfileHtml = `
        <h3 class="name">${data.user.username}</h3>
        <p class="role">Student</p>
        <a href="student_profile.html" class="btn">View Profile</a>
      `;

      document.getElementById("header-profile").innerHTML = profileHtml;
      document.getElementById("sidebar-profile").innerHTML = sidebarProfileHtml;

      const parent = document.getElementById("profile-details");
      parent.innerHTML = `
        <h1>Name: ${data.user.first_name} ${data.user.last_name}</h1>
        <h2>Username: ${data.user.username}</h2>
        <h3>Email: ${data.user.email}</h3>
        <h4>Mobile: ${data.mobile_no}</h4>
        <a href="update.html" class="inline-btn">Update Profile</a>
        <a href="update.html" class="inline-btn">Update Password</a>
      `;
    })
    
};

document.addEventListener("DOMContentLoaded", loadUserDetails);
