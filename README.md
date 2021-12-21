# PIQUE-LITE

An application built with React, Redux, JavaScript, HTML, and CSS used to visualize PIQUE results.

# Table of Contents
* About PIQUE-LITE
* Components
* Screenshots
* Technologies
* Demo-Link
* Setup


# About PIQUE-LITE

PIQUE: a Platform for Investigative software Quality Understanding and Evaluation. PIQUE is a collection of library functions and runner entry points designed to support experimental software quality analysis from a language-agnostic perspective. To remain language-agnostic, this project provides the abstractions, interfaces, and algorithms nesscessary for quality assessment, but leaves the task of defining language-specific static analysis operations to dependent language-specific projects that will use MSUSEL-PIQUE as a dependency. 
PIQUE: a Platform for Investigative software Quality Understanding and Evaluation. PIQUE is a collection of library functions and runner entry points designed to support experimental software quality analysis from a language-agnostic perspective. 

PIQUE results are in json format. They are difficult to read, navigate, and analyze. PIQUE-LITE is created to help users simplify the PIQUE process as well as visualize and analyze PIQUE results. 

PIQUE-LITE is a React application that lets users upload PIQUE results and display the result as a hierarchical tree structure. PIQUE-LITE also allows users to upload multiple PIQUE result files at once. The resulting data will be automatically integrated into different data visualization graphs on the Dashboard. 

# Components

PIQUE-LITE contains two main components:

**Dashboard page** is a visual display of all of PIQUE results data. Its primary purpose is to provide information at a glance, such as TQIs. The benefits of PIQUE-LITE Dashboard include:

* A visual representation of performance over time with charts and graphs
* Quick identification of data outliers and correlations

**Visualize button** on the sidebar contains four main visualization features:

* **Define page** will be built to have functionalities such as building PIQUE Models and returning PIQUE Models in .json format. (still needs to be developed)

* **Calibarte page** will be built to have functionalities such as calibrating PIQUE Models, running PIQUE Models, and returning a dervied quality model in .json format. (still needs to be developed)

* **Evaluate page** is built to visualize PIQUE results in a hierarchical tree structure. This structure has six levels: TQI, Quality Aspects, Product Factors, Measures, Diagnostics, and Findings. Each node contains a name and a decimal value.

* **Assess Page** will be built to have functionalities such as analyzing PIQUE results data.


# PIQUE-LITE Screen Shots

![Dashboard](https://github.com/MSUSEL/Pique-Lite/blob/xuying_dev/public/images/Dashboard2.png)

PIQUE-LITE Dashboard

![Dashboard Chart Change](https://github.com/MSUSEL/Pique-Lite/blob/xuying_dev/public/images/Dashboard3.png)

PIQUE-LITE Dashboard Data Change

![Dashboard Chart Change](https://github.com/MSUSEL/Pique-Lite/blob/xuying_dev/public/images/Dashboard4.png)

PIQUE_LITE Sidebar

![Sidebar](https://github.com/MSUSEL/Pique-Lite/blob/xuying_dev/public/images/Sidebar.png)

PIQUE-LITE EVALUATE

![Evaluation Page](https://github.com/MSUSEL/Pique-Lite/blob/xuying_dev/public/images/evaluate.png)

PIQUE-LITE EVALUATE EDITOR

![EVALUATE EDITOR](https://github.com/MSUSEL/Pique-Lite/blob/xuying_dev/public/images/EditorBarFullView.png)

PIQUE-LITE EVALUATE EDITOR UPLOAD

![EVALUATE EDITOR UPLOAD](https://github.com/MSUSEL/Pique-Lite/blob/xuying_dev/public/images/Screen%20Shot%202021-12-17%20at%202.18.10%20PM.png)

PIQUE-LITE PIQUE TREE

![PIQUE-TREE](https://github.com/MSUSEL/Pique-Lite/blob/xuying_dev/public/images/PiqueTree.png)

# Technologies

The technologies implemented in this project are React, React-Router-dom, React-Redux, Redux-Form, Styled-Components, React-D3-Tree, and a significant amount of VanillaJS, JSX, and CSS.

# Demo Link

# Setup

Clone down this repository. You will need node and npm installed globally on your machine.

### `npm install`

project installation

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `To Visit App`

localhost:3000/dashboard

# License: 

