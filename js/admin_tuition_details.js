
const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};


const getPostDetail = () => {
    const tuitionId = getQueryParams("id");

    fetch(`https://tuition-media-platform-backend.onrender.com/api/tution/list/${tuitionId}/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); 

       
        document.getElementById('tuition-title').textContent = `Tuition For ${data.title}`;

 
        const subjectsElement = document.getElementById('subjects');
        if (Array.isArray(data.subjects) && data.subjects.length > 0) {
            const subjectNames = data.subjects.map(subjectId => {
                
                switch (subjectId) {
                    case 1:
                        return 'English';
                    case 2:
                        return 'General Math';
                    case 3:
                        return 'Bangla';
                    case 4:
                        return 'Religion';
                    case 5:
                        return 'Higher Math';
                    case 6:
                        return 'Biology';
                    case 7:
                        return 'Physics';
                    case 8:
                        return 'Chemistry';
                    case 9:
                        return 'All Subjects';
                    case 10:
                        return 'General Science';
                    default:
                        return 'Unknown Subject';
                }
                
            });
            const subjectsString = subjectNames.join(', ');
            subjectsElement.textContent = `Subjects: ${subjectsString}`;
        } else {
            subjectsElement.textContent = `Subjects: N/A`; 
        }

        document.getElementById('tuition-class').textContent = `Tuition Class: ${data.tuition_class}`;
        document.getElementById('availability').textContent = `Availability: ${data.availability}`;
        document.getElementById('description').textContent = `Description: ${data.description}`;
        document.getElementById('medium').textContent = `Medium: ${data.medium}`;
        document.getElementById('student-gender').textContent = `Student Gender: ${data.student_gender}`;
        document.getElementById('preferred-tutor-gender').textContent = `Preferred Tutor Gender: ${data.preferred_tutor_gender}`;
        document.getElementById('tutoring-time').textContent = `Tutoring Time: ${data.tutoring_time}`;
        document.getElementById('salary').textContent = `Salary: ${data.salary}`;

        const editButton = document.getElementById('edit-button');
            editButton.href = `edit_tuition.html?id=${tuitionId}`;
      })
    
};


document.addEventListener('DOMContentLoaded', getPostDetail);






const deleteTuition = () => {
    const token = localStorage.getItem("token");
    const tuitionId = getQueryParams("id");
    fetch(`https://tuition-media-platform-backend.onrender.com/api/tution/${tuitionId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => (window.location.href = "./admin_profile.html"))
      .catch((err) => console.log(err));
  };
  
  document.getElementById("delete-button").addEventListener("click", deleteTuition);

