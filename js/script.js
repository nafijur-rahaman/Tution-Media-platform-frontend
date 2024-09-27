function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


const button = document.getElementById('getStartedBtn');

let isBlinking = false;

function startBlinking() {
    isBlinking = true;
    button.style.backgroundColor = '#98fb98'; 
    setInterval(() => {
        button.style.backgroundColor = button.style.backgroundColor === 'rgb(245, 245, 245)' ? '#98fb98' : '#f5f5f5'; 
    }, 1000); 
}

function stopBlinking() {
    isBlinking = false;
    button.style.backgroundColor = '#98fb98'; 
}

button.addEventListener('mouseover', stopBlinking);
button.addEventListener('mouseout', () => {
    if (!isBlinking) {
        startBlinking();
    }
});

startBlinking();

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const review = document.getElementById('review').value;

    fetch('http://127.0.0.1:8000/api/tuition/reviews/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, review: review }),
    })
    .then(response => {
        if (response.ok) {
            alert('Review submitted successfully!');
            // Clear the form
            document.getElementById('name').value = '';
            document.getElementById('review').value = '';
        } else {
            alert('Failed to submit review. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting your review.');
    });
});




    


    const reviewsContainer = document.getElementById('reviewsContainer');


    async function fetchReviews() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/tuition/reviews/');
            const reviews = await response.json();

        
            reviews.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.className = 'review';
                reviewDiv.innerHTML = `<h3 class="font-bold">${review.name}</h3><p>"${review.review}"</p>`;
                reviewsContainer.appendChild(reviewDiv);
            });
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }


    let scrollAmount = 0;
    function scrollReviews() {
        scrollAmount += 1;
        if (scrollAmount >= reviewsContainer.scrollWidth) {
            scrollAmount = 0;
        }
        reviewsContainer.scrollLeft = scrollAmount;
    }

    fetchReviews();
    setInterval(scrollReviews, 20);