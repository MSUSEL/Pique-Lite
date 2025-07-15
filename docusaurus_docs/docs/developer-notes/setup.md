# Getting Started with PIQUE Visualizer

Welcome to **PIQUE**! This guide will walk you through installing, setting up, and running the visualizer on your machine.

## Prerequisites

Ensure you have the following installed:

- **[Node.js](https://nodejs.org/) (16.x or later)** – Required to run PIQUE Visualizer. Check your version with:
  ```bash
  node --version
  ```
- **npm** – Comes with Node.js, used for managing dependencies. Check with:
  ```bash
  npm --version
  ```
- **[Git](https://git-scm.com/downloads)** – Needed to clone the repository.
- **[Python 3.8+](https://www.python.org/downloads/)** – Required for building documentation. Check with:
  ```bash
  python --version
  ```
- **(Optional) Virtual Environment** – Useful for managing dependencies separately.

---

## Installation

Follow these steps to install the application:

### Clone the Repository

Clone the repository to your local machine using Git:
```bash
git clone https://github.com/MSUSEL/Pique-Lite.git
```

### Navigate to the Project Directory

```bash
cd Pique-Lite
```

### (Optional) Set up a Virtual Environment

```bash
# Example using `venv` on Linux:
python3 -m venv venv
source venv/bin/activate
```

### Install Dependencies

Install PIQUE dependencies:
```bash
npm install
```

Install documentation dependencies:
```bash
pip install -r requirements.txt
```

If using `pyproject.toml`, install with:
```bash
pip install .
```

## View Project Documentation

This project uses **MkDocs** for documentation.

Start the local documentation server:
```bash
mkdocs serve
```

Access the documentation at:
```bash
http://127.0.0.1:8000/
```

## Run the Visualizer

Once installed, start the visualizer:

```bash
npm run dev
```

Open your browser and go to:
```bash
http://localhost:5173
```

---

## Next Steps

Now that the PIQUE Visualizer is running, you can analyze your software quality results!

- Explore the [User Guide](../user-guide/index.md) for a detailed walkthrough.
- Refer to the [Input Schema](../user-guide/input-schema/input-schema.md) to prepare your JSON input files.
