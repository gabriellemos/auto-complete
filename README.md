# Trivia Challenge

## Table of Contents

- [Sumary](#sumary)
- [Dependencies](#dependencies)
  - [Configuring Environment](#configuring-environment)
  - [Installing Dependencies](#installing-dependencies)
  - [Configuring Variables](#configuring-variables)
- [Running on your Machine](#running-on-your-machine)

## Sumary

Implementation of a auto-complete component made with ReactJS. This component will receive an input from the user then will query it to The Movie Database (TMDB) API and display the results for the user.

[↩ Back to top](#trivia-challenge) <br/>

---

## Dependencies

### Configuring Environment

In case you don't have node and npm installed, you can download it directly from [Node Website](https://nodejs.org/en/download/).

[↩ Back to top](#quick-start) <br/>

---

### Installing Dependencies

With Node and npm installed, open a terminal within the project folder and run the following command to install all dependencies.

```bash
$ npm install
```

[↩ Back to top](#quick-start) <br/>

---

### Configuring Environment

This application uses The Movie Database (TMDB) API. In order to register for an API key, click the [API link](https://www.themoviedb.org/settings/api) from within your account settings page. Click "Create" or "click here" on the API page if you haven't created any already.

Once the API Key is generated, copy the value from **API Read Access Token** and paste it on `REACT_APP_THEMOVIEDB_API_KEY` inside the `.env` file.

> For more information you can access the following link: [Generating API Key from The Movie Database](https://developers.themoviedb.org/3/getting-started/introduction).

[↩ Back to top](#quick-start) <br/>

---

## Running on your Machine

Once you've installed all dependencies, the following commands will be available.

### `npm start`

Runs the app in the development mode. Once the project is ready, a new tab with the address [http://localhost:3000](http://localhost:3000) should de opened automaticaly on your default browser.

> The page will reload when you make changes. You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

> The build is minified and the filenames include the hashes.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
