
const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};


const getPostDetail = () => {
    const tuitionId = getQueryParams("id");

    fetch(`https://tution-media-platform.onrender.com/api/tution/list/${tuitionId}/`)
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
                        return 'Mathematics';
        
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
      })
      .catch((error) => {
        console.error('Error fetching tuition details:', error); 
      });
};


document.addEventListener('DOMContentLoaded', getPostDetail);





// modal



    document.addEventListener('DOMContentLoaded', () => {
        
        const applyButton = document.getElementById('apply-button');
        const applyModal = document.getElementById('apply-modal');
        const closeModal = document.getElementById('close-modal');
        const applyForm = document.getElementById('apply-form');


        const tutorId = localStorage.getItem('user_id');
        const tuitionId = getQueryParams("id");

        
     

        applyButton.addEventListener('click', () => {
            
            document.getElementById('tutor-id').value = tutorId;
            document.getElementById('tuition-id').value = tuitionId;
            
            console.log(tutorId)
            console.log(tuitionId)
           
            applyModal.classList.remove('hidden');
        });
        
        closeModal.addEventListener('click', () => {
            applyModal.classList.add('hidden');
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
                const response = await fetch('https://tution-media-platform.onrender.com/api/application/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                console.log(data)
                if (response.ok) {
                    alert('Application submitted successfully!');
                    applyModal.classList.add('hidden');
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


    document.addEventListener('DOMContentLoaded', function() {
        const reviewForm = document.getElementById('submit-review-form');
    
        reviewForm.addEventListener('submit', function(event) {
            event.preventDefault();
    
            // Check user status in localStorage
            const userStatus = localStorage.getItem('status');
           
            // Check if user status allows commenting
            if (userStatus === 'applied') {
                alert('You cannot comment until your application is accepted.');
                return;
            } else if (userStatus === 'accepted') {
                // Continue with form submission
                submitReview();
            } else {
                console.log(userStatus)
                alert('User status not recognized. Please log in again.');
                // Handle other cases as needed (e.g., redirect to login page)
            }
        });
    
        function submitReview() {
            const tutorId = localStorage.getItem('user_id');

            const rating = document.getElementById('rating').value;
            const comments = document.getElementById('comments').value;
          
            
            const formData = {
                rating: rating,
                comments: comments,
                reviewer:tutorId
            };
    

            fetch('https://tution-media-platform.onrender.com/api/tution/reviews/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                 
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log('Review submitted successfully:', data);
                alert('Review submitted successfully!');
                location.reload(); // Refresh the page or update UI as needed
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while submitting your review. Please try again.');
            });
        }
    });
    