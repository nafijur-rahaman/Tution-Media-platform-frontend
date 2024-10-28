// function showSuccessAlert(message, title = "Success") {
//     const alertBox = document.getElementById("success-alert");
//     const alertTitle = document.getElementById("success-alert-title");
//     const alertMessage = document.getElementById("success-alert-message");
  
//     alertTitle.innerText = title;
//     alertMessage.innerText = message;
  
//     alertBox.classList.remove("hidden");
//     alertBox.classList.add("flex");
  
//     setTimeout(() => {
//       alertBox.classList.add("hidden");
//     }, 5000);
//   }
  
//   function showFailureAlert(message, title = "Failure") {
//     const alertBox = document.getElementById("failure-alert");
//     const alertTitle = document.getElementById("failure-alert-title");
//     const alertMessage = document.getElementById("failure-alert-message");
  
//     alertTitle.innerText = title;
//     alertMessage.innerText = message;
  
//     alertBox.classList.remove("hidden");
//     alertBox.classList.add("flex");
  
//     setTimeout(() => {
//       alertBox.classList.add("hidden");
//     }, 5000);
//   }
  
//   document.getElementById("close-success-alert").addEventListener("click", () => {
//     document.getElementById("success-alert").classList.add("hidden");
//   });
  
//   document.getElementById("close-failure-alert").addEventListener("click", () => {
//     document.getElementById("failure-alert").classList.add("hidden");
//   });
  
  document.addEventListener('DOMContentLoaded', function () {
    fetch('https://tution-media-platform-backend.vercel.app/api/tutor/list/')
    .then(res => {
        if (!res.ok) {
            throw new Error("Tutors not found");
        }
        return res.json();
    })
    .then(data => {
        const tutors = data;
        displayTeachers(tutors);
    })
    .catch(error => showFailureAlert(error));
});



function displayTeachers(teachers) {
    const container = document.getElementById('teacher-container');
    container.innerHTML = ''; 

    teachers.forEach(teacher => {
        fetch(`https://tution-media-platform-backend.vercel.app/api/tutor/tutor_reviews/?tutor=${teacher.id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Reviews not found");
            }
            return res.json();
        })
        .then(reviews => {
            const averageRating = calculateAverageRating(reviews);
            const teacherCard = `
                <div class="col-lg-3 teacher-card col-md-6 team_col" data-subject="${teacher.subjects.toLowerCase()}" data-rating="${averageRating}">
                    <div class="team_item">
                        <div class="team_image">
                            <img src="https://res.cloudinary.com/dwsp8rft8/${teacher.image}" alt="teacher_image">
                        </div>
                        <div class="team_body">
                            <div class="team_title"><a href="./teacher_details.html?id=${teacher.id}">${teacher.first_name} ${teacher.last_name}</a></div>
                            <div class="team_subtitle">${teacher.subjects}</div>
                            <p class="text-warning fs-5 rating mb-2">
                                ${'★'.repeat(averageRating)}${'☆'.repeat(5 - averageRating)}
                                <span class="small text-muted">(${averageRating} / 5)</span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += teacherCard;
        })
        .catch(error => showFailureAlert(error));
    });
}


function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => {
        
        return sum + review.rating.length; 
    }, 0);

    return (totalRating / reviews.length).toFixed(2); 
}

function filterTeachers() {
    const subjectFilter = document.getElementById('subject-filter').value.toLowerCase();
    const ratingFilter = document.getElementById('rating-filter').value;
    const teacherCards = document.querySelectorAll('.teacher-card');

    teacherCards.forEach(card => {
        const subject = card.getAttribute('data-subject');
        const rating = card.getAttribute('data-rating');

        const subjectMatches = subject.includes(subjectFilter);
        const ratingMatches = (!ratingFilter || rating >= ratingFilter);

        if (subjectMatches && ratingMatches) {
            card.classList.remove('d-none');
        } else {
            card.classList.add('d-none');
        }
    });
}


