
const SearchFilter = ({searchWord, onChange}) => {
  return (
    <div>filter shown with <input value={searchWord} onChange={onChange}/></div>
  )
}

export default SearchFilter;