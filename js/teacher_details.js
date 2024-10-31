
const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const getTutorDetails = () => {
    const tutor_id = getQueryParams("id");
    // console.log(tutor_id);
    fetch(`https://tution-media-platform-backend.vercel.app/api/tutor/list/${tutor_id}/`)
        .then(res => res.json())
        .then(data => {
                // console.log(data)
            const div = document.getElementById('tutor_details')
            div.innerHTML = `

      <div class="flex items-center p-6 border-b">
        <img src="https://res.cloudinary.com/dwsp8rft8/${data.image}" alt="Teacher Image" class="w-24 h-24 rounded-full mr-6">
        <div>
            <h1 class="text-2xl font-semibold">${data.first_name}${data.last_name} </h1>
            <p class="text-gray-600">Subject: ${data.subjects}</p>
            <p class="text-gray-600">Location: ${data.location} </p>
        </div>
    </div>

    <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">Profile Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-semibold">Contact Information</h3>
                <span style="color:black;"> <span class="font-semibold"> Email: </span>  ${data.email} </span> </br>
                <span style="color:black;"> <span class="font-semibold"> Phone: </span> ${data.phone_number} </span>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-semibold">Experience</h3>
                <span style="color:black;"> <span class="font-semibold">Years of Experience:</span> ${data.tutoring_experience}</span> 
                </br>
                <span style="color:black;"><span class="font-semibold"> Medium of Instruction: </span> ${data.medium_of_instruction}</span>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-semibold">Education</h3>
                <p>${data.education}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-semibold">Salary Expectation</h3>
                <p>${data.salary} BDT</p>
            </div>
        </div>
        <div class="mt-6">
            <h2 class="text-xl font-semibold mb-4">About Me</h2>
            <p>${data.bio}</p>
        </div>
    </div>
  
  `
        })

}


getTutorDetails()






const StudentToken = localStorage.getItem('student_token');
if (StudentToken) {
    document.getElementById("review-form").classList.remove("hidden");
}


function submitReview(event) {
    event.preventDefault();

    const reviewerName = document.getElementById('reviewer_name').value;
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    const reviewer = window.localStorage.getItem("user_id");
    const tutor = getQueryParams("id");

    const reviewData = {
        reviewer_name: reviewerName,
        review: review,
        rating: rating,
        reviewer: reviewer,
        tutor: tutor,
    };

    fetch('https://tution-media-platform-backend.vercel.app/api/tutor/tutor_reviews/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('student_token')}`
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            alert('Review submitted successfully!');
            document.getElementById('reviewForm').reset();
            fetchReviews()
        } else {
            alert('Failed to submit review. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting your review.');
    });
}



function fetchReviews() {
    const user_id=window.localStorage.getItem("user_id")
    fetch(`https://tution-media-platform-backend.vercel.app/api/tutor/tutor_reviews/?${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const reviewsList = document.getElementById('reviews-list');
        reviewsList.innerHTML = '';

        if (data.length > 0) {
            data.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.className = 'bg-gray-100 p-4 rounded-lg shadow-sm w-64 flex-shrink-0';

                reviewElement.innerHTML = `
                    <div class="flex items-center mb-2">
                        <span class="font-bold text-lg text-gray-700">${review.reviewer_name}</span>
                        <span class="ml-4 text-yellow-500">${review.rating}</span>
                    </div>
                    <p class="text-gray-600">${review.review}</p>
                    <small class="text-gray-500">Reviewed on ${new Date(review.created).toLocaleDateString()}</small>
                `;

                reviewsList.appendChild(reviewElement);
            });
        } else {
            reviewsList.innerHTML = '<p class="text-gray-600">No reviews available.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching reviews.');
    });
}

document.addEventListener('DOMContentLoaded', fetchReviews);