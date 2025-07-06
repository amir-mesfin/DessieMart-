import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './component/dataProvider/DataProvider.jsx'
import { initialSate,reducer } from './utility/reducer.js'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DataProvider reducer={reducer}  initialSate={initialSate}  >
            <App />
        </DataProvider>
    </StrictMode>
)
