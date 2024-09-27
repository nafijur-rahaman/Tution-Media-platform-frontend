
    function submitContactForm(event) {
        event.preventDefault(); 

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        fetch('http://127.0.0.1:8000/api/contact/list/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
           
                alert('Message sent successfully!');
                document.getElementById('contactForm').reset(); 
           
        })
        .catch(error => {
            console.error('Error during form submission:', error);
            alert('There was an error submitting the form. Please try again later.');
        });
    }

    document.getElementById('contactForm').addEventListener('submit', submitContactForm);
