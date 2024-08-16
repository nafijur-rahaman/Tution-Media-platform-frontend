const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const password = getValue("password");
    
    if (username && password) {
      fetch("https://tuition-media-platform-backend.onrender.com/api/admin_pannel/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
  
          if (data.Token && data.admin_id) {
            localStorage.setItem("token", data.Token);
            localStorage.setItem("user_id", data.admin_id);
            alert("Login successful!");
            window.location.href = "admin_profile.html";
          } else {
            alert("Login failed! Please check your username and password.");
            console.log("token not available");
          }
        });
    }else{
      alert("Please enter both username and password.");
    }
  };
  
  
  
  
    const getValue = (id) => {
      const value = document.getElementById(id).value;
      return value;
    };