import React,{useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFirebase } from '../context/Firebase.jsx';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const firebase = useFirebase();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(firebase);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase]);
  
  
  const handleSubmit = async (e) => {
  e.preventDefault();
    firebase.loginUser(email, password);
  }


  return (   
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh" }}
    >
       <h1>Login Page</h1>
       <br />
      <Form style={{ maxWidth: "400px", width: "100%" }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <br />
      <span>Continue with Google?</span>
      <Button variant="outline-primary" className="mt-2" onClick={firebase.loginWithGoogle}>
        Use Google Account
      </Button>
      <br />
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;
