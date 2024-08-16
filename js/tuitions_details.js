
const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};


const getPostDetail = () => {
    const tuitionId = getQueryParams("id");

    fetch(`https://tuition-media-platform-backend.onrender.com/api/tution/list/${tuitionId}/`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);


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
            let gender="Male";
            if(data.preferred_tutor_gender &&data.student_gender ==='F'){
                gender="Female";
            }
            document.getElementById('tuition-class').textContent = `Tuition Class: ${data.tuition_class}`;
            document.getElementById('availability').textContent = `Availability: ${data.availability}`;
            document.getElementById('description').textContent = `Description: ${data.description}`;
            document.getElementById('medium').textContent = `Medium: ${data.medium}`;
            document.getElementById('student-gender').textContent = `Student Gender: ${gender}`;
            console.log(data.preferred_tutor_gender)
            document.getElementById('preferred-tutor-gender').textContent = `Preferred Tutor Gender: ${gender}`;
            document.getElementById('tutoring-time').textContent = `Tutoring Time: ${data.tutoring_time}`;
            document.getElementById('salary').textContent = `Salary: ${data.salary} BDT`;
        })
        .catch((error) => {
            console.error('Error fetching tuition details:', error);
        });
};


document.addEventListener('DOMContentLoaded', getPostDetail);





// modal for application



document.addEventListener('DOMContentLoaded', () => {

    const applyButton = document.getElementById('apply-button');
    const applyModal = document.getElementById('apply-modal');
    const closeModal = document.getElementById('close-modal');
    const applyForm = document.getElementById('apply-form');
    const tuitionDetails = document.getElementById('tuition-details');

    const tutorId = localStorage.getItem('user_id');
    const tuitionId = getQueryParams("id");

    applyButton.addEventListener('click', () => {
        document.getElementById('tutor-id').value = tutorId;
        document.getElementById('tuition-id').value = tuitionId;
        tuitionDetails.classList.add('hidden');  
        applyModal.classList.remove('hidden');  
    });

    closeModal.addEventListener('click', () => {
        applyModal.classList.add('hidden');  
        tuitionDetails.classList.remove('hidden');  
    });

    applyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(applyForm);
        const data = {
            tutor: formData.get('tutor_id'),
            tuition: formData.get('tuition_id'),
            status: 'applied',
            message: formData.get('message')
        };

        try {
            const response = await fetch('https://tuition-media-platform-backend.onrender.com/api/application/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const responseData = await response.json();
                alert('Application submitted successfully!');
                applyModal.classList.add('hidden');
                tuitionDetails.classList.remove('hidden');  
            } else {
                const errorData = await response.json();
                alert(`Failed to submit application: ${errorData.detail}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the application.');
        }
    });
});




//add reviews

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('submit-review-form');
    const tuitionId = getQueryParams("id");
    const tutorId = localStorage.getItem('user_id');
    

    form.addEventListener('submit', function (event) {
        event.preventDefault();


        const ratingSymbol = document.getElementById('rating').value;
        const comments = document.getElementById('comments').value;
        const reviewData = {
            rating: ratingSymbol,
            comments: comments,
            reviewer: tutorId,
            tuition: tuitionId
        };

        
        fetch(`https://tuition-media-platform-backend.onrender.com/api/application/?tuition=${tuitionId}&tutor=${tutorId}`)
        .then(res => res.json())
        .then(data => {
            // Check if the status is accepted
            if (data.length > 0 && data[0].status === 'accepted') {
                // If accepted, allow submitting the review
                return fetch('https://tuition-media-platform-backend.onrender.com/api/tution/reviews/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reviewData)
                });
            } else {
                // If not accepted, alert the user
                alert("You cannot submit a review as the application status is not accepted.");
                form.reset();
                throw new Error("Application not accepted");
            }
        })
        .then(response => response.json())
        .then(data => {
            alert("Review submitted successfully!");
            form.reset();
            location.reload()
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
            
    });
});


// get reviews

const loadReview = () => {
    const tuitionId = getQueryParams("id");

    fetch(`https://tuition-media-platform-backend.onrender.com/api/tution/reviews/?tuition=${tuitionId}`)
        .then((res) => res.json())
        .then((data) => displayReview(data));
};

const displayReview = (reviews) => {


    const parent = document.getElementById("review-container");

    reviews.forEach((review, index) => {
        const div = document.createElement("div");
        div.classList.add("carousel-item");
        if (index === 0) {
            div.classList.add("active");
        }



        // Review item HTML
        div.innerHTML = `
           


            <div class="p-4 bg-white rounded-lg shadow-md text-center max-w-md mx-auto">
            <p class="text-4xl text-gray-500 mb-4">${review.rating}</</p>
             <p class="text-3xl text-gray-700 mb-2">${review.comments}</p>
             <p class="text-2xl font-semibold text-gray-900">${review.reviewer_name}</p>
           </div>
            `;

        // Append review item to carousel
        parent.appendChild(div);
    });
};

loadReview();





