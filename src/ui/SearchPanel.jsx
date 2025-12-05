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

  // закрытие по клику
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowHints(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // НОРМАЛИЗАЦИЯ → делаем key из названия
  const normalizeKey = (label) => label.trim().toLowerCase()

  async function handleSearch() {
    const query = searchValue.trim()

    if (!query) return

    const label = searchHints.length > 0 ? searchHints[0].name : query
    const key = normalizeKey(label)

    addCity({ key, label })

    // ждём microtask, чтобы Zustand обновил список
    await Promise.resolve()

    setActiveCity(key)
    await loadWeather(key)

    setShowHints(false)

    setSearchValue('')
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
          }, 500)
        }}
        onSearch={handleSearch}
      />

      {showHints && searchHints.length > 0 && (
        <ListOfHints
          value={searchHints}
          onClick={async (label) => {
            const key = normalizeKey(label)

            addCity({ key, label })
            await Promise.resolve()

            setSearchValue(label)
            setActiveCity(key)

            await loadWeather(key)

            setShowHints(false)
            //-------------
            setSearchValue('')
            setOpenBurger(false)
          }}
        />
      )}
    </div>
  )
}
