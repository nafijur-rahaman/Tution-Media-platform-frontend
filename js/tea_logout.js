const TutorHandleLogout = () => {
    const token = localStorage.getItem("tea_token");
    if (!token) {
        console.error("No token found");
        return;
    }

    fetch("https://tuition-media-platform-backend.onrender.com/api/tutor/logout/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
    })
    .then((res) => {
    console.log(res.json()) 
    })
    .then((data) => {
        console.log("Logout successful", data);
        localStorage.removeItem("tea_token");
        localStorage.removeItem("user_id");
        window.location.href = "home.html"; 
    })
};



const adminLogout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found");
        return;
    }

    fetch("https://tuition-media-platform-backend.onrender.com/api/admin_pannel/logout/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
    })
    .then((res) => {
    console.log(res.json()) 
    })
    .then((data) => {
        console.log("Logout successful", data);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.href = "home.html"; 
    })
};
