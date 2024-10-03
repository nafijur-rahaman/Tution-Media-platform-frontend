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

const loadUserDetails = () => {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://tution-media-platform-backend.vercel.app/api/student/list/${user_id}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Campaign not found");
            }
            return res.json();
        })
        .then((data) => {
            const profile_header = document.getElementById("student_details");
            profile_header.innerHTML = `
              <img src="https://res.cloudinary.com/dwsp8rft8/${data.image}" alt="Profile Picture" class="w-32 h-32 rounded-full mr-6">
            <div>
                <h2 class="text-3xl font-bold mb-2"> ${data.user.first_name} ${data.user.last_name} </h2>
                <p class="text-gray-600 mb-4">Student</p>
                <p class="text-gray-800 mb-4">
                    Hello! I am ${data.user.username} a passionate student looking for a tutor to help me with my math and science subjects. Feel free to reach out if you think you can help!
                </p>
                <button class="bg-green-600 text-white text-xl font-semibold py-2 px-4 rounded-lg hover:bg-green-700" onclick="openPasswordModal()">Change Password</button>
            </div>
        `;
        })
        .catch((error) => {
            showFailureAlert("Error fetching user details");
        });
};

document.addEventListener("DOMContentLoaded", loadUserDetails);

const loadTuition = () => {
    const student_id = window.localStorage.getItem("user_id");
    fetch(`https://tution-media-platform-backend.vercel.app/api/tuition/list/?author=${student_id}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Campaign not found");
            }
            return res.json();
        })
        .then((data) => {
            const parent = document.getElementById("parent");
            parent.innerHTML = ""; // Clear previous content

            data.forEach((tuition) => {
                const child = document.createElement("div");
                child.classList.add(
                    "bg-white",
                    "p-4",
                    "rounded-lg",
                    "shadow-md",
                    "mb-4"
                );

                child.innerHTML = `
                    <h4 class="text-xl font-bold mb-2">${tuition.title}</h4>
                    <p class="text-gray-700 mb-2">Description: ${tuition.description.slice(0, 20)}....</p>
                    <p class="text-gray-700 mb-2">Fee: ${tuition.salary} BDT</p>
                    <div class="flex space-x-2">
                        <button onclick="openEditModal(${tuition.id})" class="text-blue-600 hover:underline">Edit</button>
                        <button onclick="deleteTuition(${tuition.id})" class="text-red-600 hover:underline">Delete</button>
                    </div>
                `;

                parent.appendChild(child);
            });
        })
        .catch((error) => showFailureAlert(error));
};

window.onload = loadTuition;

function openEditModal(tuitionId) {
    document.getElementById('tuitionId').value = tuitionId;
    document.getElementById('modal').classList.remove('hidden');

    fetch(`https://tution-media-platform-backend.vercel.app/api/tuition/list/${tuitionId}/`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            document.getElementById("title").value = data.title;
            document.getElementById("description").value = data.description;
            document.getElementById("salary").value = data.salary;
            document.getElementById("location").value = data.location;
            document.getElementById("requirement").value=data.requirement
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
        .catch(error => console.error('Error fetching tuition data:', error));
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
// console.log(updatedData)
    fetch(`https://tution-media-platform-backend.vercel.app/api/tuition/list/${tuitionId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        showSuccessAlert("Tuition change successfully");
        document.getElementById('modal').classList.add('hidden');
    })
    .catch(error => showFailureAlert('Error updating tuition:', error));
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
                showSuccessAlert('Tuition deleted successfully!');
                loadTuition();
            } else {
                return response.json(); 
            }
        })
        .catch(error => showFailureAlert(error));
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

    const author = window.localStorage.getItem("user_id");
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
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        showSuccessAlert('Tuition added successfully!');
        closeAddTuitionModal();
        loadTuition();
    })
    .catch(error => showFailureAlert(error));
}

function openPasswordModal() {
    document.getElementById('passwordModal').classList.remove('hidden');
}

function closePasswordModal() {
    document.getElementById('passwordModal').classList.add('hidden');
}

function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        showFailureAlert("New passwords do not match.");
        return;
    }

    const user_id = localStorage.getItem("user_id");
    const token=localStorage.getItem("student_token");
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
        closePasswordModal();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    })
    .catch(error => {
        showFailureAlert(error.message);
    });
}
