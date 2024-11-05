import { Link } from "react-router-dom"

export function Header() {
    return (
        <header>
            <Link to="/"><h1>NC News</h1></Link>
            <br/>
            <Link to="/"><button>Home</button></Link> 
            <Link to="/users/:id"><button>Profile</button></Link>
        </header>
    )
}