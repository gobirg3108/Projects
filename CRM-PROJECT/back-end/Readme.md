# CRM Backend API

This is the backend API for the CRM application. It provides user authentication and customer management functionalities.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [User Authentication](#user-authentication)
- [Customer Management](#customer-management)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Steps
1.Create a Folder

2. Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables. Create a `.env` file in the root directory and add the following:
    ```bash
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    
4. Start the server:
    ```bash
    npm start
    # or
    yarn start
    ```

## Usage

- The API will be available at `http://localhost:5000`.

## API Endpoints

### User Authentication

- **Register**
  - **URL**: `/api/auth/register`
  - **Method**: `POST`
  - **Body**:
    ```json
    {
      "name": "Enter Your Name",
      "email": "Enter your email id",
      "password": "create your password"
    }
    ```
  - **Response**: `201 Created`

- **Login**
  - **URL**: `/api/auth/login`
  - **Method**: `POST`
  - **Body**:
    ```json
    {
      "email": "Enter your email id",
      "password": "enter your password"
    }
    ```
  - **Response**: `200 OK` with JWT token

### Customer Management

- **Add a Customer**
- **URL**: `/api/customers`
- **Method**: `POST`
- **Headers**:
- `Authorization: Bearer <token>`
  - **Body**:
    ```json
    {
      "name": "Your name",
      "email": "email",
      "phone": "mob no",
      "address": "address",
      "source": "ex:new,website,interested"
    }
    ```
  - **Response**: `201 Created`
 
  - - **Get All Customers**
  - **URL**: `/api/customers`
  - **Method**: `GET`
  - **Headers**:
    - `Authorization: Bearer <token>`
  - **Response**: `200 OK` with customer data

- **Get a Single Customer**
  - **URL**: `/api/customers/:id`
  - **Method**: `GET`
  - **Headers**:
    - `Authorization: Bearer <token>`
  - **Response**: `200 OK` with customer data

- **Update a Customer**
  - **URL**: `/api/customers/:id`
  - **Method**: `PUT`
  - **Headers**:
    - `Authorization: Bearer <token>`
  - **Body**:
    Which item change enter
    ex: {
    "phone":"45623879"
    }
    
    ```
  - **Response**: `200 OK`

- **Delete a Customer**
  - **URL**: `/api/customers/:id`
  - **Method**: `DELETE`
  - **Headers**:
    - `Authorization: Bearer <token>`
  - **Response**: `204 No Content`
 
    -**

    **Follow up a Customer**
    **URL**:'/api/followup/send'
    **Method**: "POST"
    **Headers**:
    - `Authorization: Bearer <token>`
    - **Response**: msg": "Email sent",

      **Customers Reports**
       **URL**:'/api/reports'
       **Method**: "GET"
      - **Headers**:
    - `Authorization: Bearer <token>`
    -  **Response**:"Show Our Reports",

      **Specific Customer followup**
     **URL**:'/api/customers/<Customer ID>/followup'
    **Method**: "POST"
       **Headers**:
    - `Authorization: Bearer <token>`
    -  **Response**: "followupActions":
    -  [
    -  {
    -  "action":"show action report"
    -  }
    -  ]
    

## Environment Variables

- `PORT`: The port number on which the server will run.
- `MONGODB_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWT tokens.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
