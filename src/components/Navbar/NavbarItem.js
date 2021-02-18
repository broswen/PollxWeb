import { Link } from 'react-router-dom';
import './Navbar.css';


const NavbarItem = (props) => {


    return (
        <Link className="NavbarItem" to={{ pathname: props.link }}>
            <div >
                {props.children}
            </div>
        </Link>
    );
}

export default NavbarItem;