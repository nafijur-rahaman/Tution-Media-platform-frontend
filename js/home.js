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


// conditional navbar
    const navElement = document.getElementById("navbar-element");
    const token = localStorage.getItem("tea_token");
    const token2 = localStorage.getItem("token");

    if(token){

        navElement.innerHTML += `
       
        <a style="text-decoration: none;" href="home.html"><i class="fas fa-home"></i><span>Home</span></a>
        <a style="text-decoration: none;" href="tuitions.html"><i class="fas fa-school"></i><span>Tuitions</span></a>
        <a style="text-decoration: none;" href="teacher_profile.html"><i class="fas fa-user"></i><span>Profile</span></a>
        <a style="text-decoration: none;" onclick="TutorHandleLogout()"><i class="fas fa-sign-out-alt"></i><span>Logout</span></a>
        
        <a style="text-decoration: none;" href="about.html"><i class="fas fa-question"></i><span>About</span></a>
       
               `;

            //    <a style="text-decoration: none;" ><i ></i><span>Logout</span></a>
    }
    else if(token2){

        navElement.innerHTML += `
       
        <a style="text-decoration: none;" href="home.html"><i class="fas fa-home"></i><span>Home</span></a>
        <a style="text-decoration: none;" onclick="adminLogout()"><i class="fas fa-sign-out-alt"></i><span>Logout</span></a>
        <a style="text-decoration: none;" href="about.html"><i class="fas fa-question"></i><span>About</span></a>
       
               `;

        
    }
    
    else {
      navElement.innerHTML += `
         <a style="text-decoration: none;" href="home.html"><i class="fas fa-home"></i><span>Home</span></a>
         <a style="text-decoration: none;" href="teacher_registration.html"><i class="fas fa-user-plus"></i><span>Register</span></a>
         <a style="text-decoration: none;" href="teacher_login.html"><i class="fas fa-sign-in-alt"></i><span>Login</span></a>
         <a style="text-decoration: none;" href="update.html"><i class="fas fa-chalkboard-user"></i><span>Teachers</span></a>
         <a style="text-decoration: none;" href="about.html"><i class="fas fa-question"></i><span>About</span></a>
         <a style="text-decoration: none;" href="update.html"><i class="fas fa-headset"></i><span>Contact Us</span></a>
                `;
    }
  
// conditional action
    const actionElement = document.getElementById("action");

    if(token || token2){

        actionElement.innerHTML += `
       <h2 class="text-3xl md:text-5xl font-bold mb-6">Ready to Find Your Perfect Tutor?</h2>
            <p class="text-3xl mb-8">Join thousands of students who have found their ideal tutor. Sign up now and start learning!</p>
           
        
       
               `;
    }else{
        actionElement.innerHTML += `
     <h2 class="text-3xl md:text-5xl font-bold mb-6">Ready to Find Your Perfect Tutor?</h2>
            <p class="text-3xl mb-8">Join thousands of students who have found their ideal tutor. Sign up now and start learning!</p>
            <a href="teacher_registration.html" style="text-decoration: none;" class="inline-block px-8 py-4 bg-white text-blue-500 text-2xl font-semibold rounded-lg shadow-lg hover:bg-blue-400 hover:text-white transition duration-300 transform hover:scale-105">Sign Up Now</a>
            
         
        
                `;
    }