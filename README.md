# Carry

## Live @ https://pursuitcarry.herokuapp.com/

Carry is a delivery service that allows users to place orders with some of their favorite retail stores that are within the NYC boroughs. Designed with the idea that customers should be able to get any items they need, we focus on delivering their necessities / wants from retail stores in delivery times ranging from 3hrs to end-of-day.

Built with React.js, Node.js with Express, PostgreSQL, and Material UI.

![langingpage](./public/images/landingpage.png)
![productpage](./public/images/productpage.png)
![itempopup](./public/images/itempopup.png)
![checkout](./public/images/checkout.png)

## Features

Users are able to:

* Sign up for an account.
* Share their location to view stores near them.
* Shop by store or category on landing page.
* Shop new arrivals on store page.
* Filter products by category, brand, color, or product type.
* Add products to their shopping cart. 
* Begin check out process and view items in their shopping cart.


## Technologies Used

* React.js. For the front-end/client interface of our app.
* CSS3 & Material UI. For the styling of our app.
* Node.js & Express.js. For the HTTP backend server.
* PostgreSQL. As our relation database management system.
* Passport.js. For handling user authentication and authorization.
* pg-promise. For interfacing with our database in our backend code.
* bcrypt. For hashing and salting passwords before storage.


## Technical milestones 

* Using geo-location data and calculations module to get all stores near the user within a given radius.
* Filtering products by 4 options, having page display those products or remove them from page if filters are removed.
* Integrating user authentication with Passport.js, securely storing passwords and allowing for cookie-based authorization.
* Creating sessions for shopping cart. Shopping cart persists even if user leaves page and returns.


##  Local Setup

You must have installed Node.js and PostgreSQL in your computer.

You can check for these dependencies with node -v and psql -v. If your shell/terminal doesn't complain and you see version numbers you are good to go.

1. Clone this repo: 
  
   git clone git@github.com/tbriany/Carry.git 

2. Install dependencies for the Node/Express Server (backend folder):

   cd server && npm install

3. Install dependencies the React App (frontend folder):

   cd client && npm install

4. Create database and seed sample data while being in the server directory with:
 
   psql -f .database/seed.sql
   Make sure PostgreSQL is running!

5. To launch the Node/Express server, inside the backend folder run:
 
   npm run start:dev
 
6. To launch the React App, inside the frontend folder, and preferably in another terminal window run:
 
   npm start
 
A new browser tab should have been opened and the App should be running. If that is not the case check the terminals output for errors, if you are unable to troubleshoot the problem, I would be happy to address issues so open one
