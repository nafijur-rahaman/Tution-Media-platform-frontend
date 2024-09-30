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



  const handleLogin = (event) => {
    event.preventDefault();
    const userRole = document.getElementById('userRole').value;
    document.getElementById('loader-overlay').style.display = 'flex';

    if (userRole === 'admin') {
        handleAdminLogin(event);
    } else if (userRole === 'teacher') {
        handleTeacherLogin(event);
    } else if (userRole === 'student') {
        handleStudentLogin(event);
    }
};

const handleTeacherLogin = (event) => {
    const username = getValue("username");
    const password = getValue("password");

    if (username && password) {
        fetch("https://tution-media-platform-backend.vercel.app/api/tutor/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            document.getElementById('loader-overlay').style.display = 'none';

            if (data.Token && data.tutor_id) {
                localStorage.setItem("teacher_token", data.Token);
                localStorage.setItem("user_id", data.tutor_id);
                showSuccessAlert("Login successful!");
                setTimeout(() => {
                    window.location.href = "teacher_profile.html"; 
                }, 3000);
            } else {
                showFailureAlert(data.error || "Login failed! Please check your credentials.");
            }
        })
        .catch((error) => {
            document.getElementById('loader-overlay').style.display = 'none';
            showFailureAlert("An error occurred: " + error.message);
        });
    } else {
        showFailureAlert("Please enter both username and password.");
        document.getElementById('loader-overlay').style.display = 'none';
    }
};

const handleStudentLogin = (event) => {
    const username = getValue("username");
    const password = getValue("password");

    if (username && password) {
        fetch("https://tution-media-platform-backend.vercel.app/api/student/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            document.getElementById('loader-overlay').style.display = 'none';

            if (data.Token && data.student_id) {
                localStorage.setItem("student_token", data.Token);
                localStorage.setItem("user_id", data.student_id);
                showSuccessAlert("Login successful!");
                setTimeout(() => {
                    window.location.href = "student_profile.html"; 
                }, 3000);
            } else {
                showFailureAlert(data.error || "Login failed! Please check your credentials.");
            }
        })
        .catch((error) => {
            document.getElementById('loader-overlay').style.display = 'none';
            showFailureAlert("An error occurred: " + error.message);
        });
    } else {
        showFailureAlert("Please enter both username and password.");
        document.getElementById('loader-overlay').style.display = 'none';
    }
};

const handleAdminLogin = (event) => {
    const username = getValue("username");
    const password = getValue("password");
    
    if (username && password) {
        fetch("https://tution-media-platform-backend.vercel.app/api/admin_panel/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            document.getElementById('loader-overlay').style.display = 'none';

            if (data.Token && data.admin_id) {
                localStorage.setItem("admin_token", data.Token);
                localStorage.setItem("user_id", data.admin_id);
                showSuccessAlert("Login successful!");
                setTimeout(() => {
                    window.location.href = "admin.html"; 
                }, 3000);
            } else {
                showFailureAlert("Login failed! Please check your username and password.");
                console.log("Token not available");
            }
        })
        .catch((error) => {
            document.getElementById('loader-overlay').style.display = 'none';
            showFailureAlert("An error occurred: " + error.message);
        });
    } else {
        showFailureAlert("Please enter both username and password.");
        document.getElementById('loader-overlay').style.display = 'none';
    }
};

const getValue = (id) => {
    return document.getElementById(id).value;
};
