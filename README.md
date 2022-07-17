# Project Setup

**`Node Version: v16.15.0`** **`NPM Version: v8.12.1`**

### Installation

`If using nvm switch to node v16 then continue with installation`

- nvm install 16
- nvm use

`If not using NVM then directly install with npm`

- npm install
- npm start

#### Known Bugs

If `parameters` or `headers` input fields are kept empty `value.length === 0`, and a request is made, then the request is going to fail internally, reutrning a error code on response area of `500`.

###### How did you decide which technologies to use as part of your solution?

- Redux: Easier State Management between components
- FontAwesome: Icons for Buttons
- Monaco Editor: Well known text editor
- Material UI: Better Base Components to build page quickly

###### Are there any improvements you could make to your submission?

- Validation on Parameters and Headers
- Make UI better

###### What would you do differently if you were allocated more time?

- Write Styles in seperate files
- Make a proper ui
- Store multiple requests
- Make it in Electron to allow custom CORS and browser security rules and allow testing of all api
- Show better response
- Add Animation (Minimal)
- Write Tests

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
