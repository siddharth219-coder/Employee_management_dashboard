import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEmployeeContext } from '../hooks/useEmployeeContext'
import EmployeeForm from '../components/EmployeeForm'

const AddEmployee = () => {

    const navigate=useNavigate()

    const{
        state:{selectedEmployee},
        selectEmployee,
    }= useEmployeeContext()

    useEffect(()=>{
        selectEmployee(null)
    },[selectEmployee])

    if (selectedEmployee) {
        return <p role='status'> Preparing employee form...</p>
    }

  return (
    <section>
        <EmployeeForm onSuccess={()=> navigate("/employees")}/>
    </section>
  )
}

export default AddEmployee