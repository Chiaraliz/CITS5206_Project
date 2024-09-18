# CITS5206 Project - Frontend Management System

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Running the Project](#running-the-project)
- [Technologies Used](#technologies-used)
- [Software Review](#software-review)
- [Documentation](#documentation)

## Introduction

This project is a frontend management system developed as part of the CITS5206 course. It includes core functionalities such as user management, dynamic dashboard, and a structured layout for various components using Ant Design (Antd), TailwindCSS, and React Router for client-side routing.

## Features

- **User Management**: Allows adding, editing, and deleting users.
- **Dashboard**: Displays user statistics and provides options for database export.
- **Search and Filter**: Provides search functionality to find members easily.
- **Responsive Design**: Built using TailwindCSS for responsive layout and styling.
- **Routing**: Implements client-side routing with React Router.

## Running the Project

To run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/cits5206_project.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd cits5206_project/frontend-management
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000` to see the application in action.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Ant Design (Antd)**: UI component library for React.
- **TailwindCSS**: Utility-first CSS framework for responsive design.
- **React Router**: Client-side routing for React applications.
- **Styled Components**: CSS-in-JS for scoped styling.
- **TypeScript**: Used for static type checking in parts of the project.
- **Vite**: Fast build tool for modern web applications.

## Software Review

### Functionality

The following key features have been developed and successfully tested:

- **Dashboard**: Displays key statistics of the users and provides data export functionality.
- **User Management**: Allows the admin to add, edit, and delete users. The Member Table is dynamically rendered with user data, supporting sorting and filtering.
- **Page Routing**: Includes routes for the Dashboard, User Management, and a 404 PageNotFound component.
- **Responsive Layout**: The entire layout is responsive, working well on both desktop and mobile devices.

### Testing

- All features have been tested locally by running the application using `npm run dev`.
- The layout and responsiveness have been tested in various browsers (Chrome, Firefox).
- Basic unit tests have been implemented for components using React's testing framework.

### In-Code Documentation

The project code includes extensive comments to explain the purpose of each component and function. Key areas with comments:

- **App.jsx**: Explains the routing logic and the integration of global styles.
- **MemberTable.jsx**: Describes how user data is dynamically loaded and displayed.
- **SearchBar.jsx**: Provides details on how the search functionality interacts with the user list.

## Documentation

Further documentation can be found in the following sections:

- **In-Code Comments**: Each function and component includes comments explaining its role and behavior.
- **User Manual**: [Link to the user manual](#) (if applicable).
- **Training Material**: Detailed training on how to use and extend the application can be found in the [Wiki](#) section.
