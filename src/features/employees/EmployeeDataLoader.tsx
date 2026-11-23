import { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import { fetchEmployeesThunk } from "./employeeThunks"

const EmployeeDataLoader=()=>{
    const dispatch = useAppDispatch()

    useEffect(()=>{
        const request = dispatch(fetchEmployeesThunk())

        return ()=>{
            request.abort()
        }
    },[dispatch])

    return null
}

export default EmployeeDataLoader