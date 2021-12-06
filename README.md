# Tristámon

An small RPG game as present!

## Setup

1. Clone repo
2. `yarn install`
3. `yarn start`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

You can locally test this build by using

```
yarn global add serve
serve -s build
```

### `yarn update-site`

Will build the app, clean up unused assets, and place everything in the `docs/` folder, to be deployed to github pages.
