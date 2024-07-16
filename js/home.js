// banner.js

document.addEventListener('DOMContentLoaded', function() {
    const findTutorBtn = document.getElementById('findTutorBtn');

    function togglePulseAnimation() {
        findTutorBtn.classList.toggle('animate-pulse');
    }

  
    togglePulseAnimation();

    const pulseInterval = 1500; 
    setInterval(togglePulseAnimation, pulseInterval);
});



    const navElement = document.getElementById("navbar-element");
    const token = localStorage.getItem("token");
    const token2 = localStorage.getItem("tea_token");

    if (token) {
      navElement.innerHTML += `
       
         <a href="home.html"><i class="fas fa-home"></i><span>Home</span></a>
         <a href="tuitions.html"><i class="fas fa-school"></i><span>Tuitions</span></a>
         <a href="student_profile.html"><i class="fas fa-user"></i><span>Profile</span></a>
         <a onclick="handleLogout()"><i class="fas fa-sign-out-alt"></i><span>Logout</span></a>
         <a href="about.html"><i class="fas fa-question"></i><span>About</span></a>
         
                `;
    }else if(token2){

        navElement.innerHTML += `
       
        <a href="home.html"><i class="fas fa-home"></i><span>Home</span></a>
        <a href="tuitions.html"><i class="fas fa-school"></i><span>Tuitions</span></a>
        <a href="teacher_profile.html"><i class="fas fa-user"></i><span>Profile</span></a>
        <a onclick="TutorHandleLogout()"><i class="fas fa-sign-out-alt"></i><span>Logout</span></a>
        <a href="about.html"><i class="fas fa-question"></i><span>About</span></a>
       
               `;

        
    }
    
    else {
      navElement.innerHTML += `
         <a href="home.html"><i class="fas fa-home"></i><span>Home</span></a>
         <a href="tuitions.html"><i class="fas fa-school"></i><span>Tuitions</span></a>
         <a href="student_registration.html"><i class="fas fa-user-plus"></i><span>Register</span></a>
         <a href="login.html"><i class="fas fa-sign-in-alt"></i><span>Login</span></a>
         <a href="update.html"><i class="fas fa-chalkboard-user"></i><span>Teachers</span></a>
         <a href=".html"><i class="fas fa-question"></i><span>About</span></a>
         <a href="update.html"><i class="fas fa-headset"></i><span>Contact Us</span></a>
                `;
    }
  


    const loadReview = () => {
        fetch("http://127.0.0.1:8000/api/tution/reviews/")
          .then((res) => res.json())
          .then((data) => displayReview(data));
      };
      
      const displayReview = (reviews) => {
        reviews.forEach((review) => {
            // console.log(review);
            const parent = document.getElementById("review-container");
            const div = document.createElement("div");
            div.classList.add("review-card");
    
            // Generate stars based on rating
            let stars = '';
            for (let i = 0; i < review.rating; i++) {
                stars += '⭐';
            }
    
            div.innerHTML = `
                <h4 style="font-size:20px; color:white">${review.reviewer_name}</h4>
                <p style="font-size:20px; color:white">${review.comments}</p>
                <h6 style="font-size:20px; color:white">${stars}</h6>
            `;
            
            parent.appendChild(div);
        });
    };
    
   
      loadReview();