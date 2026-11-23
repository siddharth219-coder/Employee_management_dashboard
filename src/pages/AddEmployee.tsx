import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import EmployeeForm from "../components/EmployeeForm";
import { selectSelectedEmployee } from "../features/employees/employeeSelectors";
import { selectEmployee } from "../features/employees/employeeSlice";

const AddEmployee = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const selectedEmployee = useAppSelector(
        selectSelectedEmployee,
    );

    useEffect(() => {
        dispatch(selectEmployee(null));
    }, [dispatch]);

    if (selectedEmployee) {
        return (
            <p role="status">
                Preparing employee form...
            </p>
        );
    }

    return (
        <section>
            <EmployeeForm
                key="add"
                onSuccess={() =>
                    navigate("/employees")
                }
            />
        </section>
    );
};

export default AddEmployee;