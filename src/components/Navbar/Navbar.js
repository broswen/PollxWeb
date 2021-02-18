import './Navbar.css';
import NavbarItem from './NavbarItem';


const Navbar = (props) => {


    return (
        <div className="Navbar">
            <div className="wrapper">
                <NavbarItem link={'/'}>New Poll</NavbarItem>
                <NavbarItem link={'/about'}>About</NavbarItem>
            </div>
        </div>
    );
}

export default Navbar;