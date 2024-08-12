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
    const token = localStorage.getItem("tea_token");

    if(token){

        navElement.innerHTML += `
       
        <a style="text-decoration: none;" href="home.html"><i class="fas fa-home"></i><span>Home</span></a>
        <a style="text-decoration: none;" href="tuitions.html"><i class="fas fa-school"></i><span>Tuitions</span></a>
        <a style="text-decoration: none;" href="teacher_profile.html"><i class="fas fa-user"></i><span>Profile</span></a>
        <a style="text-decoration: none;" onclick="TutorHandleLogout()"><i class="fas fa-sign-out-alt"></i><span>Logout</span></a>
        <a style="text-decoration: none;" href="about.html"><i class="fas fa-question"></i><span>About</span></a>
       
               `;

        
    }
    
    else {
      navElement.innerHTML += `
         <a style="text-decoration: none;" href="home.html"><i class="fas fa-home"></i><span>Home</span></a>
         <a style="text-decoration: none;" href="tuitions.html"><i class="fas fa-school"></i><span>Tuitions</span></a>
         <a style="text-decoration: none;" href="teacher_registration.html"><i class="fas fa-user-plus"></i><span>Register</span></a>
         <a style="text-decoration: none;" href="teacher_login.html"><i class="fas fa-sign-in-alt"></i><span>Login</span></a>
         <a style="text-decoration: none;" href="update.html"><i class="fas fa-chalkboard-user"></i><span>Teachers</span></a>
         <a style="text-decoration: none;" href="about.html"><i class="fas fa-question"></i><span>About</span></a>
         <a style="text-decoration: none;" href="update.html"><i class="fas fa-headset"></i><span>Contact Us</span></a>
                `;
    }
  


    const loadReview = () => {
      fetch("https://tution-media-platform.onrender.com/api/tution/reviews/")
        .then((res) => res.json())
        .then((data) => displayReview(data));
  };
  
  const displayReview = (reviews) => {
    

      const parent = document.getElementById("review-container");
  
      reviews.forEach((review, index) => {
          const div = document.createElement("div");
          div.classList.add("carousel-item");
          if (index === 0) {
              div.classList.add("active");  
          }
  

  
          // Review item HTML
          div.innerHTML = `
              <div class="review-card text-center p-4">
                  <h4 style="font-size:20px; color:black">${review.reviewer_name}</h4>
                  <p style="font-size:20px; color:black">${review.comments}</p>
                  <h6 style="font-size:20px; color:black">${review.rating}</h6>
              </div>
          `;
  
          // Append review item to carousel
          parent.appendChild(div);
      });
  };
  
  loadReview();
  
      
  
      
   
     