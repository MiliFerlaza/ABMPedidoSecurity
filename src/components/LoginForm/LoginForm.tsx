import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput, MDBCheckbox }
    from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { Login } from "../../types/Login";
import { AuthService } from '../../services/AuthService';
import './LoginForm.css'


function LoginForm() {

    const navigate = useNavigate();

    let Login = {
        username: "admin",
        password: "admin",
    } as Login;

    function onLogIn() {
        try {
            AuthService.login(Login);
            window.localStorage.setItem('isLoggedIn', 'true');
            navigate('/')
        } catch (Error) {
            console.error("Hay un error");
        }
    }

    return (


        <MDBContainer className="login-container">
            <MDBRow className="justify-content-center">
                <MDBCol >
                    <div className="login-box">
                        <form>
                            <h2>Login</h2>
                            <MDBInput label="Username" type="text" />
                            <MDBInput label="Password" type="password" />
                            <div className="d-flex justify-content-between mx-4 mb-4">
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Recuerdame' />
                                <a href="!#">Olvidaste tu contraseña?</a>
                            </div>

                            <MDBBtn style={{ backgroundColor: 'orange', borderColor: 'white' }} onClick={onLogIn}>
                                Login
                            </MDBBtn>
                        </form>
                    </div>

                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default LoginForm;