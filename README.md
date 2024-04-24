# Getting Started with To-Do App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the dependencies for the project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run server`

Run this command from main directory not within the react folder to run the backend server.

### `Configuring Mongodb Database`

1. Make an empty named - config and inside create a file named - default.json (as shown below)
2. Inside the json file paste your mongodb congfiguration to connect the db create a jwtsecret. 

```
{
	"mongoURI": "conncect your mongodb",
	"jwtSecret": "your_secret"
}
```

### `Working`

1. Create an account 
2. List/Edit your todos as prompted in the input section.
3. Tap or click your listed TODOs to cross of as completed.
4. Download the secret gist to get a markdown of your summary.


