# Employee Management Dashboard

A responsive Employee Management Dashboard built with React and TypeScript. It supports employee CRUD operations using a JSON Server mock API.

## Features

- Fetch employees from an API
- Add new employees
- Edit existing employees
- Delete employees
- Search employees by name
- Filter employees by department
- Search and filtering work together
- Form validation
- Loading, success and error states
- Retry failed API requests
- Prevention of duplicate submissions and deletions
- Responsive desktop and mobile design
- Reusable and properly typed React components

## Technologies Used

- React
- TypeScript
- Vite
- CSS3
- JSON Server
- Fetch API

## Project Structure

```text
src/
├── components/
│   ├── EmployeeCard.tsx
│   └── EmployeeForm.tsx
├── hooks/
│   └── useEmployees.ts
├── services/
│   └── employeeService.ts
├── types/
│   └── employee.types.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Installation

Clone the repository and enter the project folder:

```bash
git (https://github.com/siddharth219-coder/Employee_management_dashboard.git)
cd Employee_management_dashboard
```

Install the dependencies:

```bash
npm install
```

## Running the Application

Open the first terminal and start JSON Server:

```bash
npx json-server --watch db.json --port 3001
```

The employee API will run at:

```text
http://localhost:3001/employees
```

Open another terminal and start the React application:

```bash
npm run dev
```

Open the URL displayed by Vite, usually:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
```

## API Operations

| Operation | Method | Endpoint |
|---|---|---|
| Fetch employees | GET | `/employees` |
| Add employee | POST | `/employees` |
| Edit employee | PATCH | `/employees/:id` |
| Delete employee | DELETE | `/employees/:id` |

## Error Handling

The application displays an error message when an API request fails. The initial employee-fetching error screen includes a **Retry** button.

`AbortController` is used to cancel the fetch request when the component unmounts and prevent an obsolete request from updating the UI.

## Screenshots

### Successful API Response

![Employee dashboard](src/screenshots/desktop.png)

### Mobile View

![Mobile dashboard](src/screenshots/mobile.png)

### Failed API Response

![API error and Retry button](src/screenshots/api-error.png)

## Mock API Limitation

This project uses JSON Server as a mock REST API. The data is stored locally in `db.json`; therefore, JSON Server must be running for API operations to work.

## Author

Siddharth Kedar Mohanty