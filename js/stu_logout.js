const handleLogout = () => {
  const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found");
        return;
    }

    fetch("https://tution-media-platform.onrender.com/api/student/logout/", {
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
    .catch((error) => {
        console.error("Logout Error:", error);
    });
};
