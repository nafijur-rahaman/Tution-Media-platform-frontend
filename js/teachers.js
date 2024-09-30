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
    console.log(teachers)
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
                <div class="teacher-card bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:-translate-y-2 hover:shadow-xl w-80 mx-auto">
                    <div class="flex justify-center">
                        <img src="${teacher.image}" alt="Teacher Image" class="w-32 h-32 object-cover rounded-full transition duration-300 ease-in-out transform hover:scale-105 border-4 border-blue-300">
                    </div>
                    <div class="p-6 bg-gray-50">
                        <h2 class="text-2xl text-center font-semibold text-gray-900 mb-2 hover:text-blue-600 transition duration-200">${teacher.first_name} ${teacher.last_name}</h2>
                        <p class="text-gray-700 text-xl subject mb-4"><span class="font-bold">Subject:</span> ${teacher.subjects}</p>
                        <p class="text-gray-700 text-xl mb-4"><span class="font-bold">Experience:</span> ${teacher.tutoring_experience} years</p>
                        <p class="text-gray-700 text-xl mb-4"><span class="font-bold">Location:</span> ${teacher.location}</p>
                        <p class="text-yellow-500 text-xl rating mb-4" data-rating="${averageRating}">
                            ${'★'.repeat(averageRating)}${'☆'.repeat(5 - averageRating)}
                            <span class="text-sm text-gray-500">(${averageRating} / 5)</span>
                        </p>
                        <a href="./teacher_details.html?id=${teacher.id}" class="bg-blue-500 text-xl font-semibold text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out inline-block text-center w-full">
    View Details
</a>

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
        const subject = card.querySelector('.subject').textContent.toLowerCase();
        const rating = card.querySelector('.rating').dataset.rating;

   
        const subjectMatches = subject.includes(subjectFilter);
        const ratingMatches = (!ratingFilter || rating >= ratingFilter);

        if (subjectMatches && ratingMatches) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}


