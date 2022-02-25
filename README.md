# Hoard Concept App



## Concept Test

Run `node src/core/conceptTest.js` to run the working test file that loads some example accounts and scheduled transactions and uses the core libraries to compute and print out a forecast based on them.


## Frontend

The React frontend is VERY buggy and far from functional! It's just a tentative start really to try visualizing the data.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Backend
To get started, you'll want to set up your local database. Make sure you have MySQL and MySQL Workbench installed ([download here](https://dev.mysql.com/downloads/)). Create a connection with hostname `127.0.0.1` and port `3306`. If you set a password, add a `.env` file into the `server` folder with content `DATABASE_PASSWORD=[insert your password, in quotes, here]`. Then, to get the server started, navigate to the `server` folder and run `npm start`.
