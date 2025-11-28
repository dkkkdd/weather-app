import './SearchField.css'

export const SearchField = ({ value, onChange, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className="search-field">
      <input
        type="text"
        placeholder="Введите название города"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSearch}>Поиск</button>
    </div>
  )
}
