import './Compass.css'

export const WindCompass = ({ degree = 0, dir = 'N' }) => {
  return (
    <div className="compass">
      <div className="compass-ring">
        <span className="mark n">N</span>
        <span className="mark e">E</span>
        <span className="mark s">S</span>
        <span className="mark w">W</span>

        <div
          className="arrow"
          style={{ '--rotation': `${degree}deg` }}
          aria-label={`Wind direction ${dir}, ${degree} degrees`}
          title={`${dir} • ${degree}°`}
        />
      </div>
    </div>
  )
}
