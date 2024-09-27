


// conditional navbar
    const navElement = document.getElementById("navbar");
    const token = localStorage.getItem("teacher_token");
    const token2 = localStorage.getItem("student_token");


    if(token){

        navElement.innerHTML += `
       
           <div class="container mx-auto flex justify-between items-center">
             <a href="./home.html" class="text-4xl font-extrabold text-white hover:text-gray-300 transition duration-300 flex items-center space-x-2">
    <span class="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
        Tuition
    </span>
    <span class="text-gray-200">Media</span>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white hover:text-gray-300 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
</a>
        <div class="md:hidden">
            <!-- Hamburger Icon -->
            <button id="menu-btn" class="text-white focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
  
        <ul class=" md:flex space-x-6">
           <ul class="hidden md:flex space-x-6">
            <li><a href="./home.html" class="hover:text-blue-400 text-xl font-bold">Home</a></li>
            <li><a href="./tuitions.html" class="hover:text-blue-400 text-xl font-bold">Tuitions</a></li>
            <li><a href="./teachers.html" class="hover:text-blue-400 text-xl font-bold">Teachers</a></li>
            <li><a href="./about.html" class="hover:text-blue-400 text-xl font-bold">About</a></li>
            <li><a href="./contact.html" class="hover:text-blue-400 text-xl font-bold">Contact</a></li>
        </ul>
        </ul>
        <div class="hidden md:flex items-center space-x-4">
    
            <a href="teacher_profile.html" class="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">Profile</a>
            <a onclick="TutorHandleLogout()" style="cursor:pointer;" class="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition">Logout</a>
        </div>
    </div>

    <!-- Mobile Menu-->
    <div id="mobile-menu" class="md:hidden hidden">
        <ul class="flex flex-col space-y-4 p-4 bg-gray-700">
         <li><a href="./home.html" class="hover:text-blue-400">Home</a></li>
            <li><a href="./tuitions.html" class="hover:text-blue-400">Tuitions</a></li>
            <li><a href="./teachers.html" class="hover:text-blue-400">Teachers</a></li>
            <li><a href="./about.html" class="hover:text-blue-400">About</a></li>
           <a href="teacher_profile.html" class="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">Profile</a>
            <a onclick="TutorHandleLogout()" style="cursor:pointer;" class="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition">Logout</a>
        </ul>
    </div>
       
               `;

            
    }
    else if(token2){

        navElement.innerHTML += `
       
     <div class="container mx-auto flex justify-between items-center">
            <a href="./home.html" class="text-4xl font-extrabold text-white hover:text-gray-300 transition duration-300 flex items-center space-x-2">
    <span class="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
        Tuition
    </span>
    <span class="text-gray-200">Media</span>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white hover:text-gray-300 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
</a>
        <div class="md:hidden">
            <!-- Hamburger Icon -->
            <button id="menu-btn" class="text-white focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
        
        <ul class="hidden md:flex space-x-6">
           <ul class="hidden md:flex space-x-6">
            <li><a href="./home.html" class="hover:text-blue-400 text-xl font-bold">Home</a></li>
            <li><a href="./tuitions.html" class="hover:text-blue-400 text-xl font-bold">Tuitions</a></li>
            <li><a href="./teachers.html" class="hover:text-blue-400 text-xl font-bold">Teachers</a></li>
            <li><a href="./about.html" class="hover:text-blue-400 text-xl font-bold">About</a></li>
            <li><a href="./contact.html" class="hover:text-blue-400 text-xl font-bold">Contact</a></li>
        </ul>
        </ul>
        <div class="hidden md:flex items-center space-x-4">
     
            <a href="student_profile.html" class="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">Profile</a>
            <a onclick="StudentHandleLogout()" style="cursor:pointer;" class="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition">Logout</a>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="md:hidden hidden">
        <ul class="flex flex-col space-y-4 p-4 bg-gray-700">
         <li><a href="./home.html" class="hover:text-blue-400">Home</a></li>
            <li><a href="./tuitions.html" class="hover:text-blue-400">Tuitions</a></li>
            <li><a href="./teachers.html" class="hover:text-blue-400">Teacher</a></li>
            <li><a href="./about.html" class="hover:text-blue-400">About</a></li>
            <li><a href="./contact.html" class="hover:text-blue-400">Contact</a></li>
           <a href="student_profile.html" class="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">Profile</a>
            <a onclick="StudentHandleLogout()" style="cursor:pointer;" class="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition">Logout</a>
        </ul>
    </div>
       
               `;

        
    }
    else {
      navElement.innerHTML += `


      
           <div class="container mx-auto flex justify-between items-center">
        <a href="./home.html" class="text-4xl font-extrabold text-white hover:text-gray-300 transition duration-300 flex items-center space-x-2">
    <span class="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
        Tuition
    </span>
    <span class="text-gray-200">Media</span>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white hover:text-gray-300 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
</a>

        <div class="md:hidden">
            <!-- Hamburger Icon -->
            <button id="menu-btn" class="text-white focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
        <ul class="hidden md:flex space-x-6">
                   <li><a href="./home.html" class="hover:text-blue-400 text-xl font-bold">Home</a></li>
            <li><a href="./tuitions.html" class="hover:text-blue-400 text-xl font-bold">Tuitions</a></li>
            <li><a href="./teachers.html" class="hover:text-blue-400 text-xl font-bold">Teachers</a></li>
            <li><a href="./about.html" class="hover:text-blue-400 text-xl font-bold">About</a></li>
            <li><a href="./contact.html" class="hover:text-blue-400 text-xl font-bold">Contact</a></li>
        </ul>
        <div class="hidden md:flex space-x-4">
            <a href="register.html" class="bg-blue-600 text-white text-xl font-bold py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">Register</a>
            <a href="login.html" class="bg-gray-600 text-white text-xl font-bold py-2 px-4 rounded-lg font-semibold hover:bg-gray-700 transition">Login</a>
        </div>
    </div>

    <!-- Mobile Menu (hidden by default) -->
    <div id="mobile-menu" class="md:hidden hidden">
        <ul class="flex flex-col space-y-4 p-4 bg-gray-700">
            <li><a href="./home.html" class="hover:text-blue-400">Home</a></li>
            <li><a href="./tuitions.html" class="hover:text-blue-400">Tuitions</a></li>
            <li><a href="./teachers.html" class="hover:text-blue-400">Teachers</a></li>
            <li><a href="./about.html" class="hover:text-blue-400">About</a></li>
            <li><a href="./contact.html.html" class="hover:text-blue-400">Contact</a></li>

            <li><a href="register.html" class="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">Register</a></li>
            <li><a href="./login.html" class="bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-700 transition">Login</a></li>
        </ul>
    </div>
        
        
        `;
    }
  


    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });


