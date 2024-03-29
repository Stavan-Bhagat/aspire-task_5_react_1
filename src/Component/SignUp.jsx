import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import "../css/signIn-signUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import CryptoJS from "crypto-js";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ name, email, role, password }) => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      const existingUsers = response.data;
  
      const emailExists = existingUsers.find(
        (user) => user.email === email
      );
      if (emailExists) {
        return alert("Email already exists");
      }
  
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        "secret key"
      ).toString();
  
      const formData = {
        name,
        email,
        role,
        password: encryptedPassword
      };
  
      const responsePost = await axios.post(
        "http://localhost:3001/users",
        formData
      );
      console.log("Data successfully posted:", responsePost.data);
  
      navigate("/");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  
  const watchPassword = watch("password", "");

  return (
    <>
      <header className="header">
        <h3 className="headerText">Blog app in React </h3>
      </header>
      <div className="container d-flex align-items-center justify-content-center">
        <Form id="Form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="textSignIn">Sign Up</h2>
          <Form.Group className="mb-2" controlId="formGridAddress1">
            <Form.Label className="label">Name</Form.Label>
            <Form.Control
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-danger">Name is required</span>
            )}
          </Form.Group>
          <Form.Group controlId="formGridEmail">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              })}
            />
            {errors.email && (
              <span className="text-danger">Enter a valid email</span>
            )}
          </Form.Group>
          <Form.Group as={Col} className="mb-2" controlId="formGridState">
            <Form.Label className="label">Role</Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...register("role", { required: true })}
            >
              <option disabled selected value="">
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
            {errors.role && <span className="text-danger">Select a role</span>}
          </Form.Group>
          <Form.Group controlId="formGridPassword" className="mb-2">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && (
              <span className="text-danger">
                Password should be at least 8 characters long
              </span>
            )}
          </Form.Group>
          <Form.Group controlId="formGridConfirmPassword" className="mb-3">
            <Form.Label className="label">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === watchPassword || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-danger">
                {errors.confirmPassword.message}
              </span>
            )}
          </Form.Group>
          <Button variant="primary" className="w-100" type="submit">
            Submit
          </Button>
          <p className="fw-light text-black mt-2">
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </Form>
      </div>
    </>
  );
}

export default SignUp;
