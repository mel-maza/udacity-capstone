# Capstone - Travel App

## Overview
This is the final project of the udacity - frontend developer nanodegree program. 
The project shows a travel app, where the user can enter the traveling location and the leaving date. The app then will return and show the weather forecast for the entered location and date. Furthermore the days until the travel begins is shown and a picture of the entered city.
If a picture for the city cannot be find, a picture for the country is shown instead.

## Instructions
Start the local server with `npm run start`.
Then build the project with `npm run build-dev` for the development mode.
A new Tab will be opened automatically in the browser at `http://localhost:8080/`.

For the production mode run `npm run build-prod`.
For the tests run `npm run test`.

## What You're Getting
```bash
├── README.md - This file.
├── package.json # used packages in this project
├── package-lock.json # used packages in this project
├── webpack.dev.js # contains the configuration for the development mode
├── webpack.prod.js # contains the configuration for the production mode
├── .gitignore # contains the files and folders to ignore for git
├── .env # contains credentials
├── .babelrc # contains th configuration for babel
├── dist # contains the built files
    ├── index.html # the built html file
    ├── main.css # the minified styling
    └── main.js # the minified javascript
├── node_modules # contains the used packages
└── src # contains the client-side and server-side code
    ├── client # contains the client-side code
        ├── js # contains the javascript part of the client-side code
            └── app.js # submit-handling of the form
        ├── styles # contains the styling of the client-side code
            └── style.scss # contains sass-styling for the whole index.html
        └── views # contains the html file
            └── index.html # the page where it all starts
        └── index.js # the main javascript file for the client side
    └── server # contains the server-side code
        └── server.js # the main javascript file for the server side
        └── server.spec.js # contains tests for the server file
