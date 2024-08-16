const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};



// Edit post 
function fetchTuitionDetails(tuitionId) {
    fetch(`https://tuition-media-platform-backend.onrender.com/api/tution/list/${tuitionId}/`)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("title").value = data.title;
        document.getElementById("description").value = data.description;
        document.getElementById("salary").value = data.salary;
        document.getElementById("location").value = data.location;
        document.getElementById("number_of_students").value = data.number_of_students;
        selectOptionByValue("tuition_class", data.tuition_class);
        selectMultipleOptions("subjects", data.subjects);
        selectOptionByValue("availability", data.availability);
        selectOptionByValue("medium", data.medium);
        selectOptionByValue("student_gender", data.student_gender);
        selectOptionByValue("preferred_tutor_gender", data.preferred_tutor_gender);
        selectOptionByValue("tutoring_time", data.tutoring_time);
      })
  
  }

  function selectOptionByValue(selectId, value) {
    const selectElement = document.getElementById(selectId);
    for (const option of selectElement.options) {
      if (option.value === value) {
        option.selected = true;
        break;
      }
    }
  }

  function selectMultipleOptions(selectId, values) {
    const selectElement = document.getElementById(selectId);
    const valueSet = new Set(values);
    for (const option of selectElement.options) {
      if (valueSet.has(option.value)) {
        option.selected = true;
      }
    }
  }




  function editTuition(event) {
    event.preventDefault();

    const form = document.getElementById("tuition-form");
    const formData = new FormData(form);
    const token = localStorage.getItem("token");
    
    
    const authorId = localStorage.getItem("user_id");
    const postData = {
      title: formData.get("title"),
      subjects: formData.getAll("subjects"),
      tuition_class: formData.get("tuition_class"),
      availability: formData.get("availability") === "true",
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
        console.log(postData);
  
        
    const tuitionId = getQueryParams("id");
      fetch(`https://tuition-media-platform-backend.onrender.com/api/tution/${tuitionId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
            alert("tuition update Successfully");
          window.location.href = "./admin_profile.html";
        });
    };

  const tuitionId = getQueryParams("id");
  fetchTuitionDetails(tuitionId)