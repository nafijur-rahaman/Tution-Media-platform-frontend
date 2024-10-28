

// Tuition list
document.addEventListener("DOMContentLoaded", function () {
  const coursesRow = document.getElementById('coursesRow');
  const apiUrl = 'https://tution-media-platform-backend.vercel.app/api/tuition/list/';

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const tuitions = data.slice(0, 3);
      tuitions.forEach(function (tuition) {
        const courseHtml = `
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="course h-100 d-flex flex-column">
              <div class="course_body flex-grow-1">
                <h3 class="course_title">
                  <a href="course.html">${tuition.title}</a>
                </h3>
                <div class="course_teacher">Posted by: ${tuition.author_name}</div>
                <div class="course_text">
                  <p><strong>Class:</strong> ${tuition.tuition_class}</p>
                  <p><strong>Location:</strong> ${tuition.location}</p>
                  <p><strong>Subjects:</strong> ${tuition.subject_name}</p>
                  <p><strong>Salary:</strong> ${tuition.salary} BDT / month</p>
                </div>
              </div>
            </div>
          </div>
        `;
        coursesRow.innerHTML += courseHtml;
      });
    })
    .catch(function (error) {
      console.error('Error fetching tuition data:', error);
    });
});

  
//counter

    fetch("https://tution-media-platform-backend.vercel.app/api/tutor/list/")
      .then(function (response) {
        return response.json();
      })
      .then(function (tutors) {
        document.getElementById("tutorsCount").innerText = tutors.length;
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  
    fetch("https://tution-media-platform-backend.vercel.app/api/student/list/")
      .then(function (response) {
        return response.json();
      })
      .then(function (students) {

        document.getElementById("studentsCount").innerText = students.length;
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  
    fetch("https://tution-media-platform-backend.vercel.app/api/tuition/list/")
      .then(function (response) {
        return response.json();
      })
      .then(function (tuitions) {
        document.getElementById("tuitionsCount").innerText = tuitions.length;
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  
//tutors

    fetch("https://tution-media-platform-backend.vercel.app/api/tutor/list/")
      .then(function (response) {
        return response.json();
      })
      .then(function (tutors) {
      
        const tutorsToDisplay = tutors.slice(0, 4);
        const teamRow = document.getElementById("teamRow");
        teamRow.innerHTML = '';
        tutorsToDisplay.forEach(function (tutor) {
          const tutorItem = document.createElement("div");
          tutorItem.classList.add("col-lg-3", "col-md-6", "team_col");
          tutorItem.innerHTML = `
            <div class="team_item">
              <div class="team_image">
                <img src="https://res.cloudinary.com/dwsp8rft8/${tutor.image || 'images/default_tutor.jpg'}" alt="${tutor.first_name || 'Tutor'}" />
              </div>
              <div class="team_body">
                <div class="team_title"><a href="teacher_details.html?id=${tutor.id}">${tutor.first_name} ${tutor.last_name}</a></div>
                <div class="team_subtitle">${tutor.subjects || 'Subject'}</div>
                <div class="social_list"></div>
              </div>
            </div>
          `;
          teamRow.appendChild(tutorItem);
        });
      })
      .catch(function (error) {
        console.error("Error fetching tutors:", error);
      });

  