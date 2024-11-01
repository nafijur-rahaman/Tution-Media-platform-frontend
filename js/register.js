


document.getElementById('showTutorForm').addEventListener('click', function() {
    document.getElementById('tutorForm').classList.remove('hidden');
    document.getElementById('studentForm').classList.add('hidden');
    
    // Apply active styles to the Tutor button, remove from Student button
    document.getElementById('showTutorForm').classList.add('active-tutor');
    document.getElementById('showStudentForm').classList.remove('active-student');
});

document.getElementById('showStudentForm').addEventListener('click', function() {
    document.getElementById('studentForm').classList.remove('hidden');
    document.getElementById('tutorForm').classList.add('hidden');
    
    // Apply active styles to the Student button, remove from Tutor button
    document.getElementById('showStudentForm').classList.add('active-student');
    document.getElementById('showTutorForm').classList.remove('active-tutor');
});

const form = document.getElementById("registration-form");
const loaderOverlay = document.getElementById("loader-overlay");

const usernamePattern = /^[a-zA-Z0-9_]{3,15}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    loaderOverlay.style.display = 'flex';
   

    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!usernamePattern.test(username)) {
        alert("Username must be 3-15 characters long, containing only letters, numbers, and underscores.");
        loaderOverlay.style.display = 'none';
    
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        loaderOverlay.style.display = 'none';
     
        return;
    }

    if (!passwordPattern.test(password)) {
        alert("Password must be at least 8 characters long and contain at least one Capital letter and one number.");
        loaderOverlay.style.display = 'none';

        return;
    }

    const formData = new FormData(form);
    try {
        const response = await fetch('https://tution-media-platform-backend.vercel.app/api/tutor/register/', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message || "Registration successful!");
            window.location.href = "login.html";
        } else {
            const errorData = await response.json();
            for (const [key, value] of Object.entries(errorData)) {
                value.forEach(errorMessage => {
                    alert(`${key}: ${errorMessage}`);
                });
            }
        }
    } catch (error) {
        alert("An error occurred during registration!");
    } finally {
        loaderOverlay.style.display = 'none';
        form.classList.remove('hidden');
    }
});



const StudentForm = document.getElementById("student-registration-form");
const loader = document.getElementById("loader-overlay");

const studentUsernamePattern = /^[a-zA-Z0-9_]{3,15}$/;
const studentEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const studentPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

StudentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    loader.style.display = 'flex';
  

    const username = StudentForm.username.value;
    const email = StudentForm.email.value;
    const password = StudentForm.password.value;

    if (!studentUsernamePattern.test(username)) {
        alert("Username must be 3-15 characters long, containing only letters, numbers, and underscores.");
        loader.style.display = 'none';
   
        return;
    }

    if (!studentEmailPattern.test(email)) {
        alert("Please enter a valid email address.");
        loader.style.display = 'none';
      
        return;
    }

    if (!studentPasswordPattern.test(password)) {
        alert("Password must be at least 8 characters long and contain at least one capital letter and one number.");
        loader.style.display = 'none';
       
        return;
    }

    const formData = new FormData(StudentForm);
    try {
        const response = await fetch('https://tution-media-platform-backend.vercel.app/api/student/register/', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message || "Registration successful!");
           
                window.location.href = "login.html";
  
        } else {
            const errorData = await response.json();
            for (const [key, value] of Object.entries(errorData)) {
                value.forEach(errorMessage => {
                    alert(`${key}: ${errorMessage}`);
                });
            }
        }
    } catch (error) {
        alert("An error occurred during registration!");
    } finally {
        loader.style.display = 'none';
       
    }
});