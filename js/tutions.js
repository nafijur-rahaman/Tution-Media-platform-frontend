


const updatePriceLabel = (value) => {
    document.getElementById("priceValue").textContent = `BDT ${value}`;
};

// all tuitions
document.addEventListener('DOMContentLoaded', () => {
    let allTuitions = [];

    const fetchTuitions = () => {
        const apiUrl = 'https://tution-media-platform-backend.vercel.app/api/tuition/list/';
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch tuitions");
                }
                return response.json();
            })
            .then(data => {
                allTuitions = data;
                displayTuitions(allTuitions); // Initial display
                setupFilters(); // Set up filters after fetching data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById("tuitions-container").innerHTML = '<p>Failed to load data. Please try again later.</p>';
            });
    };

    const displayTuitions = (tuitions) => {
        const parent = document.getElementById("tuitions-container");
        parent.innerHTML = "";

        if (tuitions.length === 0) {
            parent.innerHTML = `<div class="message-container">
    <h1>No Tuitions Available</h1>
    <p>Please check back later for updates.</p>
</div>`;
            return;
        }

        tuitions.forEach(tuition => {
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

    const filterTuitionsByCategory = (category) => {
        const filteredData = category === 'All_Subject'
            ? allTuitions
            : allTuitions.filter(tuition => tuition.subject_name.includes(category));
        
        displayTuitions(filteredData);
    };

    const setupFilters = () => {
        const classFilter = document.getElementById("classFilter");
        const locationFilter = document.getElementById("locationFilter");
        const priceRange = document.getElementById("priceRange");

        const filterTuitions = () => {
            const filteredTuitions = allTuitions.filter(tuition => {
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

        document.querySelectorAll('#category-list p').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedCategory = link.getAttribute('value');
                filterTuitionsByCategory(selectedCategory);
            });
        });
    };

    fetchTuitions(); // Initial fetch on page load
});


// page functionality

$(document).ready(function()
{
	"use strict";



	var header = $('.header');
	var menuActive = false;
	var menu = $('.menu');
	var burger = $('.hamburger');

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initHeaderSearch();
	initColorbox();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 100)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length)
		{
			var menu = $('.menu');
			if($('.hamburger').length)
			{
				burger.on('click', function()
				{
					if(menuActive)
					{
						closeMenu();
					}
					else
					{
						openMenu();

						$(document).one('click', function cls(e)
						{
							if($(e.target).hasClass('menu_mm'))
							{
								$(document).one('click', cls);
							}
							else
							{
								closeMenu();
							}
						});
					}
				});
			}
		}
	}

	function openMenu()
	{
		menu.addClass('active');
		menuActive = true;
	}

	function closeMenu()
	{
		menu.removeClass('active');
		menuActive = false;
	}

	/* 

	4. Init Header Search

	*/

	function initHeaderSearch()
	{
		if($('.search_button').length)
		{
			$('.search_button').on('click', function()
			{
				if($('.header_search_container').length)
				{
					$('.header_search_container').toggleClass('active');
				}
			});
		}
	}

	/*

	5. Init Colorbox

	*/

	function initColorbox()
	{
		if($('.gallery_item').length)
		{
			$('.colorbox').colorbox(
			{
				rel:'colorbox',
				photo: true,
				maxWidth: '90%'
			});
		}
	}

});