import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import 'bootstrap/dist/css/bootstrap.min.css';

interface HeaderProps {
  bgColor?: string;
  textColor?: string;
}
const Header: React.FC<HeaderProps> = () => {
  // Utils
  const navigate = useNavigate();
  const isLoggedIn: boolean = useIsLoggedIn();

  // Handlers
  function onLogOut() {
    window.localStorage.removeItem('isLoggedIn');
    navigate('/');
  }

  // Render
  return (
      <Navbar expand="lg" className="bg-body-tertiary" variant = "danger" bg="dark" >
      <Container>
        <Navbar.Brand as={Link} to="/">Vite + React + TS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/componentes">Componentes</Nav.Link>
            <Nav.Link as={Link} to="/administracion">Administracion</Nav.Link>
            {isLoggedIn && <Nav.Link onClick={onLogOut}>Log Out</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
      
      {/* Busqueda */}

      {/* <Form>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form> */}
    </Navbar>
  )
};

export default Header;