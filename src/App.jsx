import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { Spinner } from './components/Spinner.jsx'
const Home = lazy(() =>  import('./pages/Home.jsx'))
const Search = lazy(() =>  import('./pages/Search.jsx'))
const Details = lazy(() => import('./pages/Details.jsx'))
function App() {

  return (
    <>
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/details/:id' element={<Details/>} />
        <Route path='/search' element={<Search />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Suspense>

    </>
  )
}

export default App
