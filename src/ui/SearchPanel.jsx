import { useState, useRef, useEffect } from 'react'
import { SearchField } from './Search/SearchField/SearchField.jsx'
import { ListOfHints } from './Search/ListOfHints/ListOfHints.jsx'
import { useCitiesStore } from '../stores/weatherStore.js'

export function SearchPanel({ searchHints, searchHintsByName, loadWeather, setOpenBurger }) {
  const addCity = useCitiesStore((state) => state.addCity)
  const setActiveCity = useCitiesStore((state) => state.setActiveCity)

  const [searchValue, setSearchValue] = useState('')
  const [showHints, setShowHints] = useState(false)

  const searchRef = useRef(null)
  const typingTimeout = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowHints(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  async function handleSearch() {
    const query = searchValue.trim()
    if (!query) return

    const hint = searchHints[0]

    const key = hint ? hint.key : query.toLowerCase().replace(/\s+/g, '-')
    const label = hint ? hint.label : query

    addCity({ key, label })

    await Promise.resolve()

    setActiveCity(key)
    await loadWeather(key)

    setSearchValue('')
    setShowHints(false)
    setOpenBurger(false)
  }

  return (
    <div className="search-block" ref={searchRef}>
      <SearchField
        value={searchValue}
        onChange={(value) => {
          setSearchValue(value)

          if (typingTimeout.current) clearTimeout(typingTimeout.current)

          typingTimeout.current = setTimeout(async () => {
            await searchHintsByName(value)
            setShowHints(true)
          }, 400)
        }}
        onSearch={handleSearch}
      />

      {showHints && searchHints.length > 0 && (
        <ListOfHints
          value={searchHints}
          onClick={async (item) => {
            const { key, label } = item

            addCity({ key, label })

            await Promise.resolve()

            setActiveCity(key)
            await loadWeather(key)

            setSearchValue('')
            setShowHints(false)
            setOpenBurger(false)
          }}
        />
      )}
    </div>
  )
}
