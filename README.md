# Flashcard-web-app

This repo is the source code for *QuizMe*, deployed on https://tianchez.github.io/Flashcard-web-app . 

## Intorduction
With QuizMe, users can create their own flash cards to make quizzes for friends. Quizzes can be easily shared to social networking by URL. Any users can take quizzes and compete with other players around the world. Top users' name will be shown in the score board for each quiz.

QuizMe adopts Responsive web design during the development. Users can access to this web application from any devices.

<p align='center'>
<img src='https://github.com/tianchez/Flashcard-web-app/tree/master/doc/destop.png' width='600' alt='destop-screenshot'>
<img src='https://github.com/tianchez/Flashcard-web-app/tree/master/doc/mobile.png' width='600' alt='mobile-screenshot'>
</p>

## Prerequisites
To run and build this repo locally, you have to make sure following tools are installed in your environment
* Node.js v6.11.1 or above
* Latest npm package manager (https://www.npmjs.com/package/npm) 

## Overview
* QuizMe is written in React v16 and Redux. 
* All the quiz data and user credentials are processed and stored in Google Firebase. To expedite  the development of connection between Frontend and Backend, QuizMe is using react-redux-firebase
(https://github.com/prescottprue/react-redux-firebase) to bootstrap the project. 
* To keep the UX experience consistent, QuizMe follows Google Material Design and uses Materialize CSS framework(https://materializecss.com/) for a more user-friendly interface. 
* Webpack v4 is used to bundle the code and static assets. Babel is utilized to transcompile our ES6 and JSX code base to browser-compatible JavaScript

## Local development
1. Git clone this repository by running `git clone https://github.com/tianchez/Flashcard-web-app.git`
2. Run `npm install` to install all dependency packages
3. To run the app locally, run  `npm start`
4. Open `http://localhost:8080` in Chrome. Bingo! You can see our lovely site in your browser.

**Note:** Internet connection is also required since QuizMe is reading realtime data from Google Firebase. 

## Deployment
1. Run `npm run build` locally
2. After you verify no compiling errors from the previous command, run `npm run deploy`
3. QuizMe will be updated in https://tianchez.github.io/Flashcard-web-app 

## Test
Currently, QuizMe doen't have any unit tests. Feel free to add it!

## Copyright and License
Code Copyright 2019 Frank Zhang. Code released under the MIT license. See the included license file [License](LICENSE) .





