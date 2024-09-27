document.addEventListener('DOMContentLoaded', () => {
    const studentToken = localStorage.getItem('student_token');
    const applyButtonContainer = document.getElementById('applyButton');

    if (studentToken) {
        applyButtonContainer.style.display = 'none';
    }
});


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

const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

const getPostDetail = () => {
    const tuitionId = getQueryParams("id");

    fetch(`https://tution-media-platform-backend.onrender.com/api/tuition/list/${tuitionId}/`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Campaign not found");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data)
            const tuition = document.getElementById("tuition-details");
            tuition.innerHTML = `
             <div class="border-b pb-4 mb-6">
            <h2 class="text-3xl font-bold text-gray-800">Tuition Details</h2>
            <p class="text-sm text-gray-500">Posted on: ${data.created}</p>
            </div>


        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
        <div>
        <h3 class="text-xl font-semibold mb-2">General Information</h3>
        <p class="mb-2"><strong>Subject:</strong> <span class="text-blue-600"> ${data.subject_name} </span></p>
        <p class="mb-2"><strong>Grade Level:</strong> <span class="text-blue-600">${data.tuition_class} </span></p>
        <p class="mb-2"><strong>Location:</strong> <span class="text-blue-600"> ${data.location} </span></p>
        </div>
        <div>
        <h3 class="text-xl font-semibold mb-2">Timing & Payment</h3>
        <p class="mb-2"><strong>Time:</strong> <span class="text-blue-600">${data.tutoring_time} </span></p>
        <p class="mb-2"><strong>Days:</strong> <span class="text-blue-600"> ${data.days_name} </span></p>
        <p class="mb-2"><strong>Payment:</strong> <span class="text-blue-600">${data.salary}BDT /month</span></p>
        </div>
        </div



        <div class="mt-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Requirements</h3>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
        <li> ${data.requirement}  </li>
        <li>Proficiency in explaining complex concepts in a simple manner.</li>
        <li>Availability for all mentioned time slots and days.</li>
        </ul>
        </div>
            
            `;
        })
        .catch((error) => {
            showFailureAlert("Error fetching tuition details");
        });
};



document.addEventListener("DOMContentLoaded", getPostDetail);


document.addEventListener('DOMContentLoaded', () => {
    const applyButton = document.getElementById('applyButton');
    const applyModal = document.getElementById('applyModal');
    const closeModal = document.getElementById('closeModal');
    const applyForm = document.getElementById('applyForm');
    const tuition_id = getQueryParams("id");
    const user_id = window.localStorage.getItem("user_id");

    applyButton.addEventListener('click', () => {
        if (!user_id) {
            showFailureAlert('You must be logged in to apply for tuition.');
            return;
        }

        // Check application status
        fetch(`https://tution-media-platform-backend.onrender.com/api/application/?tutor_id=${user_id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to check application status.');
                }
                return response.json();
            })
            .then(applications => {
              

                const hasApplied = applications.some(application => 
                    application.tuition === parseInt(tuition_id) && application.status === 'applied'
                );

                if (hasApplied) {
                    showFailureAlert('You have already applied for this tuition.');
                } else {
                    applyModal.classList.remove('hidden');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showFailureAlert('An error occurred while checking your application status. Please try again.');
            });
    });

    closeModal.addEventListener('click', () => {
        applyModal.classList.add('hidden');
    });

    applyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('message').value;

        const data = {
            tutor: user_id,
            tuition: tuition_id,
            status: 'applied',
            message: message
        };

        fetch('https://tution-media-platform-backend.onrender.com/api/application/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit application.');
            }
            return response.json();
        })
        .then(result => {
            showSuccessAlert('Application submitted successfully!');
            applyModal.classList.add('hidden');
            applyForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            showFailureAlert('An error occurred while submitting your application. Please try again.');
        });
    });
});


