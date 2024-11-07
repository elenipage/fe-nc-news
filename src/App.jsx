import './index.css'
import { Header } from './components/Header'
import { Routes, Route } from 'react-router-dom'
import { Profile } from './components/Profile'
import { Home } from './components/Home'
import { ArticleHandler } from './components/articles/ArticleHandler'
import { SingleArticle } from './components/articles/SingleArticle'
import { useUser } from './components/UserContext'
import { Login } from './components/Login'


function App() {
  const { username , setUsername } = useUser()

  return (
    <>
    <Header username={username}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/articles' element={<ArticleHandler/>}/>
        <Route path='/articles/:id' element={<SingleArticle/>}/>
        <Route path='/users/:username' element={<Profile username={username}/>}/>
        <Route path='/login' element={<Login username={username}/>}/>
      </Routes>
    </>
    
  )
}

export default App
