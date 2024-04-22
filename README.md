# PraxDoc

# Prax-doc Application

This README provides the necessary instructions to run and deploy the Prax-doc application.

## Requirements

### Node.js

- Install Node.js 18.19.1: [Download Page](https://nodejs.org/en/download/)

### Angular CLI

- Once you have Node.js installed, the `npm` command is now available.
- Install Angular CLI version 16.2.12 with the following command:

**npm install -g @angular/cli**


## Clone the Project

- Clone the project from the repository: `Prax-doc`

## Running the Application

To run the application, follow these steps:

1. Open a terminal in the directory of the project.
2. Install all dependencies with the following command:
  ```
  npm install
  ```
3. Start the server with:
  ```
  ng serve
  ```
4. The application will start on port `4300`.

## Deploying the Application with Docker

### Requirements

- Install Docker: [Installation documentation](https://docs.docker.com/get-docker/)

### Building the Docker Image

1. In the directory of the project, you will find a file named `Dockerfile`.
2. Open a terminal in the directory of the project and execute the following command to construct a build for the application:
  ```
  docker build -t prax-doc:V1 .
  ```
 - `V1` represents the tag of the build.
 - `prax-doc` represents the name of the build.

### Running the Docker Container

To start the application, open a terminal anywhere and execute the following command:

**docker run -d --name prax-doc -p 8000:4300 prax-doc:V1**

- `prax-doc` is the name of the container.
- `8000` is the port of the application on your computer.
- `4300` is the real port of the application.
- `prax-doc:V1` is the build that you want to start.

### Stopping and Starting Docker Containers

- To stop a container, use the following command:
    ```
    docker stop container_name
    ```
  - In this case, the container name is `prax-doc`.

- To start a container, use the following command:
    ```
    docker start container_name
    ```

## Environment Configuration

In the source directory of the project (`src/environments`), there are two environment files:
- One for UAT.
- One for local.

These files contain all the Appwrite IDs and parameters for the application.
