import Nav from 'react-bootstrap/Nav';
import '../components/Navbar.css'
import logo from '../components/Images/logo.jpg'; // Replace './logo.png' with the actual path to your logo image
export function Navbar() {
  return (
   

   
    
    <Nav className='nav fixed-top' justify variant="tabs" defaultActiveKey="/">
    <Nav.Item>
        <Nav.Link href="/" style={{ fontFamily: 'Cambria', fontSize: '20px', color: '#333' }}>
            <img src={logo} alt="Fresh Eats Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
            Fresh Eats
        </Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link href='/about' eventKey="link-1" style={{ fontFamily: 'Cambria', fontSize: '20px', color: '#333', }}>About Us</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link href='/contact' eventKey="link-2" style={{ fontFamily: 'Cambria', fontSize: '20px', color: '#333' }}>Contact</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link href='/register' eventKey="link-3" style={{ fontFamily: 'Cambria', fontSize: '20px', color: '#333' }}>Sign in</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link href='/rating' eventKey="link-4" style={{ fontFamily: 'Cambria', fontSize: '20px', color: '#333' }}>Rate us</Nav.Link>
    </Nav.Item>
</Nav>
    
  );
}

export default Navbar;