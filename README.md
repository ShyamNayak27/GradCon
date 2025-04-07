# GradConnect - All-in-One Campus Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

GradConnect is a web application designed to be an integrated platform for university students, centralizing campus life essentials like event management, club activities, resource access, lost & found, academic tracking, and more. It aims to simplify the student experience by providing a single source of truth for campus-related information and interactions.

![image](https://github.com/user-attachments/assets/7a29c7ee-ae0f-4175-9137-82a023a2f408)


## Table of Contents

*   [Description](#description)
*   [Features](#features)
*   [Technology Stack](#technology-stack)
*   [Prerequisites](#prerequisites)
*   [Installation](#installation)
*   [Configuration](#configuration)
*   [Running the Application](#running-the-application)
*   [File Structure](#file-structure)
*   [Contributing](#contributing)
*   [License](#license)
*   [Contact](#contact)

## Description

Navigating university life involves juggling academics, extracurriculars, social events, and administrative tasks. GradConnect aims to consolidate these aspects into a seamless digital experience. From checking your academic progress and finding lost items to joining clubs and staying updated on campus events, GradConnect provides the tools students need to stay organized and engaged.

The platform features distinct sections for different functionalities, accessible after user authentication (including Google Sign-In). The user interface is designed to be intuitive and visually appealing, with responsive layouts for different screen sizes.

## Features

Based on the provided files and inferred functionality:

*   **Homepage (`index.html`, `homepage.css`):** Landing page introducing the platform and its core value proposition.
*   **User Authentication (`signup.html`, `signup.css`):**
    *   Sign up/Login flow.
    *   Option for email-based sign-up (input field present).
    *   Google Sign-In integration (`/auth/google` route implied).
    *   Basic consent/privacy policy notice.
*   **User Profile Setup (`signup_info.html`, `signup_info.css`):**
    *   Form to collect detailed student information after initial signup (Name, Email, Batch, Year, Course, Enrollment No., College Email, Group No., Hostel Status).
    *   Submits data to a backend endpoint (`/api/save-user-info` implied).
*   **Student Dashboard/Profile (`titlepage.html`, `titlepage.css`):**
    *   Displays comprehensive student profile information.
    *   Profile Header: Avatar, Name, Email, Student ID.
    *   Key Stats: Year, Semester, CGPA (placeholders shown).
    *   Academic Information: Major, Specialization, Advisor, Enrollment Date.
    *   Degree Progress: Visual progress bar and credit breakdown.
    *   Campus Residence Information.
    *   List of joined Clubs/Activities.
*   **(Inferred from CSS) Potential Future/Backend Features:**
    *   Lost & Found section with item listing and status (lost/found).
    *   Laundry Tracker showing machine availability and time remaining.
    *   Dedicated Clubs & Activities section with club cards and join functionality.
    *   Events Calendar/List with date, location, description, and RSVP/details action.
    *   Different user roles (Student, Admin, Viewer - mentioned on homepage).

## Technology Stack

**Frontend:**

*   HTML5
*   CSS3 (with custom properties, Grid, Flexbox)
*   Vanilla JavaScript (for form submission in `signup_info.html`)
*   Google Fonts (Inter)

**Backend (Assumed - Please Verify/Update):**

*   **Runtime:** Node.js (Common choice for such applications)
*   **Framework:** Express.js (Likely framework for handling routes and middleware)
*   **Database:** PostgreSQL (To store user data, posts, events, etc.)
*   **Authentication:** Passport.js (Often used with Node.js for authentication strategies, including Google OAuth 2.0)
*   **Session Management:** express-session / JWT (JSON Web Tokens)
*   **Database ORM/Client:** Sequelize / pg (Common choices for Node.js with PostgreSQL)

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Git](https://git-scm.com/)
*   [Node.js](https://nodejs.org/) (which includes npm or yarn)
*   [PostgreSQL](https://www.postgresql.org/) server running locally or accessible remotely.
*   Google Cloud Platform credentials (Client ID, Client Secret) for Google Sign-In.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/[your-username]/gradconnect.git
    cd gradconnect
    ```

2.  **Install backend dependencies (assuming Node.js):**
    ```bash
    npm install
    # or
    # yarn install
    ```
    *(Note: There might not be frontend-specific dependencies if it's pure HTML/CSS served by the backend).*

## Configuration

The backend application will likely require environment variables for configuration.

1.  **Create a `.env` file** in the root directory of the project.
2.  **Add the following environment variables** (adjust names and values based on your actual backend implementation and PostgreSQL setup):

    ```dotenv
    # Application Port
    PORT=3000

    # PostgreSQL Database Connection
    DB_USER=your_postgres_user
    DB_HOST=localhost
    DB_DATABASE=gradconnect_db
    DB_PASSWORD=your_postgres_password
    DB_PORT=5432

    # Session Secret (A long, random string)
    SESSION_SECRET=your_very_secret_session_key

    # Google OAuth Credentials
    GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback # Or your production URL

    # Add any other necessary variables (API keys, etc.)
    ```

3.  **Ensure your PostgreSQL server is running** and you have created the specified database (`gradconnect_db` in the example). You might also need to run database migrations if your project uses them.

## Running the Application

1.  **Start the development server (assuming Node.js with nodemon):**
    ```bash
    npm run dev
    ```
    *or, for a simple start script:*
    ```bash
    npm start
    ```
    *(Make sure your `package.json` scripts correctly start your Node.js/Express server)*

2.  **Open your web browser** and navigate to `http://localhost:3000` (or the port specified in your `.env` file).

## File Structure

<details> <summary><strong>📁 File Structure</strong></summary>
gradconnect/
├── public/                     
│   ├── images/                 
│   ├── homepage.css
│   ├── index.html
│   ├── signup_draft.css
│   ├── signup_info.css
│   ├── signup_info.html
│   ├── signup.css
│   ├── signup.html
│   ├── titlepage.css
│   └── titlepage.html
├── routes/                     
│   └── auth.js
├── .env                       
├── .gitignore                  
├── db.js                      
├── server.js                   
├── package.json                
├── package-lock.json           
├── README.md                  
└── LICENSE                    
</details>


## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

Please ensure your code adheres to existing style conventions and includes tests where applicable.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. 

## Contact

Shyam Narayan Nayak - [shtrillion@gmail.com]

Project Link: [https://github.com/ShyamNayak27/gradconnect](https://github.com/ShyamNayak27/GradConnect)

Use code with caution.
