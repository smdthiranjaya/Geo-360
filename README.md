## Student ID : COBSCCOMP4Y222P-033

### NodeJS Sever GitHub Link:
https://github.com/smdthiranjaya/geo-360-Server

### React WebApp GitHub Link:
https://github.com/smdthiranjaya/Geo-360

### Backend Server (Heroku) Hosted Link:
https://www.geo360live.tech

### Backend Server (Heroku) Swagger Link:
https://www.geo360live.tech/api-docs/#/

### React WebApp Custom Domains (Render) Hosted Link:
https://geo360live.tech/

### React WebApp (Render) Hosted Link:
https://geo-360-1.onrender.com/

### YouTube Video Link:
https://www.youtube.com/watch?v=HyUKIbl_MlI

# Geo-360


Geo-360 is a React-based application designed to provide users with interactive geographical data visualization. Utilizing React with Leaflet for mapping, and a set of testing libraries for robust development, Geo-360 aims to deliver a seamless user experience in exploring geospatial information.

![Screenshot 2567-04-27 at 17 15 52](https://github.com/smdthiranjaya/Geo-360/assets/37227365/ff3de2ce-1e39-40eb-b7cf-425e740eb201)

## INTRODUCTION

### Objective
To develop a single-page application (SPA) and RESTful Web API that provide real-time weather updates (temperature, humidity, air pressure, wind speed) for Sri Lanka, enhancing the current weather information system.
 
Scope
- RESTful API: To serve real-time weather data.
- SPA: Interactive map displaying live weather data.
- Data Simulation: Use generated data for system testing.
- Cloud Deployment: Ensure scalability and accessibility.
- Security & Testing: Implement security measures and conduct thorough testing.

## SYSTEM DESIGN AND ARCHITECTURE

### Business Requirements

Explores the need for a real-time weather mapping system to improve upon Sri Lanka’s Department of Meteorology’s existing three-hour update cycle, utilizing IoT for live data on temperature, humidity, and air pressure across the island.

### REST API and SPA Design Overview

Details the design principles of a RESTful API and a React-based Single Page Application (SPA) to meet the project's goals, including data flow and user interaction.

### System Architecture and Deployment

Describes the technical architecture encompassing the backend server on Heroku, database integration using Heroku’s PostgreSQL, frontend deployment on Azure, domain management, and use of GitHub Actions for CI/CD.

### UML Sequence Diagram for Weather Data Processing

<img width="894" alt="Screenshot 2567-04-27 at 17 56 36" src="https://github.com/smdthiranjaya/Geo-360/assets/37227365/94655c5d-4535-49ad-8151-36cd7172003d">

### Deployment Diagram
 
<img width="714" alt="Screenshot 2567-04-27 at 17 55 40" src="https://github.com/smdthiranjaya/Geo-360/assets/37227365/859b92c4-b1af-4f6a-ac52-6ebf4a39149b">

## IMPLEMENTATION 

### Weather REST API Details
Provides specifics on the REST API development with Node.js, including the use of Express, CORS, and other packages for backend functionality, along with Swagger for API documentation.
Live Map Single Page Application (SPA) Implementation
Outlines the creation of the React SPA using packages like Leaflet for mapping, detailing how the application consumes the API and presents data dynamically.

### Database and Cloud Integration
Discusses the use of Heroku's PostgreSQL for data storage and management, and Azure Web App Service for SPA hosting, ensuring a scalable cloud-based environment.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you start, ensure you have Node.js and npm installed on your machine. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Installation

First, clone the repository to your local machine:

    git clone https://github.com/smdthiranjaya/Geo-360.git
    cd geo-360

---

Install the necessary packages:

    npm install


---

### Running the App

To run the app in the development mode, use:

     npm start


---

Open http://localhost:3000 to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### Building for Production

To build the app for production to the build folder, run:

    npm run build


---

### Proxy Configuration

Requests are proxied to the backend server specified in the package.json under the proxy field. Ensure this is set to your backend service URL for development purposes.
