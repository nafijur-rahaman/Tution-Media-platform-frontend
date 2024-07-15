const handleLogin = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const password = getValue("password");
  
  if (username && password) {
    fetch("https://tution-media-platform.onrender.com/api/student/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        if (data.Token && data.student_id) {
          localStorage.setItem("token", data.Token);
          localStorage.setItem("user_id", data.student_id);
          alert("Login successful!");
          window.location.href = "student_profile.html";
        } else {
          alert("Login failed! Please check your username and password.");
          // console.log("token not available");
        }
      });
  }
};




  const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
  };