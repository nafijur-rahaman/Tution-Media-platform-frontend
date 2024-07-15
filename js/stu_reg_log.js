const handleStudentRegistration = (event) => {
    event.preventDefault();
    
    const username = getValue("username");
    const first_name = getValue("fname");
    const last_name = getValue("lname");
    const email = getValue("email");
    const mobile_no = getValue("mobile");
    const password = getValue("pass");
    const confirm_password = getValue("c_pass");
    
    const info = {
        username,
        first_name,
        last_name,
        email,
        mobile_no,
        password,
        confirm_password,
    };
    
    if (password === confirm_password) {
        document.getElementById("error").innerText = "";
        
        // Password validation regex
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            console.log(info); 
            
            fetch(" https://tution-media-platform.onrender.com/api/student/register/", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(info),
              })
                .then((res) => {
                    alert(
                        "Registration Successfull. Please check email for confirmation email"
                      );
                      window.location.href = "login.html";
                })
                .then((data) => console.log(data));
        
            
        } else {
            document.getElementById("error").innerText = "Password must contain at least 8 characters, at least one letter, one number, and one special character.";
        }
    } else {
        document.getElementById("error").innerText = "Password and confirm password do not match.";
        alert("Password and confirm password do not match.");
    }
};

const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};





