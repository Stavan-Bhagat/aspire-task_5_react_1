import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "../css/signIn-signUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (email === "") {
      setValid(true);
    }
  }, [email]);

  useEffect(() => {
    if (password === "") {
      setValid(true);
    }
  }, [password]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setValid(true);
    } else {
      try {
        const response = await axios.get("http://localhost:3001/users");
        const existingUsers = response.data;
        const authentication = existingUsers.filter((element) => {
          if (email === element.email && password === element.password) {
            return element;
          }
        });
        if (authentication.length < 0) {
          return;
        } else {
          console.log("hello");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  return (
    <>
      <header className="header">
        <h3 className="headerText">Blog app in React </h3>
      </header>
      <div className="container formContainer d-flex align-items-center justify-content-center">
        <Form id="Form" onSubmit={handleSubmit}>
          <h2 className="textSignIn">Sign In</h2>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label className="label" column sm={12}>
              Email
            </Form.Label>
            <Col sm={12}>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label className="label" column sm={12}>
              Password
            </Form.Label>
            <Col sm={12}>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          {valid && <span className="text-danger">Field is empty.</span>}
          <Button className="signIn mt-3" type="submit">
            Sign In
          </Button>{" "}
          <p className="fw-light text-black mt-3">
            Don't have an account? {"  "}
            <Link to="/signUp">Sign Up</Link>
          </p>
        </Form>
      </div>
    </>
  );
}

export default SignIn;
