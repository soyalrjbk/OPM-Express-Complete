# Hero Association Rankings (One Punch Man)

Track the Hero Association's rankings, assign heroes to disaster-level monster threats, and see who comes out on top.

<img width="1512" height="854" alt="Screenshot 2026-10-25 at 9 52 30 PM" src="https://github.com/user-attachments/assets/defd0572-f7e8-4190-b335-f32d2c37c7c1" />

## How It's Made:

**Tech used:**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

Hero Association Rankings is a full-stack Express app inspired by *One Punch Man*. Heroes are stored in MongoDB with their class and rank, and the server renders the rankings with EJS.

When a disaster-level monster threat is detected, users can assign a single hero or a team of heroes to take it on. The app then decides the outcome of the fight and shows who won. Users can add, update, and remove heroes, and their changes go to the database through Express routes and client-side fetch requests.

## Optimizations

- Factor more stats, such as strength, speed, and special abilities, into the battle logic
- Move heroes up or down the rankings automatically based on their battle record
- Add a battle history log showing past threats and their outcomes
- Add filtering by hero class (S, A, B, C)

## Lessons Learned:

Turning a message-board template into a game-like app taught me how to design my own data model and routes instead of following the boilerplate. I got hands-on practice connecting front-end fetch requests to Express routes and updating MongoDB documents. Writing the battle logic also showed me how to keep game rules on the server, so the outcome stays consistent no matter what the browser sends.

## Installation

1. Clone the repo
2. Run `npm install`
3. Add your MongoDB connection string to `server.js` (or a `.env` file)
4. Run `node server.js`
5. Open `http://localhost:3000` in your browser

