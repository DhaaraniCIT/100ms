import logo from '../logo.png';
import '../App.css';

function Header() {
return(
    <nav className="navbar fixed-top navbar-light bg-light p-0">
        <div className="container-fluid">
            <a className="navbar-brand p-0" href="/">
                <img src={logo} alt="" width="150" height="100" className="d-inline-block align-text-top"/>
            </a>
        </div>
    </nav>
)
}

export default Header;