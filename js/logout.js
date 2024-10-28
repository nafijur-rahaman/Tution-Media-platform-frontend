// function alert(message, title = "Success") {
//     const alertBox = document.getElementById("success-alert");
//     const alertTitle = document.getElementById("success-alert-title");
//     const alertMessage = document.getElementById("success-alert-message");
  
//     alertTitle.innerText = title;
//     alertMessage.innerText = message;
  
//     alertBox.classList.remove("hidden");
//     alertBox.classList.add("flex");
  
//     setTimeout(() => {
//       alertBox.classList.add("hidden");
//     }, 5000);
//   }
  
//   function alert(message, title = "Failure") {
//     const alertBox = document.getElementById("failure-alert");
//     const alertTitle = document.getElementById("failure-alert-title");
//     const alertMessage = document.getElementById("failure-alert-message");
  
//     alertTitle.innerText = title;
//     alertMessage.innerText = message;
  
//     alertBox.classList.remove("hidden");
//     alertBox.classList.add("flex");
  
//     setTimeout(() => {
//       alertBox.classList.add("hidden");
//     }, 5000);
//   }
  
//   document.getElementById("close-success-alert").addEventListener("click", () => {
//     document.getElementById("success-alert").classList.add("hidden");
//   });
  
//   document.getElementById("close-failure-alert").addEventListener("click", () => {
//     document.getElementById("failure-alert").classList.add("hidden");
//   });











const TutorHandleLogout = () => {
    const token = localStorage.getItem("teacher_token");
    if (!token) {
        alert("No token found");
        return;
    }

    fetch("https://tution-media-platform-backend.vercel.app/api/tutor/logout/", {
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
        alert("Logout successful");
        localStorage.removeItem("teacher_token");
        localStorage.removeItem("user_id");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);

    })
    .catch(error => alert(error))
};
const StudentHandleLogout = () => {
    const token = localStorage.getItem("student_token");
    if (!token) {
        alert("No token found");
        return;
    }

    fetch("https://tution-media-platform-backend.vercel.app/api/tutor/logout/", {
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
        alert("Logout successful");
        localStorage.removeItem("student_token");
        localStorage.removeItem("user_id");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    })
    .catch(error => alert(error))
};



const adminLogout = () => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
        alert("No token found");
        return;
    }

    fetch("https://tution-media-platform-backend.vercel.app/api/admin_panel/logout/", {
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
        alert("Logout successful");
        localStorage.removeItem("admin_token");
        localStorage.removeItem("user_id");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    })

};
