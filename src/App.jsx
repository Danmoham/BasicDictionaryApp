import { useState } from 'react'
import { Header } from './Header'
import {Route,Routes} from 'react-router-dom'
import { Answer } from './components/Answer'
import { InitialPage } from './components/InitialPage'
import { ErrorPage } from './components/ErrorPage'
function App() {
  const [finalWord,setFinalWord] = useState({})
  return (
    <div>
    <div>
    <Header />
    </div>
    <Routes>
<Route path='/' element={<InitialPage setFinalWord={setFinalWord}/>}/>
<Route path='/answer' element={<Answer setFinalWord={setFinalWord} finalWord={finalWord}/>} />
<Route path='/*' element={<ErrorPage/>} />
    </Routes>
    </div>
  )
}

export default App
