import './ListOfHints.css'

export const ListOfHints = ({ value, onClick }) => {
  return (
    <ul className="hints">
      {value.map((item) => (
        <li key={item.id} onClick={() => onClick(item.name)}>
          {item.name}, {item.country}
        </li>
      ))}
    </ul>
  )
}
