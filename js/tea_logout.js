const TutorHandleLogout = () => {
    const token = localStorage.getItem("tea_token");
    if (!token) {
        console.error("No token found");
        return;
    }

    fetch("https://tution-media-platform.onrender.com/api/tutor/logout/", {
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
