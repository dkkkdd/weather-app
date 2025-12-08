import './BurgerBtn.css'
export const BurgerBtn = ({ openBurger, setOpenBurger }) => {
  const title = openBurger ? 'x' : '='
  return (
    <button onClick={() => setOpenBurger(!openBurger)} className="burger-btn">
      {title}
    </button>
  )
}
