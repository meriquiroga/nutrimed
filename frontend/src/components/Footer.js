import {NavLink} from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div>
               <img src='/assets/instagram.png' alt=""/>
               <img src='/assets/facebook.png' alt=""/>
               <img src='/assets/twitter.png' alt=""/>
               <img src='/assets/linkedin.png' alt=""/>
            </div>
            <div className="footerNavbar">
                <ul>
                    <li>
                    <NavLink exact to="/"><p>HOME</p></NavLink>
                    </li>
                    <li>
                    <NavLink to="/signup"><p>CREAR CUENTA</p></NavLink>
                    </li>
                    <li>
                    <NavLink to="/"><p>INGRESAR</p></NavLink>
                    </li>
                </ul>
            </div>
            <p>© Copyright 2021 | NutriMed. </p>
        </footer>
    )
}

export default Footer