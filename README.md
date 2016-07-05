# Fitomo Data Aggregation Service

  Fitomo Data Aggregation Service combines Fitbit and Jawbone data into a unified data format.

## Table of Contents
1. [Usage](#Usage)
2. [Getting started](#Getting-Started)
  1. [Clone the latest version](#Install-Dependencies)
  2. [Install dependencies](#Install-Dependencies)
  3. [Run the application](#Run-Application)
3. [Tech Stack](#Tech-Stack)
4. [Directory Layout](#Directory-Layout)
5. [Contributing](#Contributing)
6. [License](#License)

## Usage

This service takes 'GET' requests at 'api/(fitbit or jawbone)/update' and 'api/(fitbit or jawbone)/retrieve'

  Requests to '/api/fitbit/update' should include the following:

  ```sh
  id
  fitbit_id
  accessToken
  startDate (in format 'yyyy-MM-dd')
  endDate (in format 'yyyy-MM-dd')
  ```

  Requests to '/api/jawbone/update' should include the following:

  ```sh
  id
  accessToken
  startDate (in format 'yyyy-MM-dd')
  endDate (in format 'yyyy-MM-dd')
  ```

  Requests to '/api/(fitbit or jawbone)/update' should include the following:

  ```sh
  id
  startDate (in format 'yyyy-MM-dd')
  endDate (in format 'yyyy-MM-dd')
  ```

## Getting started

#### 1. Clone the latest version

  Start by cloning the latest version of the Fitomo Data Aggregation Service on your local machine by running:

  ```sh
  $ git clone https://github.com/Fitomo/Data-Aggregation-Service.git
  $ cd Data-Aggregation-Service
  ```

#### 2. Install Dependencies
  From within the root directory run the following command to install all dependencies:

  ```sh
  $ npm install
  ```

#### 3. Run the application

  1. Using the env/example.env file as an example, setup your environment variables.

  2. In a new terminal window run the following command to start the application:

  ```sh
  $ npm start
  ```

  After that open in your browser the localhost with your chosen port, e.g. ``` http://localhost:8000/ ``` to access the application.

## Tech Stack

##### Back end:
- Node
- Express
- Bookshelf/Knex
- MySQL
- Fitbit API
- Jawbone API

##### Back end:
- Mocha
- Chai

## Directory Layout
```
├── /env/                       # Environment variables
├── /node_modules/              # 3rd-party libraries and utilities
├── /server/                    # Client source code
│   ├── /config/                # Initial configurations for server, auth, and database
│   ├── /controllers/           # Manage API calls and request handling
│   ├── /lib/                   # Request, database, and utility helpers
│   ├── /models/                # Database model
│   ├── /routes/                # Handle all routing
│   ├── /server.js              # Core server file
├── /specs/                     # Tests
└── package.json                # List of 3rd party libraries and utilities to be installed
└── .eslintrc                   # ESLint settings
```

## Contributing

  1. Fork the repo.
  2. Clone it to your local computer
  3. Cut a namespaced feature branch from master and name it appropriately
  4. Make commits and prefix each commit with the type of work you were doing
  5. BEFORE PUSHING UP YOUR CHANGES, rebase upstream changes into your branch, fix any potential conflicts, and then push to your fork.
  6. Submit a pull request directly to the master
  7. Someone else will perform code review to keep codebase clean
  8. Fix any errors or issues raised by the reviewer and push the fixes as a single new commit
  9. Repeat until the pull request is merged.

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines in detail.

## License

M.I.T
