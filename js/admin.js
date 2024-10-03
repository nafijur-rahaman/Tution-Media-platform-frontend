function showSuccessAlert(message, title = "Success") {
    const alertBox = document.getElementById("success-alert");
    const alertTitle = document.getElementById("success-alert-title");
    const alertMessage = document.getElementById("success-alert-message");
  
    alertTitle.innerText = title;
    alertMessage.innerText = message;
  
    alertBox.classList.remove("hidden");
    alertBox.classList.add("flex");
  
    setTimeout(() => {
      alertBox.classList.add("hidden");
    }, 5000);
  }
  
  function showFailureAlert(message, title = "Failure") {
    const alertBox = document.getElementById("failure-alert");
    const alertTitle = document.getElementById("failure-alert-title");
    const alertMessage = document.getElementById("failure-alert-message");
  
    alertTitle.innerText = title;
    alertMessage.innerText = message;
  
    alertBox.classList.remove("hidden");
    alertBox.classList.add("flex");
  
    setTimeout(() => {
      alertBox.classList.add("hidden");
    }, 5000);
  }
  
  document.getElementById("close-success-alert").addEventListener("click", () => {
    document.getElementById("success-alert").classList.add("hidden");
  });
  
  document.getElementById("close-failure-alert").addEventListener("click", () => {
    document.getElementById("failure-alert").classList.add("hidden");
  });


  const loadTuition = () => {
    fetch('https://tution-media-platform-backend.vercel.app/api/tuition/list/')
        .then((res) => {
            if (!res.ok) {
                throw new Error('Tuition not found');
            }
            return res.json();
        })
        .then((data) => {
            // console.log(data)
            const tuitionList = document.querySelector('#tuition-list'); // Make sure this ID matches your table's tbody ID
            tuitionList.innerHTML = ''; // Clear existing rows
            
            data.forEach((tuition) => {
                const row = document.createElement('tr');
                row.className = 'border-b border-gray-300';
                row.innerHTML = `
                    <td class="py-2 px-4">${tuition.title}</td>
                    <td class="py-2 px-4">${tuition.location || 'N/A'}</td>
                    <td class="py-2 px-4">
                        <button onclick="openEditModal(${tuition.id})" class="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow hover:bg-yellow-600">Edit</button>
                        <button onclick="deleteTuition(${tuition.id})" class="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 ml-2">Delete</button>
                    </td>
                `;
                tuitionList.appendChild(row);
            });
        })
        .catch((error) => {
           
            showFailureAlert(error);
        });
};


 document.addEventListener('DOMContentLoaded', loadTuition);






function openEditModal(tuitionId) {
  
    document.getElementById('tuitionId').value = tuitionId;

   
    document.getElementById('modal').classList.remove('hidden');

    fetch(`https://tution-media-platform-backend.vercel.app/api/tuition/list/${tuitionId}/`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("title").value = data.title;
            document.getElementById("description").value = data.description;
            document.getElementById("salary").value = data.salary;
            document.getElementById("location").value = data.location;
            document.getElementById("requirement").value=data.requirement;
            document.getElementById("number_of_students").value = data.number_of_students;
            
         
            function selectOptionByValue(selectId, value) {
                const selectElement = document.getElementById(selectId);
                selectElement.value = value;
            }
            
           
            function selectMultipleOptions(selectId, values) {
                const selectElement = document.getElementById(selectId);
                Array.from(selectElement.options).forEach(option => {
                    option.selected = values.includes(option.value);
                });
            }
            
            
            selectOptionByValue("tuition_class", data.tuition_class);
            selectMultipleOptions("subjects", data.subjects);
            selectOptionByValue("medium", data.medium);
            selectOptionByValue("student_gender", data.student_gender);
            selectOptionByValue("preferred_tutor_gender", data.preferred_tutor_gender);
            selectOptionByValue("tutoring_time", data.tutoring_time);
            
            
       
            
        })
        .catch(error => showFailureAlert('Error fetching tuition data:', error));
}


function saveChanges() {

    const tuitionId = document.getElementById('tuitionId').value;

    const updatedData = {
        author: window.localStorage.getItem("user_id"),
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        subjects: Array.from(document.getElementById('subjects').selectedOptions).map(option => option.value),
        tuition_class: document.getElementById("tuition_class").value,
        medium: document.getElementById("medium").value,
        student_gender: document.getElementById("student_gender").value,
        preferred_tutor_gender: document.getElementById("preferred_tutor_gender").value,
        tutoring_time: document.getElementById("tutoring_time").value,
        number_of_students: document.getElementById("number_of_students").value,
        salary: document.getElementById("salary").value,
        location: document.getElementById("location").value,
        requirement:document.getElementById("requirement").value,
  
    };

 
    fetch(`https://tution-media-platform-backend.vercel.app/api/tuition/list/${tuitionId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        showSuccessAlert("Tuition update successfully")
        loadTuition()
        
        document.getElementById('modal').classList.add('hidden');
 
    })
    .catch(error => showFailureAlert('Error updating tuition'));
}


document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').classList.add('hidden');
});






function mapGender(genderValue) {
    if (genderValue === 'M') {
        return 'Male';
    } else if (genderValue === 'F') {
        return 'Female';
    }
    return genderValue; 
}



function deleteTuition(tuitionId) {
 
    if (confirm("Are you sure you want to delete this tuition?")) {
  
        fetch(`https://tution-media-platform-backend.vercel.app/api/tuition/list/${tuitionId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            
          
            if (response.status === 204) {
              
                showSuccessAlert('Tuition deleted successfully');
             loadTuition()
            } else {
                return response.json(); 
            }
        })
 
      
    }
}


function openAddTuitionModal() {
    document.getElementById('addTuitionModal').classList.remove('hidden');
}

