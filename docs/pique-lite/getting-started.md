# Getting Started with PIQUE Visualizer

Welcome to **PIQUE-Lite**! This guide will walk you through the steps to install, set up, and run the visualizer on your machine.

## Prerequisites

Before getting started, ensure your system meets the following requirements:

1. **Node.js**  

    - PIQUE Visualizer is built as a Node.js application, so you'll need Node.js installed to run the server.  

    - [Download Node.js](https://nodejs.org/), and confirm installation by running the following command in your terminal:  
     ```bash
     node -v
     ```  
     This will display the installed Node.js version. PIQUE Visualizer requires Node.js version **16.x** or later.

2. **npm (Node Package Manager)**  
    - npm comes with Node.js and is used to manage the application’s dependencies.  
    - Verify npm installation with:  
     ```bash
     npm -v
     ```  
     This will display the installed npm version.

3. **Git**  
    - Git is required to clone the project repository.  
    - [Download Git](https://git-scm.com/downloads) if not already installed.

4. **Optional: Virtual Environment**  
    - Using a virtual environment ensures an isolated environment for managing dependencies. Python's `venv` module makes it easy to set up one. 

---

## Installation

Follow these steps to install and set up the PIQUE Visualizer:

### 1. Clone the Repository

First, clone the repository to your local machine using Git:  
```bash
git clone https://github.com/MSUSEL/Pique-Lite.git
```

### 2. Navigate to the Project Directory

```bash
cd Pique-Lite
```

### 3. (Optional) Set up a Virtual Environment

### 4. Install Dependencies

Run the following command to install the required dependencies:  
```bash
npm install
```

This will read the package.json file and install all necessary packages locally.

## Running the Visualizer

Once the installation is complete, you can start the visualizer:

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to the following URL (if it doesn’t open automatically):

```bash
http://localhost:5173
```

## Next Steps

Now that the PIQUE Visualizer is running, you’re ready to analyze your software quality results!

- Explore the Using the Visualizer section for a detailed walkthrough of the tool's features.
- Refer to the Input Schema page to understand how to prepare your JSON input files.








