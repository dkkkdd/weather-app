import './SearchField.css'

export const SearchField = ({ value, onChange, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch()
      e.target.value = ''
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Введите название города"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSearch}>Поиск</button>
    </>
  )
}