function closeAddTuitionModal() {
    document.getElementById('addTuitionModal').classList.add('hidden');
}

function addTuition() {
    const title = document.getElementById('add_title').value;
    const description = document.getElementById('add_description').value;
    const salary = document.getElementById('add_salary').value;
    const location = document.getElementById('add_location').value;
    const requirement = document.getElementById('add_requirement').value;
    const numberOfStudents = document.getElementById('add_number_of_students').value;
    const tuitionClass = document.getElementById('add_tuition_class').value;
    const subjects = Array.from(document.getElementById('add_subjects').selectedOptions).map(option => option.value);
    const availability = document.getElementById('add_availability').value;
    const medium = document.getElementById('add_medium').value;
    const studentGender = document.getElementById('add_student_gender').value;
    const preferredTutorGender = document.getElementById('add_preferred_tutor_gender').value;
    const tutoringTime = document.getElementById('add_tutoring_time').value;

   
    const author = window.localStorage.getItem("user_id") 
    const tuitionData = {
        title,
        description,
        salary,
        location,
        requirement,
        number_of_students: numberOfStudents,
        tuition_class: tuitionClass,
        subjects,
        availability,
        medium,
        student_gender: studentGender,
        preferred_tutor_gender: preferredTutorGender,
        tutoring_time: tutoringTime,
        author, 
    };

 
    fetch('https://tution-media-platform-backend.vercel.app/api/tuition/list/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tuitionData),
    })
    .then(response => response.json())
    .then(data => {
    
        showSuccessAlert("Tuition add successfully");
       loadTuition()
        closeAddTuitionModal();
       
    })
    .catch((error) => {
        showFailureAlert('Error:');
    });
}




function fetchTutorApplications() {
    fetch('https://tution-media-platform-backend.vercel.app/api/application/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(applications => {
            const applicationsBody = document.getElementById('applications-body');
            applicationsBody.innerHTML = '';

            applications.forEach(application => {
                // console.log(application)
                const row = document.createElement('tr');
                row.classList.add('border-b', 'border-gray-300');

                row.innerHTML = `
                    <td class="py-2 px-4">${application.applicant_name} </td>
                    <td class="py-2 px-4">${application.message.slice(0,20)}</td>
                    <td class="py-2 px-4">${application.status}</td>
                    <td class="py-2 px-4">
<button class="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:bg-green-600" onclick="acceptApplication(${application.id}, '${application.tutor}', '${application.tuition}', '${application.status}')">Accept</button>
                        <button class="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 ml-2" onclick="rejectApplication(${application.id})">Reject</button>
                    </td>
                `;

                applicationsBody.appendChild(row);
            });
        })
        .catch(error => {
           showFailureAlert('Error fetching applications:', error);
        });
}

function acceptApplication(id, tutor, tuition, status) {
    if (status === 'accepted') {
        showFailureAlert('This application has already been accepted.');
        return;
    }
    fetch(`https://tution-media-platform-backend.vercel.app/api/application/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({  status: 'accepted',
            tutor: tutor,
            tuition: tuition
                               
         })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to accept application');
        }
        showSuccessAlert("Application accepted successfully");
        fetchTutorApplications();
    })
    .catch(error => {
       showFailureAlert('Error accepting application:', error);
    });
}

function rejectApplication(id) {
    fetch(`https://tution-media-platform-backend.vercel.app/api/application/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to reject application');
        }
        fetchTutorApplications();
        showSuccessAlert("application rejected successfully")
    })
    .catch(error => {
       showFailureAlert('Error rejecting application:', error);
    });
}


document.addEventListener('DOMContentLoaded', fetchTutorApplications);


function fetchDashboardStatistics() {
    fetch('https://tution-media-platform-backend.vercel.app/api/student/list/')
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const totalStudents = data.length;
            document.getElementById('total-students').textContent = totalStudents;
        })
        .catch(error =>showFailureAlert('Error fetching total students:', error));

    fetch('https://tution-media-platform-backend.vercel.app/api/tuition/list/')
        .then(response => response.json())
        .then(data => {
            const totalTuitions = data.length;
            document.getElementById('total-tuitions').textContent = totalTuitions;
        })
        .catch(error =>showFailureAlert('Error fetching total tuitions:', error));

    fetch('https://tution-media-platform-backend.vercel.app/api/tutor/list/')
        .then(response => response.json())
        .then(data => {
            const activeTutors = data.length
            document.getElementById('active-tutors').textContent = activeTutors;
        })
        .catch(error =>showFailureAlert('Error fetching active tutors:', error));

    fetch('https://tution-media-platform-backend.vercel.app/api/application/')
        .then(response => response.json())
        .then(data => {
            const pendingApplications = data.filter(application => application.status === 'applied').length;
            document.getElementById('pending-applications').textContent = pendingApplications;
        })
        .catch(error =>showFailureAlert('Error fetching pending applications:', error));
}

document.addEventListener('DOMContentLoaded', fetchDashboardStatistics);


function openChangePasswordModal() {
    document.getElementById("changePasswordModal").classList.remove("hidden");
}

function closeChangePasswordModal() {
    document.getElementById("changePasswordModal").classList.add("hidden");
}

function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        alert("New passwords do not match.");
        return;
    }

    const user_id = localStorage.getItem("user_id");
    const token=localStorage.getItem("admin_token");
    fetch(`https://tution-media-platform-backend.vercel.app/api/student/change-password/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            user_id: user_id,
            old_password: currentPassword,
            new_password: newPassword,
            new_password_confirm: confirmNewPassword
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Password change failed');
        }
        return response.json();
    })
    .then(data => {
        showSuccessAlert("Password changed successfully.");
        closeChangePasswordModal;
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    })
    .catch(error => {
        alert(error.message);
    });
}



