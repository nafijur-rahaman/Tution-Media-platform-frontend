const handleTeacherRegistration = (event) => {
    event.preventDefault();
    
    const username = getValue("username");
    const first_name = getValue("fname");
    const last_name = getValue("lname");
    const email = getValue("email");
    const password = getValue("pass");
    const confirm_password = getValue("c_pass");
    const phone_number = getValue("phone_number");
    const location = getValue("location");
    const tuition_district = getValue("tuition_district");
    const minimum_salary = getValue("minimum_salary");
    const tutoring_experience = getValue("tutoring_experience");
    const extra_facilities = getValue("extra_facilities");
    const medium_of_instruction = getValue("medium_of_instruction");
    const status = getValue("status");
    const gender = getValue("gender");
    const image = document.getElementById("image").files[0];
    
    const info = new FormData();
    info.append('username', username);
    info.append('first_name', first_name);
    info.append('last_name', last_name);
    info.append('email', email);
    info.append('password', password);
    info.append('confirm_password', confirm_password);
    info.append('phone_number', phone_number);
    info.append('location', location);
    info.append('tuition_district', tuition_district);
    info.append('minimum_salary', minimum_salary);
    info.append('tutoring_experience', tutoring_experience);
    info.append('extra_facilities', extra_facilities);
    info.append('medium_of_instruction', medium_of_instruction);
    info.append('status', status);
    info.append('gender', gender);
    info.append('image', image);

    if (password === confirm_password) {
        document.getElementById("error").innerText = "";
        
        // Password validation regex
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            console.log(info); 
            
            fetch("https://tution-media-platform.onrender.com/api/tutor/register/", {
                method: "POST",
                body: info,
            })
            .then((res) => res.json())  // parse the response as JSON
            .then((data) => {
                console.log(data)
            })
        
        } else {
            document.getElementById("error").innerText = "Password must contain at least 8 characters, at least one letter, one number, and one special character.";
        }
    } else {
        document.getElementById("error").innerText = "Password and confirm password do not match.";
    }
};

const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};
