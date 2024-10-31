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
        .catch(error => {
            const container = document.getElementById('teacher-container');
            container.innerHTML = '';
            document.getElementById('no-tutors-message').classList.remove('d-none');
        });
});

function displayTeachers(teachers) {
    const container = document.getElementById('teacher-container');
    const noTutorsMessage = document.getElementById('no-tutors-message');
    container.innerHTML = '';

    if (teachers.length === 0) {
        noTutorsMessage.classList.remove('d-none');
        return;
    } else {
        noTutorsMessage.classList.add('d-none');
    }

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
            .catch(error => alert(error));
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
    const noTutorsMessage = document.getElementById('no-tutors-message');
    let hasVisibleCards = false;

    teacherCards.forEach(card => {
        const subject = card.getAttribute('data-subject');
        const rating = card.getAttribute('data-rating');

        const subjectMatches = subject.includes(subjectFilter);
        const ratingMatches = (!ratingFilter || rating >= ratingFilter);

        if (subjectMatches && ratingMatches) {
            card.classList.remove('d-none');
            hasVisibleCards = true;
        } else {
            card.classList.add('d-none');
        }
    });

    // Toggle "No Tutors Found" message based on filter result
    noTutorsMessage.classList.toggle('d-none', hasVisibleCards);
}
