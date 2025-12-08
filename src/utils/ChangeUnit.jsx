export const ChangeUnit = ({ unit, setUnit }) => {
  function switchUnit() {
    const newUnit = unit === 'C' ? 'F' : 'C'
    setUnit(newUnit)
  }

  return (
    <button className="change-unit" onClick={switchUnit}>
      <span>°{unit}</span>
    </button>
  )
}
