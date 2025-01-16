import { Link, Outlet } from "react-router-dom";

export default function Header(){
  return (
    <>
    <header>
      <h1>Which Element Are You?</h1>
      <p>(based on completely random things)</p>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
      </nav>
    </header>
    
    <Outlet />
    </>
  )
}