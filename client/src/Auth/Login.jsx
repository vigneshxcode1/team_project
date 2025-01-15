import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";



const BASE_URL = "http://localhost:5000";

const  Login =  ()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    try{
    e.preventDefault();

      const response = await axios.post(`${BASE_URL}/api/study/login`, { email, password })
     
     
        if (response) {
            console.log(response.data)
          localStorage.setItem("token-login", response.data.token);
        
         if (response) {
            navigate("/");
          } else {
            navigate("/register");
          }
        } else {
          setError(response.data.message);
         
        }
    }catch(err) {
        setError(errorMessage);
      };
  };



  return (
    <div className="container mt-5">
    
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <p className="login-title">Login Portal</p>
            </div>
            <div className="card-body">
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                {error && <p className="text-danger">{error}</p>}
                <Button variant="primary" type="submit">
                  LOGIN
                </Button>
              </Form>

              <br />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
