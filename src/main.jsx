import './style.css'
import { registerSW } from 'virtual:pwa-register'
registerSW()
import React, { act } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { el } from 'date-fns/locale'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

function formatPower(x, n) {
  if (Number.isInteger(n)) {
    return x ** n
  }

  const frac = toFraction(n)
  const p = frac.p
  const q = frac.q

  if (p === 1) {
    return q === 2 ? `√${x}` : `^${q}√${x}`
  }

  return `√(${x}^${p})`
}

function toFraction(num) {
  const tolerance = 1e-10
  let h1 = 1,
    h2 = 0
  let k1 = 0,
    k2 = 1
  let b = num

  do {
    let a = Math.floor(b)
    let h = a * h1 + h2
    let k = a * k1 + k2
    h2 = h1
    h1 = h
    k2 = k1
    k1 = k
    b = 1 / (b - a)
  } while (Math.abs(num - h1 / k1) > num * tolerance)

  return { p: h1, q: k1 }
}

console.log(formatPower(2, 0.5))
console.log(formatPower(2, 1 / 3))
console.log(formatPower(2, 3 / 2))
console.log(formatPower(2, 4))
