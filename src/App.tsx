import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header.js'
import { Footer } from './components/Footer.js'
import { lazy, Suspense } from 'react'
import { ProtectedRoute } from './components/ProtectedRoute.js'
const Home = lazy(() =>  import('./pages/Home.js'))
const Search = lazy(() =>  import('./pages/Search.js'))
const Details = lazy(() => import('./pages/Details.js'))
const LoginPage = lazy(() => import('./pages/LoginPage.js'))
const RegisterPage = lazy(() => import('./pages/RegisterPage.js'))
const FormPerfil = lazy(() => import('./pages/FormPerfil.js'))
const Empresa = lazy(() => import('./pages/Empresa.js'))
const Mycandidacies = lazy(() => import('./pages/Mycandidacies.js'))
const Page404 = lazy(() => import('./pages/404.js'))
const EmpresasPage = lazy(() => import('./pages/EmpresasPage.js'))

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
        <Route path='/companie/:id' element={<Empresa/>}/>
        <Route path='/companies' element={<EmpresasPage/>}/>
        <Route path='/my-candidacies' element={<ProtectedRoute><Mycandidacies/></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute><FormPerfil/></ProtectedRoute>}/>
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
