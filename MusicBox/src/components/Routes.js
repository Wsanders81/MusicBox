import { Routes, Route} from 'react-router-dom'
import Home from './Home'
import About from './About'
export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/"  element={<Home/>}/>
            <Route path="artist/:artistName"  element={<About/>}/>
            <Route path ="*" element={<Home/>}/>
        </Routes>
    )
}