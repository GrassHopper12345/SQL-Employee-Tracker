# SQL-Employee-Tracker

## Description
A command-line application that gives a user and/or company the ability to manage one's employee database. This application was developed using Node.js, inquirer, MySQL2, and dotenv that handles the backend of the database.

## Table of Contents
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Usage Instructions](#usage-instructions)
- [Mock Up](#mock-up)
- [GitHub URL](#gitHub-URL)
- [Walk-through Video](#walk-through-video)

## User Story
* As a user, I want to create a new database.

* As a user, I want to store movie names and reviews in the database in two separate table.

* As a user, I want to see a list of all movies.

* As a user, I want to be able to create and delete a movie.

* As a user, I want to return a list of all the reviews and the associated movie name.

## Acceptance Criteria
* It's done when `movie_db` is created and contains a `movies` and `reviews` table.

* It's done when `movie_db` has been seeded with data.

* It's done when a `GET` request to the `/api/movies` route renders a list of all movies.

* It's done when a `GET` request to the `/api/movie-reviews` route renders a list of all reviews with movie data.

* It's done when a `POST` request to the `/api/add-movie` route successfully adds a movie when tested using Insomnia.

* It's done when a `PUT` request to the `/api/review/:id` route successfully updates a movie review when tested using Insomnia.

* It's done when a `DELETE` request to `/api/movie/:id` route deletes a route when tested using Insomnia.

## Usage Instructions
1. Open the cloned repository in VS Code or similar code editor.
2. Open an inegrated terminal for index.js.
3. Enter 'node index.js' into the terminal commanl line.
4. A series of questions will prompt in the terminal for the user. The user shall select and/or enter the required choice and/or input to save a new employee to the database.
5. Once the prompts are completed by the user, one can request to veiw the new employee or current employee's within the database.

## Mock Up


## [GitHub URL](https://github.com/GrassHopper12345/SQL-Employee-Tracker)


## [Walk-Through Video](https://drive.google.com/file/d/1EYERd92M--eTAAksdrqBmcI0FaKcBWD8/view)