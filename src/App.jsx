import './index.css'
import { Header } from './components/Header'
import { Routes, Route } from 'react-router-dom'
import { Profile } from './components/Profile'
import { Home } from './components/Home'
import { ArticleHandler } from './components/ArticleHandler'
import { SingleArticle } from './components/SingleArticle'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/articles' element={<ArticleHandler/>}/>
        <Route path='/articles/:id' element={<SingleArticle/>}/>
        <Route path='/users/:id' element={<Profile/>}/>
      </Routes>

    </>
  )
}

export default App
