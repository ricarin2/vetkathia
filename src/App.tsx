import { useEffect } from 'react'

import { getTrafficAttribution } from './lib/trafficAttribution'
import { AppRouter } from './routes/AppRouter'

function App() {
  useEffect(() => {
    getTrafficAttribution()
  }, [])

  return <AppRouter />
}

export default App
