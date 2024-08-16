const addTuition = (event) => {
    event.preventDefault();
  
  const form = document.getElementById("tuition-form");
  const formData = new FormData(form);
  const token = localStorage.getItem("token");
  
  
  const authorId = localStorage.getItem("user_id");
  const postData = {
    title: formData.get("title"),
    subjects: formData.getAll("subjects"),
    tuition_class: formData.get("tuition_class"),
    availability:  "true",
    description: formData.get("description"),
    medium: formData.get("medium"),
    student_gender: formData.get("student_gender"),
    preferred_tutor_gender: formData.get("preferred_tutor_gender"),
    tutoring_time: formData.get("tutoring_time"),
    number_of_students: parseInt(formData.get("number_of_students")), 
    salary: parseFloat(formData.get("salary")), 
    location: formData.get("location"),
    author: parseInt(authorId),
  };
      // console.log(postData);

      
  
    fetch("https://tuition-media-platform-backend.onrender.com/api/tution/list/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
          alert("Post Added Successfully");
        window.location.href = "./admin_profile.html";
      });
  };