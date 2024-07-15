

const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const password = getValue("password");
    // console.log(username, password);
    if ((username, password)) {
      fetch("https://tution-media-platform.onrender.com/api/tutor/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
  
          if (data.Token && data.tutor_id) {
            localStorage.setItem("tea_token", data.Token);
            localStorage.setItem("user_id", data.tutor_id);
            alert("Login successful!");
            window.location.href = "teacher_profile.html";
          }
        });
    }
  };




  const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
  };