
const getTuitions = () => {
   fetch("https://tuition-media-platform-backend.onrender.com/api/tution/list/")
     .then((res) => res.json())
     .then((tuitions) => {
       const allTutions = document.getElementById("all-tuitions");
       const classFilter = document.getElementById("classFilter");
 
       function filterTuitions(tuitions, filter) {
         return tuitions.filter((tuition) => {
           if (!filter) return true; 
           return tuition.tuition_class === filter;
         });
       }
 
       function renderTuitions(filteredTuitions) {
         allTutions.innerHTML = '';
 
         filteredTuitions.forEach((tuition) => {
          const div = document.createElement("div");
          div.classList.add("col-md-4", "mb-6");

          div.innerHTML = `
            <div class="bg-gradient-to-r from-stone-500 to-stone-700 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-blue-400 hover:bg-gradient-to-r from-blue-500 to-purple-700 h-full border border-transparent relative">
              <div class="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 class="text-4xl font-semibold mb-4 text-white hover:scale-99">${tuition.title}</h3>
                  <p class="text-2xl text-white mb-2">Medium: ${tuition.medium}</p>
                  <p class="text-2xl text-white mb-2">Class: ${tuition.tuition_class}</p>
                  <p class="text-2xl text-white mb-2">Salary: ${tuition.salary} BDT</p>
                  <p class="text-2xl text-white mb-4">
                    Description: ${tuition.description.split(' ').slice(0, 10).join(' ')}
                    ${tuition.description.split(' ').length > 10 ? '...' : ''}
                  </p>
                </div>
                 <div class="flex justify-center mt-auto">
                                    <a href="./admin_tuition_detail.html?id=${tuition.id}" class="inline-block bg-blue-500 text-white text-2xl px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ease-in-out">Details</a>
                                </div>
                <div class="absolute top-0 right-0 p-4 text-white text-3xl opacity-75 transition-opacity duration-300 ease-in-out hover:opacity-100">
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>
          `;
           allTutions.appendChild(div);
         });
       }

       renderTuitions(tuitions);
 
       classFilter.addEventListener('change', () => {
         const selectedClass = classFilter.value;
         const filteredTuitions = filterTuitions(tuitions, selectedClass);
         renderTuitions(filteredTuitions);
       });
     })
     .catch((error) => {
       console.error('Error fetching tuitions:', error);
     });
 };
 
 getTuitions();
 