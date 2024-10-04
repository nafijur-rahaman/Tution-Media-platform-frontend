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

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const review = document.getElementById('review').value;

    fetch('https://tution-media-platform-backend.vercel.app/api/tuition/reviews/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, review: review }),
    })
    .then(response => {
        if (response.ok) {
            showSuccessAlert('Review submitted successfully!');
            // Clear the form
            document.getElementById('name').value = '';
            document.getElementById('review').value = '';
             fetchReviews() 

        } else {
            alert('Failed to submit review. Please try again.');
        }
    })
    .catch(error => {
        showFailureAlert("An error occurred while submitting your review.")
       
    });
});




    


function fetchReviews() {
    fetch('https://tution-media-platform-backend.vercel.app/api/tuition/reviews/')
        .then(response => response.json())
        .then(reviews => {
            const reviewsList = document.getElementById('reviewsList');

            reviews.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.className = 'bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 animate-fade-in w-80 flex-shrink-0';
                reviewDiv.innerHTML = `
                    <h3 class="text-xl font-semibold">${review.name}</h3>                   
                    <p class="text-gray-700">"${review.review}"</p>
                `;
                reviewsList.appendChild(reviewDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
        });
}

fetchReviews();


const faqButtons = document.querySelectorAll('#faq button');
faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const isVisible = content.classList.toggle('hidden');
        button.querySelector('svg').style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
    });
});


function animateCount(id, start, end, duration) {
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / (end - start)));

    const timer = setInterval(() => {
        current += increment;
        document.getElementById(id).innerText = current;

        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function fetchCounts() {
    fetch('https://tution-media-platform-backend.vercel.app/api/tuition/list/')
        .then(response => response.json())
        .then(tuitionData => {
            const totalTuition = tuitionData.length;

            fetch('https://tution-media-platform-backend.vercel.app/api/tutor/list/')
                .then(response => response.json())
                .then(tutorData => {
                    const totalTutors = tutorData.length;

                    fetch('https://tution-media-platform-backend.vercel.app/api/student/list/')
                        .then(response => response.json())
                        .then(studentData => {
                            const totalStudents = studentData.length;

                            animateCount('total-tutors', 0, totalTutors, 2000);
                            animateCount('total-students', 0, totalStudents, 2000);
                            animateCount('total-posts', 0, totalTuition, 2000);
                        });
                });
        });
}

document.addEventListener("DOMContentLoaded", fetchCounts);