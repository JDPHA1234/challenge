import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { lazy, Suspense } from 'react'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
const Home = lazy(() =>  import('./pages/Home.jsx'))
const Search = lazy(() =>  import('./pages/Search.jsx'))
const Details = lazy(() => import('./pages/Details.jsx'))
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))
const RegisterPage = lazy(() => import('./pages/RegisterPage.jsx'))
const FormPerfil = lazy(() => import('./pages/FormPerfil.jsx'))
const Page404 = lazy(() => import('./pages/404.jsx'))
function App() {
  const location = useLocation()
  const hideHeader = location.pathname === '/login' || location.pathname === '/register'
  const hideFooter = location.pathname === '/login' || location.pathname === '/register'
  return (
    <>
    {!hideHeader ? <Header /> : null}
      <Suspense fallback={<p id='jobs-loading'>Cargando...</p>}>
        <Routes>
        <Route path='/details/:id' element={ <ProtectedRoute>
          <Details/>
        </ProtectedRoute>}/>
        <Route path='/form' element={<FormPerfil/>}/>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<Page404 />} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        </Routes>
      </Suspense>
     {!hideFooter ? <Footer /> : null}
    </>
  )
}

export default App
