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

const updatePriceLabel = (value) => {
    document.getElementById('priceValue').innerText = `$${value}`;
};



document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('#category-list p');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedCategory = link.getAttribute('value');
            console.log(selectedCategory);
            fetchFilteredTuition(selectedCategory);
        });
    });

    const fetchFilteredTuition = (category) => {
        const apiUrl = 'https://tution-media-platform-backend.vercel.app/api/tuition/list/';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const filteredData = category === 'All_Subject'
                    ? data 
                    : data.filter(tuition => tuition.subject_name.includes(category));

                console.log(filteredData);
                displayTuitions(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                const parent = document.getElementById("tuitions-container");
                parent.innerHTML = '<p>Failed to load data. Please try again later.</p>';
            });
    };
});

const displayTuitions = (tuitions) => {
    const parent = document.getElementById("tuitions-container");
    parent.innerHTML = "";

    // Display message if no tuitions are found
    if (tuitions.length === 0) {
        parent.innerHTML = `<p class="text-center text-gray-700">No tuition found</p>`;
        return;
    }

    // Loop through and display each tuition
    tuitions.forEach((tuition) => {
        const child = document.createElement('div');
        child.classList.add('col-lg-6', 'course_col');
        child.innerHTML = `
            <div class="course same-height-card d-flex flex-column">
                <div class="course_body">
                    <h3 class="course_title"><a href="tuitions_details.html?id=${tuition.id}">${tuition.title}</a></h3>
                    <div class="course_text">
                        <p>${tuition.description.slice(0, 50)}...</p>
                    </div>
                    <span style="color: black;">Subject: ${tuition.subject_name.join(", ")}</span>
                </div>
                <div class="course_footer mt-auto">
                    <div class="course_footer_content d-flex flex-row align-items-center justify-content-start">
                        <div class="course_info">
                            <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                            <span>${tuition.tuition_class}</span>
                        </div>
                        <div class="course_info">
                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                            <span>${tuition.location}</span>
                        </div>
                        <div class="course_price ml-auto">${tuition.salary}BDT</div>
                    </div>
                </div>
            </div>
        `;
        parent.appendChild(child);
    });
};

const getTuitions = () => {
    fetch("https://tution-media-platform-backend.vercel.app/api/tuition/list/")
        .then(res => {
            if (!res.ok) {
                throw new Error("Tuitions not found");
            }
            return res.json();
        })
        .then((tuitions) => {
            const classFilter = document.getElementById("classFilter");
            const locationFilter = document.getElementById("locationFilter");
            const priceRange = document.getElementById("priceRange");

            const filterTuitions = () => {
                const filteredTuitions = tuitions.filter(tuition => {
                    const matchesClass = classFilter.value === "" || tuition.tuition_class === classFilter.value;
                    const matchesLocation = locationFilter.value === "" || tuition.location.toLowerCase().includes(locationFilter.value.toLowerCase());
                    const matchesPrice = parseInt(tuition.salary) <= parseInt(priceRange.value);

                    return matchesClass && matchesLocation && matchesPrice;
                });

                displayTuitions(filteredTuitions);
            };

            classFilter.addEventListener("change", filterTuitions);
            locationFilter.addEventListener("input", filterTuitions);
            priceRange.addEventListener("input", filterTuitions);

            displayTuitions(tuitions);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const parent = document.getElementById("tuitions-container");
            parent.innerHTML = '<p>Failed to load data. Please try again later.</p>';
        });
};

// Initial fetch on page load
getTuitions();


// document.addEventListener("DOMContentLoaded", function() {
//     getTuitions();
// });






