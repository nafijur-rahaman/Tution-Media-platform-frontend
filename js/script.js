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




    


    const reviewsContainer = document.getElementById('reviewsContainer');


    async function fetchReviews() {
        try {
            const response = await fetch('https://tution-media-platform-backend.vercel.app/api/tuition/reviews/');
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