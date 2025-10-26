Node.js + Render: Automated CI/CD Deployment Demo

A simple Node.js (Express) mock server built to learn and demonstrate a production-ready CI/CD pipeline using GitHub Actions to automatically deploy to Render.

This project is live and can be reached at:
https://mock-backend-ugri.onrender.com/api/health

Project Goal

The primary goal of this repository was not to build a complex API, but to learn and document the fundamentals of modern DevOps. This project serves as a complete, hands-on example of taking a local Node.js application, hardening it for production, and setting up a fully automated deployment pipeline.

Key Skills Demonstrated:

Production-Ready Server: Writing a clean, robust Express.js server.

Security: Using helmet for security headers and cors for a production-ready whitelist.

Error Handling: Implementing global 404 and 500 error handlers.

Hosting: Deploying a Node.js service to Render.

CI/CD: Creating a GitHub Action to automate testing and deployment.

Secrets Management: Using .env locally and managing environment variables in Render and GitHub Actions.

The Automated CI/CD Pipeline

This project is configured to automatically deploy any new changes pushed to the main branch.

Here is how the workflow operates:

A developer pushes a new commit to the main branch on GitHub.

This push automatically triggers the GitHub Action defined in .github/workflows/deploy.yml.

The GitHub Action job begins:

It checks out the latest code.

It sets up a Node.js 18 environment.

It installs dependencies using npm ci (for faster, reliable builds).

It runs the test suite via npm test.

If the tests pass, the job proceeds to the "Trigger Render Deploy" step.

This step sends a POST request to a secret Deploy Hook URL (stored in GitHub Secrets as RENDER_DEPLOY_HOOK).

Render receives this hook, which immediately triggers a new deployment, pulling the latest commit from the main branch and restarting the service with the new code.

Available API Endpoints

Health Check:

GET /api/health

Response: {"message":"Welcome to MockBackend! (v3)","status":"Running"}

Get Users:

GET /api/users

Response: [{"id":1,"name":"Alice",...}]

Submit Feedback:

POST /api/feedback

Body: {"user":"Test","message":"Hello!"}

Response: {"success":true,"message":"Feedback submitted"}

How to Run Locally

Clone the repository:

git clone [https://github.com/](https://github.com/)<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
cd <YOUR_REPO_NAME>


Install dependencies:

npm install


Set up environment variables:

Copy the example file:

cp .env.example .env


Edit the .env file with your local settings (e.g., CORS_ORIGIN=http://localhost:3000).

Run the server:

For production mode: npm start

For development (with auto-reload): npm run dev
