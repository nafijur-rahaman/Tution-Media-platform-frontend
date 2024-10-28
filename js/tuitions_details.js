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

    fetch(`https://tution-media-platform-backend.vercel.app/api/tuition/list/${tuitionId}/`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Campaign not found");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data)
            const heading = document.getElementById("tuition_heading");
            heading.innerHTML = `

                        <div class="course_title">${data.title}</div>
                          <div class="course_info d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
  
                              <!-- Course Info Item -->
                              <div class="course_info_item">
                                  <div class="course_info_title">Student:</div>
                                  <div class="course_info_text"><a href="#"> ${data.author_name}  </a></div>
                              </div>
  
                              <!-- Course Info Item -->
                              <div class="course_info_item">
                                  <div class="course_info_title">Posted On:</div>
                                      <div class="course_info_text"><p>${data.created}</p></div>
                              </div>
  
                              <!-- Course Info Item -->
                              <div class="course_info_item">
                                  <div class="course_info_title">Subject:</div>
                                  <div class="course_info_text"><a href="#">${data.subject_name}  </a></div>
                              </div>
  
                          </div>
            `;

            const des = document.getElementById("tuition_des");
            des.innerHTML=`
                    <div class="tab_panel active">
                                      <div class="tab_panel_title">${data.title}</div>
                                      <div class="tab_panel_content">
                                          <div class="tab_panel_text">
                                          ${data.description}
                                              </p>
                                          </div>
                                          <div class="tab_panel_section">
                                              <div class="tab_panel_subtitle">Requirements</div>
                                              <ul class="tab_panel_bullets">
                                                  <li>${data.requirement}</li>
                                             
                                              </ul>
                                          </div>
  
                                      </div>
                                  </div>
            
            
            `
            const info = document.getElementById("tuition_info");
            info.innerHTML=`
<div class="tab_panel tab_panel_2 p-4  text-white rounded">
    <div class="tab_panel_content">
        <h5 class="tab_panel_title mb-3">${data.title}</h5>
        <div class="tab_panel_text">
            <p>
                <strong>Subject:</strong> ${data.subject_name}
                <br>
                <strong>Grade Level:</strong> ${data.tuition_class}
                <br>
                <strong>Location:</strong> ${data.location}
            </p>
        </div>
    </div>
</div>

            
            `
            const other = document.getElementById("other");
            other.innerHTML=`
                <div class="tab_panel tab_panel_3 p-4 text-white rounded">
                                      <h5 class="tab_panel_title mb-3">Tuitions Timing</h5>
                                      <div class="tab_panel_content">
                                          <p>
                                              <strong>Time:</strong> ${data.tutoring_time}
                                          </p>
                                                  <h5 class="tab_panel_title mb-3">Tuitions Payment</h5>
                                          <p>
                                              <strong>Payment:</strong> ${data.salary} BDT / month
                                          </p>
                                      </div>
                                  </div>
            
            `
            const detail = document.getElementById("tuition_detail");
            detail.innerHTML=`
             <div class="sidebar_feature">
                                  <div class="course_price">${data.salary} BDT</div>
  
                                  <!-- Features -->
                                  <div class="feature_list">
  
                             
                                      <!-- Feature -->
                                      <div class="feature d-flex flex-row align-items-center justify-content-start">
                                          <div class="feature_title"><i class="fa fa-graduation-cap" aria-hidden="true"></i><span>Class:</span></div>
                                          <div class="feature_text ml-auto">${data.tuition_class}</div>
                                      </div>
                                      <div class="feature d-flex flex-row align-items-center justify-content-start">
                                          <div class="feature_title"><i class="fa fa-clock-o" aria-hidden="true"></i><span>Time:</span></div>
                                          <div class="feature_text ml-auto">${data.tutoring_time}</div>
                                      </div>
  
                                      <!-- Feature -->
                                      <div class="feature d-flex flex-row align-items-center justify-content-start">
                                          <div class="feature_title"><i class="fa fa-file-text-o" aria-hidden="true"></i><span>Subjects:</span></div>
                                          <div class="feature_text ml-auto">${data.subject_name}</div>
                                      </div>
  
                                      <!-- Feature -->
                                      <div class="feature d-flex flex-row align-items-center justify-content-start">
                                          <div class="feature_title"><i class="fa fa-map-marker" aria-hidden="true"></i><span>Locations:</span></div>
                                          <div class="feature_text ml-auto">${data.location}</div>
                                      </div>
  
  
  
                                  </div>
                              </div>
            `


        })
        .catch((error) => {
            showFailureAlert("Error fetching tuition details");
        });
};







document.addEventListener("DOMContentLoaded", getPostDetail);

document.addEventListener("DOMContentLoaded", function() {

    const apiUrl = "https://tution-media-platform-backend.vercel.app/api/tuition/list";

    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const latestTuitionsContainer = document.getElementById("latest-tuitions");
            latestTuitionsContainer.innerHTML = ''; 

       
            const latestTuitions = data.slice(0, 3);

        
            latestTuitions.forEach(tuition => {
                const tuitionDiv = document.createElement('div');
                tuitionDiv.className = 'latest d-flex flex-row align-items-start justify-content-start';

                tuitionDiv.innerHTML = `
                    <div class="latest_content">
                        <div class="latest_title"><a href="tuitions_details.html?id=${tuition.id}">${tuition.title}</a></div>
                        <div class="latest_price">${tuition.salary} BDT</div>
                    </div>
                `;

                latestTuitionsContainer.appendChild(tuitionDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});




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
        fetch(`https://tution-media-platform-backend.vercel.app/api/application/?tutor_id=${user_id}`)
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

        fetch('https://tution-media-platform-backend.vercel.app/api/application/', {
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


