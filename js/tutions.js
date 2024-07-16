console.log("test")
const getTuitions = () => {
   fetch("https://tution-media-platform.onrender.com/api/tution/list/")
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
           div.classList.add("col-sm-6");
 
           div.innerHTML = `
             <div class="card">
               <div class="card-body">
                 <h5 class="card-title">Title: ${tuition.title}</h5>
                 <p class="card-text">Salary: ${tuition.salary} BDT</p>
                 <p class="card-text">Medium: ${tuition.medium}</p>
                 <p class="card-text">Class: ${tuition.tuition_class}</p>
                 <p class="card-text">
                   Description: ${tuition.description.split(' ').slice(0, 10).join(' ')}
                   ${tuition.description.split(' ').length > 10 ? '...' : ''}
                 </p>
                 <a href="./tuition_detail.html?id=${tuition.id}" class="btn btn-primary">Details</a>
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
 