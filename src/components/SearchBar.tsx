import {forwardRef} from 'react'


interface SearchBarProps{
    search:string,
    onSearchChange:(value:string)=>void
}

const SearchBar =forwardRef<HTMLInputElement,SearchBarProps> (({search,onSearchChange},ref) => {
  return (
    <div className='employee-controls'>
        <label htmlFor="employee-search">Search by name</label>
        <input type="search" ref={ref} id='employee-search' placeholder='e.g. Rahul' value={search} onChange={(event)=>onSearchChange(event.target.value)} />
    </div>
  )
})

SearchBar.displayName= "SearchBar"

export default SearchBar