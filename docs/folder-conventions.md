# Правила структуры проекта

## UI-компоненты
Каждый компонент имеет собственную директорию:

ui/ComponentName/
ComponentName.js
ComponentName.css

## Services
Файлы называются в стиле `entityService.js`:

services/weatherService.js

Содержат:
- обращение к API
- нормализацию данных
- обработку ошибок

## API
Только низкоуровневые fetch-запросы.

api/weather.js

## Stores
Каждый store — отдельный модуль.

stores/weatherStore.js

Store не знает про UI.

## Utils
Только чистые функции.

Примеры:
- formatTemp()
- debounce()
- handleError()