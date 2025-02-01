# Getting Started with PIQUE Visualizer

Welcome to **PIQUE**! This guide will walk you through the steps to install, set up, and run the visualizer on your machine.

## Prerequisites

Make sure you have the following installed:

- **[Node.js](https://nodejs.org/) (16.x or later)** – Required to run PIQUE Visualizer. Check with:
  ```bash
  node -v
  ```
- **npm** – Comes with Node.js, used for managing dependencies. Check with:
  ```bash
  npm -v
  ```
- **[Git](https://git-scm.com/downloads)** – Needed to clone the repository
- **(Optional) Virtual Environment** – Useful for managing dependencies separately

---

## Installation

Follow these steps to install the application:

### Clone the Repository

First, clone the repository to your local machine using Git:  
```bash
git clone https://github.com/MSUSEL/Pique-Lite.git
```

### Navigate to the Project Directory

```bash
cd Pique-Lite
```

### (Optional) Set up a Virtual Environment
```bash
# This example uses `venv` on Linux:
python3 -m venv venv
source venv/Scripts/activate
```

### Install Dependencies

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
http://localhost:
```

---

## Next Steps

Now that the PIQUE Visualizer is running, you’re ready to analyze your software quality results!

- Explore the Using the Visualizer section for a detailed walkthrough of the tool's features.
- Refer to the [Input Schema](../user-guide/input-schema/input-schema.md) page to understand how to prepare your JSON input files.








