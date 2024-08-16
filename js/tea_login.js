const handleLogin = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const password = getValue("password");

  if (username && password) {
      fetch("https://tuition-media-platform-backend.onrender.com/api/tutor/login/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username, password }),
      })
      .then((res) => res.json())
      .then((data) => {
          if (data.Token && data.tutor_id) {
              localStorage.setItem("tea_token", data.Token);
              localStorage.setItem("user_id", data.tutor_id);
              alert("Login successful!");
              window.location.href = "teacher_profile.html";
          } else {
              alert(data.error || "Login failed! Please check your credentials.");
          }
      })
      .catch((error) => {
          alert("An error occurred: " + error.message);
      });
  } else {
      alert("Please enter both username and password.");
  }
};

const getValue = (id) => {
  return document.getElementById(id).value;
};
