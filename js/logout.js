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











const TutorHandleLogout = () => {
    const token = localStorage.getItem("teacher_token");
    if (!token) {
        showFailureAlert("No token found");
        return;
    }

    fetch("http://127.0.0.1:8000/api/tutor/logout/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
    })
    .then(res =>{
        if(!res.ok){
            throw new Error("Logout unsuccessful");
        }
        return res.json();
    })
    .then((data) => {
        showSuccessAlert("Logout successful");
        localStorage.removeItem("teacher_token");
        localStorage.removeItem("user_id");
        setTimeout(() => {
            window.location.href = "home.html";
        }, 3000);

    })
    .catch(error => showFailureAlert(error))
};
const StudentHandleLogout = () => {
    const token = localStorage.getItem("student_token");
    if (!token) {
        showFailureAlert("No token found");
        return;
    }

    fetch("http://127.0.0.1:8000/api/tutor/logout/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
    })
    .then(res =>{
        if(!res.ok){
            throw new Error("Logout unsuccessful");
        }
        return res.json();
    })
    .then((data) => {
        showSuccessAlert("Logout successful");
        localStorage.removeItem("student_token");
        localStorage.removeItem("user_id");
        setTimeout(() => {
            window.location.href = "home.html";
        }, 3000);
    })
    .catch(error => showFailureAlert(error))
};



const adminLogout = () => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
        showFailureAlert("No token found");
        return;
    }

    fetch("http://127.0.0.1:8000/api/admin_panel/logout/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
    })
    .then(res =>{
        return res.json();
    })
    .then((data) => {
        showSuccessAlert("Logout successful");
        localStorage.removeItem("admin_token");
        localStorage.removeItem("user_id");
        setTimeout(() => {
            window.location.href = "home.html";
        }, 3000);
    })

};
