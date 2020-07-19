# Carry


Carry is a delivery service that allows users to place orders with some of their favorite retail stores that are within the NYC boroughs. Designed with the idea that customers should be able to get any items they need, we focus on delivering their necessities / wants from retail stores in delivery times ranging from 3hrs to end-of-day.



##  Local Setup

You must have installed Node.js and PostgreSQL in your computer.

You can check for these dependencies with node -v and psql -v. If your shell/terminal doesn't complain and you see version numbers you are good to go.

1. Clone this repo: 
⋅⋅⋅git clone git@github.com/tbriany/Carry.git ⋅⋅

2. Install dependencies for the Node/Express Server (backend folder):
cd backend && npm install

3. Install dependencies the React App (frontend folder):
cd frontend && npm install

4. Create database and seed sample data while being in the server directory with:
psql -f .database/seed.sql
Make sure PostgreSQL is running!

5. To launch the Node/Express server, inside the backend folder run:
 npm run start:dev
 
6. To launch the React App, inside the frontend folder, and preferably in another terminal window run:
 npm start
 
A new browser tab should have been opened and the App should be running. If that is not the case check the terminals output for errors, if you are unable to troubleshoot the problem, I would be happy to address issues so open one
