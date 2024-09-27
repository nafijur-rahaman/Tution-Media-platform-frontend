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

const updatePriceLabel = (value) => {
    document.getElementById('priceValue').innerText = `$${value}`;
};

const getTuitions = () => {
    fetch("http://127.0.0.1:8000/api/tuition/list/")
        .then(res => {
            if (!res.ok) {
                throw new Error("Tuitions not found");
            }
            return res.json();
        })
        .then((tuitions) => {
            const parent = document.getElementById("tuitions-container");
            parent.innerHTML = "";

            const categoryFilter = document.getElementById("categoryFilter");
            const classFilter = document.getElementById("classFilter");
            const locationFilter = document.getElementById("locationFilter");
            const priceRange = document.getElementById("priceRange");
            const languageFilter = document.getElementById("languageFilter");

            const filterTuitions = () => {
                const filteredTuitions = tuitions.filter(tuition => {
                    const matchesCategory = categoryFilter.value === "" || tuition.subject_name === categoryFilter.value;
                    const matchesClass = classFilter.value === "" || tuition.tuition_class === classFilter.value;
                    const matchesLocation = locationFilter.value === "" || tuition.location.toLowerCase().includes(locationFilter.value.toLowerCase());
                    const matchesPrice = parseInt(tuition.salary) <= parseInt(priceRange.value);
                    const matchesLanguage = languageFilter.value === "" || tuition.medium === languageFilter.value;
                    return matchesCategory && matchesClass && matchesLocation && matchesPrice && matchesLanguage;
                });

                displayTuitions(filteredTuitions);
            };

            const displayTuitions = (filteredTuitions) => {
                parent.innerHTML = "";
                filteredTuitions.forEach((tuition, index) => {
                    const child = document.createElement('div');
                    child.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'overflow-hidden', 'transition-transform', 'transform', 'hover:scale-105', 'hover:shadow-xl');
                    child.innerHTML = `
                        <div class="p-6">
                            <h3 class="text-2xl font-semibold text-gray-900 mb-3">${tuition.title}</h3>
                            <p class="text-gray-700 mb-5">${tuition.description.slice(0, 50)}...</p>
                            <div class="space-y-2">
                                <p class="text-gray-700"><span class="font-semibold">Class:</span> ${tuition.tuition_class}</p>
                                <p class="text-gray-700"><span class="font-semibold">Location:</span> ${tuition.location}</p>
                                <p class="text-gray-700"><span class="font-semibold">Subject:</span> ${tuition.subject_name}</p>
                                <p class="text-gray-700"><span class="font-semibold">Salary:</span> ${tuition.salary} BDT / month</p>
                            </div>
                            <a href="tuitions_details.html?id=${tuition.id}" class="block mt-4 text-blue-600 font-medium hover:underline">View Details</a>
                        </div>
                    `;
                    parent.appendChild(child);
                });
            };

            categoryFilter.addEventListener("change", filterTuitions);
            classFilter.addEventListener("change", filterTuitions);
            locationFilter.addEventListener("input", filterTuitions);
            priceRange.addEventListener("input", filterTuitions);
            languageFilter.addEventListener("change", filterTuitions);

            displayTuitions(tuitions);
        })
        .catch(error => {
            showFailureAlert(error);
        });
};

document.addEventListener("DOMContentLoaded", function() {
    getTuitions();
});