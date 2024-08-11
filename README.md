# Assignment Submission Portal Readme

## For Admin:

### Overview:
The Assignment Submission Portal provides functionalities for admins, trainers, and students to manage classes, assignments, and profiles.

#### Admin Features:
1. ##### Trainer Management:
   - Add, edit, and remove trainer details.
   - View list of trainers.

2. ##### Student Management:
   - Add, edit, and remove student details.
   - View enrolled classes and assigned trainers for each student.

3. ##### Profile Management:
   - Update admin profile details.

## For Trainer:

#### Overview:
Trainers can manage classes, assignments, and student submissions within the portal.

#### Trainer Features:
1. ##### Login:
   - Access the portal using admin-provided email and password.

2. ##### Class Management:
   - Create multiple classes.
   - View and manage classes, including adding and removing students.

3. ##### Assignment Management:
   - Create assignments with due dates and total marks.
   - Edit or delete assignments as needed.

4. ##### Submission Management:
   - View submissions for each assignment.
   - Provide grades/marks to students.

5. ##### Student Profile:
   - View overall profiles of students.

6. ##### Profile Management:
   - Update trainer profile details.

## For Student:

#### Overview:
Students can manage their assignments, classes, and profiles through the portal.

#### Student Features:
1. ##### Account Creation and Login:
   - signup and login an account or login using admin-provided email and password.

2. ##### Class Enrollment:
   - Join classes using trainer-provided codes.
   - Enroll in multiple classes.

3. ##### Assignment Management:
   - Submit assignments.
   - View classmates within each class.

4. ##### Report and Grades:
   - View assignment reports, including submissions, pending assignments, and expired deadlines.
   - View grades provided by trainers.

5. ##### Profile Management:
   - Update personal details in the profile section.

#### Installation

1. ##### Clone the Repository:
   bash
   git clone <repository_url>
   cd assignment-submission-portal
   

2. ##### Install Dependencies:
   bash
   npm install
   

3. ##### Set up Environment Variables:
   - Create a .env file based on .env.example and configure database connection details, JWT secret, etc.

4. ##### Run the Application:
   bash
   npm start
   

5. ##### Access the Portal:
   - Open your browser and go to http://localhost:5173.

#### Technologies Used

- ##### Frontend: HTML, CSS, JavaScript
- ##### Backend: Node.js, Express.js
- ##### Database: MongoDB, Google Storage
- ##### Authentication: JWT (JSON Web Tokens) for secure authentication
