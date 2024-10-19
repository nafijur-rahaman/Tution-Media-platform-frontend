# Tuition Media Platform - Frontend

Welcome to the Tuition Media Platform frontend! This project serves as the user interface for a platform designed to connect students with tutors, offering features for both students and tutors.



## Features

- **User Authentication**: Secure login and registration for students, tutors, and admins.
- **Role-Based Access**: Different dashboards and experiences for students, tutors, and administrators.
- **Profile Management**: Users can view and edit their profiles, including personal information and qualifications.
- **Tuition Posting**: Students can create and manage tuition posts to find suitable tutors.
- **Tutor Listings**: Comprehensive listings of available tutors, including filtering and searching options.
- **Rating and Reviews**: Users can rate and review tutors based on their experiences.
- **Responsive Design**: Mobile-friendly interface that works seamlessly across devices.

## Technologies Used

- **Frontend**: 
- **HTML5**: Markup language for structuring content.
- **CSS**: Styling the application for a polished look.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
- **JavaScript**: Programming language for interactive features and dynamic content.
  
- **Backend**:
  - [Django](https://tution-media-platform-backend.vercel.app/) (for backend development, linked through APIs)

## Installation

1. Clone the repository:

   ```bash
   https://github.com/nafijur-rahaman/Tution-Media-platform-frontend

  ```bash
Open the project in your editor (e.g., Visual Studio Code).
```
```bash
Now you can see the project use live server.
```
---
## API Endpoints
### Authentication

- **Student Login**  
  `POST` `https://tution-media-platform-backend.vercel.app/api/student/login/`
  
- **Tutor Login**  
  `POST` `https://tution-media-platform-backend.vercel.app/api/tutor/login/`
  
- **Admin Login**  
  `POST` `https://tution-media-platform-backend.vercel.app/api/admin_panel/login/`
  
- **Register Student**  
  `POST` `https://tution-media-platform-backend.vercel.app/api/student/register/`
  
- **Register Tutor**  
  `POST` `https://tution-media-platform-backend.vercel.app/api/tutor/register/`

---

### Student Endpoints

- **Get Profile**  
  `GET` `https://tution-media-platform-backend.vercel.app/api/student/list/user_id`
  
- **Create Tuition Post**  
  `POST` `https://tution-media-platform-backend.vercel.app/api/tuition/list/`
  
- **List Tuition Posts**  
  `GET` `https://tution-media-platform-backend.vercel.app/api/tuition/list/`
  
- **Change Password**  
  `PUT` `https://tution-media-platform-backend.vercel.app/api/student/change-password/`

---

## Tutor Endpoints

- **Get Profile**  
  `GET` `https://tution-media-platform-backend.vercel.app/api/tutor/list/user_id`
  
- **List of Tutors**  
  `GET` `https://tution-media-platform-backend.vercel.app/api/tutor/list/`
  
- **Update Profile**  
  `PUT` `https://tution-media-platform-backend.vercel.app/api/tutor/list/user_id`
  
- **Change Password**  
  `PUT` `https://tution-media-platform-backend.vercel.app/api/tutor/change-password/`

---

### Tuition API Endpoints

- **Create Tuition Post**  
  `POST` `https://tution-media-platform-backend.vercel.app/api/tuition/list/`  
  *Description*: Create a new tuition post.

- **List Tuition Posts**  
  `GET` `https://tution-media-platform-backend.vercel.app/api/tuition/list/`  
  *Description*: Retrieve a list of all tuition posts.

- **Edit Tuition Post**  
  `PUT` `https://tution-media-platform-backend.vercel.app/api/tuition/list/tuitionId/`  
  *Description*: Update an existing tuition post.

- **Delete Tuition Post**  
  `DELETE` `https://tution-media-platform-backend.vercel.app/api/tuition/list/tuitionId`  
  *Description*: Delete a specific tuition post.

---

### Notes

- Replace `user_id` and `tuitionId` in the URLs with the actual user or tuition post ID as required.
- Ensure you handle authentication tokens properly in your requests.




## Contact

For inquiries or support, please contact:
- **Project Developer**: Md. Nafijur Rahaman
- **Email**: tanjidnafis@gmail.com



