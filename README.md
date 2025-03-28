# Movie Search App

## Overview
The **Movie Search App** is a React Native application that allows users to search for movies using the OMDb API. Users can view detailed movie information and mark their favorite movies. The app is mobile-compatible and supports pagination for large search results. It is deployed on **Vercel** for easy access.

## Features
- Search movies by title and optional year filter.
- Display movie details including title, year, and genre.
- Save and view favorite movies using local storage.
- Pagination for navigating through search results.
- Smooth UI animations using Framer Motion.
- Fully responsive and mobile-friendly.

## Tech Stack
- **React Native** – Core framework for building the mobile application.
- **Axios** – Fetches data from the OMDb API.
- **Framer Motion** – Animations and smooth UI interactions.
- **React Icons** – Displays favorite icons (FaStar) for marking movies.
- **Local Storage** – Stores favorite movies persistently.
- **Vercel** – Used for deployment.

## Installation

### Prerequisites
Ensure you have **Node.js** and **npm** installed.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/shanmu97/MovieSearch.git
   ```
2. Navigate to the project folder:
   ```sh
   cd MovieSearch
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the application:
   ```sh
   npm run start
   ```
5. Open the app in your mobile emulator or a real device.

## API Used
- **OMDb API** ([www.omdbapi.com](http://www.omdbapi.com/))
- Fetches movie data based on search queries.
- Requires an API key (`fed4d426`).

## Approach
1. **State Management:** Used `useState` and `useRef` to manage search inputs and movie lists.
2. **Fetching Data:** Used `axios` to make API requests for both search results and detailed movie information.
3. **Local Storage:** Favorites are stored in `localStorage` and persist across sessions.
4. **Pagination:** Implemented next/previous buttons to navigate through search results.
5. **UI/UX Enhancements:** Used `Framer Motion` for animations and `React Icons` for better visuals.
6. **Mobile Compatibility:** Designed using responsive styles and tested on mobile devices.

## Deployment
- The application is deployed on **Vercel**.
- Click [here](#) to view the deployed version.

## Evaluator Notes
- The app is optimized for mobile devices.
- Uses best practices for API calls and state management.
- Modular structure for reusability and maintainability.
- Features like local storage, animations, and pagination enhance the user experience.

## Future Enhancements
- Add user authentication for personalized favorite lists.
- Implement a dark mode toggle.
- Improve search filtering with additional parameters like ratings and genre.

---
**Developed by Shanmukha Reddy Vasa**
