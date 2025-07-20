Search Results App (Google srapper app)
Overview
This is a Node.js web application built with Express.js that allows users to perform searches using the Google Custom Search API. Users can input a search query via a web form, view results displayed in a styled HTML page, and download the results as a JSON file. The application features a modern, dark-themed UI with responsive design and error handling for invalid inputs or API issues.
Features

Search Functionality: Performs searches using the Google Custom Search API based on user-provided queries.
Web Interface: Provides a user-friendly form for entering search queries, with results displayed in a clean, styled list.
Download Results: Allows users to download search results as a JSON file (vysledky.json).
Responsive Design: Dark-themed UI with hover effects, shadows, and smooth transitions for a modern look.
Error Handling: Validates user input and handles API errors with appropriate status codes and messages.
Static File Serving: Serves static assets (e.g., CSS, JavaScript) from a public directory.

Prerequisites

Node.js: Version 14.x or higher.
Dependencies:
express: For building the web server.
axios: For making HTTP requests to the Google Custom Search API.


Google Custom Search API:
A valid API key (API_KEY) from Google Cloud Console.
A Custom Search Engine ID (CX) configured for your search engine.


Internet Connection: Required for API requests.

Installation

Clone or Download the Repository:
Clone the repository or download the project files.

git clone <repository-url>
cd <repository-directory>


Install Dependencies:
Run the following command to install required Node.js packages:

npm install express axios


Set Up API Credentials:
Replace the API_KEY and CX constants in the code with your Google Custom Search API key and Custom Search Engine ID:

const API_KEY = 'your-api-key-here';
const CX = 'your-cx-id-here';


Obtain these from the Google Cloud Console by enabling the Custom Search API and creating a search engine.


Create a Public Directory (if needed):
Ensure a public directory exists in the project root for serving static files (e.g., CSS, images). This is optional if no additional static assets are used.

mkdir public



Usage

Run the Application:
Start the server using:

node index.js


The server will run on port 3000 by default (or a port specified in the PORT environment variable).


Access the Web Interface:
Open a browser and navigate to http://localhost:3000/.
You will see a search form with a text input and a "Hledat" (Search) button.


Perform a Search:
Enter a search query in the input field and click "Hledat".
The results will display below the form, showing titles, links, and snippets for up to 10 results from the Google Custom Search API.


Download Results:
Click the "Stáhnout výsledky (JSON)" button to download the search results as a vysledky.json file.


Error Handling:
If no query is provided, a 400 error with the message "Zadej hledaný výraz!" is returned.
If the API request fails, a 500 error with the error message is displayed.



Example

Start the server:node index.js


Open http://localhost:3000/ in your browser.
Enter a query like "Node.js tutorial" and submit the form.
View the results, including titles and snippets, and click the download button to save them as vysledky.json.

Development

Language: JavaScript (Node.js).
Libraries:
express: Handles routing and form submissions.
axios: Makes API requests to Google Custom Search.
path: Manages file paths for serving static files.


Structure:
Single index.js file for the server logic.
Inline CSS and JavaScript in the HTML response for simplicity.
Static files served from the public directory (optional).


API Details:
Uses the Google Custom Search JSON API (https://www.googleapis.com/customsearch/v1).
Returns up to 10 results per query (default API behavior).


Limitations:
Hardcoded API key and CX ID; consider using environment variables (e.g., .env file) for security.
Limited to 100 free queries per day (Google API free tier); additional queries require a paid plan.
Inline styles and scripts; could be refactored into separate files for better maintainability.



Notes

Security: Store API_KEY and CX in environment variables (e.g., using dotenv) to avoid exposing sensitive data in the codebase.
API Quota: Be aware of Google Custom Search API limits (100 free queries/day). Monitor usage in the Google Cloud Console.
Customization: Modify the CSS in the HTML response to adjust the UI's appearance or add more static assets in the public directory.
Error Handling: The application handles empty queries and API errors but may need additional handling for network issues or API rate limits.

Author

Developed by Martin Belka.

License
This project is for educational purposes and not distributed under a specific license. Ensure compliance with the Google Custom Search API terms of service. Contact the author for usage permissions.
