import React from 'react'
import { useSettings } from '../hooks/useSettings'

const Settings = () => {

    const { theme, toggleTheme, viewMode, setViewMode } = useSettings()


    return (
        <section>

            <div className='settings-section'>
                <h2>Theme</h2>
                <p>Current Theme: {theme}</p>

                <button type='button' onClick={toggleTheme}>
                    Switch to {theme === "light" ? "Dark" : "Light"} Theme
                </button>

                <div className='settings-section'>
                    <h2>Employee View</h2>
                    <p>Current View: {viewMode}</p>
                    <button type='button' onClick={()=>setViewMode("card")}>
                        Card view
                    </button>

                    <button type='button' onClick={()=>setViewMode('table')}>
                        Table View
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Settings