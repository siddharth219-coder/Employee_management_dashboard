import EmployeeDataLoader from "./features/employees/EmployeeDataLoader";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <EmployeeDataLoader />
      <AppRoutes />
    </>
  );
};

export default App;