import { useEffect, useState } from "react"
import { Employee } from "../types/employee.types"
import { fetchEmployees } from "../services/employeeService"

export const useEmployees=()=>{
    const [employees, setEmployees]=useState<Employee[]>([])
    const [isLoading, setIsLoading]=useState(true)
    const [error, setError]=useState<string | null>(null)
    const [retryCount, setRetryCount]=useState(0)

    const retry=()=>{
        setError(null)
        setIsLoading(true)
        setRetryCount((count)=>count+1)
    }

    useEffect(()=>{
        const controller = new AbortController()

        const loadEmployees = async ()=>{
            try {
                const data =await fetchEmployees(controller.signal)
                if (!controller.signal.aborted) {
                    setEmployees(data)
                }
            } catch (error:unknown) {
                if (!controller.signal.aborted) {
                    setError(
                        error instanceof Error ? error.message: "Could not load employees"
                    )
                }
            } finally{
                if (!controller.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }

        void loadEmployees()

        return ()=> controller.abort()
    }, [retryCount])

    return {employees,setEmployees,isLoading,error,retry}

}