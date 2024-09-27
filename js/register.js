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



 document.getElementById('showTutorForm').addEventListener('click', function() {
    document.getElementById('tutorForm').classList.remove('hidden');
    document.getElementById('studentForm').classList.add('hidden');
    document.getElementById('showTutorForm').classList.add('bg-blue-600', 'text-white');
    document.getElementById('showStudentForm').classList.remove('bg-green-600', 'text-white');
});

document.getElementById('showStudentForm').addEventListener('click', function() {
    document.getElementById('studentForm').classList.remove('hidden');
    document.getElementById('tutorForm').classList.add('hidden');
    document.getElementById('showStudentForm').classList.add('bg-green-600', 'text-white');
    document.getElementById('showTutorForm').classList.remove('bg-blue-600', 'text-white');
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
        showFailureAlert("Username must be 3-15 characters long, containing only letters, numbers, and underscores.");
        loaderOverlay.style.display = 'none';
    
        return;
    }

    if (!emailPattern.test(email)) {
        showFailureAlert("Please enter a valid email address.");
        loaderOverlay.style.display = 'none';
     
        return;
    }

    if (!passwordPattern.test(password)) {
        showFailureAlert("Password must be at least 8 characters long and contain at least one Capital letter and one number.");
        loaderOverlay.style.display = 'none';

        return;
    }

    const formData = new FormData(form);
    try {
        const response = await fetch('http://127.0.0.1:8000/api/tutor/register/', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            showSuccessAlert(data.message || "Registration successful!");
        } else {
            const errorData = await response.json();
            for (const [key, value] of Object.entries(errorData)) {
                value.forEach(errorMessage => {
                    showFailureAlert(`${key}: ${errorMessage}`);
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
        showFailureAlert("Username must be 3-15 characters long, containing only letters, numbers, and underscores.");
        loader.style.display = 'none';
   
        return;
    }

    if (!studentEmailPattern.test(email)) {
        showFailureAlert("Please enter a valid email address.");
        loader.style.display = 'none';
      
        return;
    }

    if (!studentPasswordPattern.test(password)) {
        showFailureAlert("Password must be at least 8 characters long and contain at least one capital letter and one number.");
        loader.style.display = 'none';
       
        return;
    }

    const formData = new FormData(StudentForm);
    try {
        const response = await fetch('http://127.0.0.1:8000/api/student/register/', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            showSuccessAlert(data.message || "Registration successful!");
        } else {
            const errorData = await response.json();
            for (const [key, value] of Object.entries(errorData)) {
                value.forEach(errorMessage => {
                    showFailureAlert(`${key}: ${errorMessage}`);
                });
            }
        }
    } catch (error) {
        showFailureAlert("An error occurred during registration!");
    } finally {
        loader.style.display = 'none';
       
    }
});