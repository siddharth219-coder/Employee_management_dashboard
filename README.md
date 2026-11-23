# Employee Management Dashboard

A responsive Employee Management Dashboard built with React and TypeScript. It supports employee CRUD operations, API integration, routing, authentication, application preferences, performance optimization, and Redux Toolkit state management.

## GitHub Repository

[View Source Code](https://github.com/siddharth219-coder/Employee_management_dashboard.git)

## Features

- Fetch employees from JSON Server
- Add, edit, delete, and view employees
- Search employees by name
- Filter employees by department
- Search and filters stored in URL parameters
- Employee statistics and department counts
- Card and table views
- Light and dark themes
- Loading, success, error, and retry states
- Form validation and duplicate-submit prevention
- Dynamic and nested routes
- Protected and role-based routes
- Custom 404 page
- Responsive desktop and mobile layout
- Redux Toolkit with TypeScript

## Technologies

- React
- TypeScript
- Redux Toolkit
- React Redux
- React Router
- Vite
- CSS3
- Fetch API
- JSON Server
- Context API

## Project Structure

```text
src/
├── app/
│   ├── hooks.ts
│   └── store.ts
├── components/
├── context/
│   ├── AuthContext.tsx
│   └── SettingsContext.tsx
├── features/
│   └── employees/
│       ├── EmployeeDataLoader.tsx
│       ├── employeeSelectors.ts
│       ├── employeeSlice.ts
│       └── employeeThunks.ts
├── pages/
├── routes/
├── services/
├── types/
├── App.tsx
├── main.tsx
└── index.css
```

## Redux Architecture

Redux Toolkit manages employee data, selection, search, department filtering, loading, and errors.

Async API operations are implemented with `createAsyncThunk`:

- Fetch all employees
- Fetch an employee by ID
- Add an employee
- Update an employee
- Delete an employee

Each operation handles `pending`, `fulfilled`, and `rejected` states.

```text
Component → Dispatch Action/Thunk → Redux Store → Selector → Updated UI
```

Authentication and application preferences remain in separate Context providers.

## Application Routes

| Page | Route |
|---|---|
| Login | `/login` |
| Dashboard | `/dashboard` |
| Employees | `/employees` |
| Employee Details | `/employees/:id` |
| Add Employee | `/employees/add` |
| Edit Employee | `/employees/edit/:id` |
| Settings | `/settings` |
| Not Found | `*` |

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Employee_management_dashboard
```

Install dependencies:

```bash
npm install
```

## Run the Project

Start JSON Server in the first terminal:

```bash
npx json-server --watch db.json --port 3001
```

Start React in another terminal:

```bash
npm run dev
```

Application URL:

```text
http://localhost:5173
```

API URL:

```text
http://localhost:3001/employees
```

## Production Build

```bash
npm run build
```

## Screenshots

### Dashboard

![Employee Dashboard](src/screenshots/desktop.png)

### Mobile View

![Mobile Dashboard](src/screenshots/mobile.png)

### API Error

![API Error](src/screenshots/api-error.png)

### Protected Route

![Protected Route](src/screenshots/protected-route-redirect.png)

> Remove or update any image path if its filename is different.

## Mock API Limitation

JSON Server is used as a mock REST API and must be running for employee operations to work. Frontend route protection does not replace backend authentication and authorization.

## Author

**Siddharth Kedar Mohanty**