const updatePriceLabel = (value) => {
    document.getElementById('priceValue').innerText = `$${value}`;
};



const apiUrl = 'https://tution-media-platform-backend.vercel.app/api/tuition/list/';
    
document.getElementById('searchButton').addEventListener('click', () => {
    const locationFilter = document.getElementById('locationFilter').value.toLowerCase();
    const classFilter = document.getElementById('classFilter').value;
    loadCourses(locationFilter, classFilter);
});

function loadCourses(location = '', className = '') {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const filteredCourses = data.filter(course => {
                const matchesLocation = course.location.toLowerCase().includes(location);
                const matchesClass = className ? course.class_name === className : true;
                return matchesLocation && matchesClass;
            });
            displayCourses(filteredCourses);
        })
        .catch(error => console.error('Error fetching courses:', error));
}

function displayCourses(courses) {
    const coursesRow = document.getElementById('coursesRow');
    coursesRow.innerHTML = ''; // Clear previous results
    if (courses.length === 0) {
        coursesRow.innerHTML = '<p>No courses found.</p>';
        return;
    }

    courses.forEach(course => {
        const courseCol = document.createElement('div');
        courseCol.className = 'col-lg-6 course_col';
        courseCol.innerHTML = `
            <div class="course">
                <div class="course_body">
                    <h3 class="course_title"><a href="course.html">${course.title}</a></h3>
                    <div class="course_text">
                        <p>${course.description}</p>
                    </div>
                </div>
                <div class="course_footer">
                    <div class="course_footer_content d-flex flex-row align-items-center justify-content-start">
                        <div class="course_info">
                            <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                            <span>${course.class_name}</span>
                        </div>
                        <div class="course_info">
                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                            <span>${course.location}</span>
                        </div>
                        <div class="course_price ml-auto">${course.price} BDT</div>
                    </div>
                </div>
            </div>
        `;
        coursesRow.appendChild(courseCol);
    });
}

// Load all courses on initial page load
loadCourses();
