import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../css/register.css";
import { useNavigate } from "react-router-dom";

function Registration({ setIsLoggedIn }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    setSuccessMessage("Form submitted successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const validatePassword = (value) => {
    const password = watch("password");
    return value === password || "Passwords do not match";
  };

  return (
    <>
      <div className="Form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("firstName", { required: "Please enter your first name.", minLength: { value: 3, message: "First name must be at least 3 characters" }, maxLength: { value: 20, message: "First name must be at most 20 characters" } })}
            placeholder="First Name"
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}

          <input
            {...register("email", { required: "Please enter your email", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
            placeholder="Email"
          />
          {errors.email && <p>{errors.email.message}</p>}

          <input
            {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" }, maxLength: { value: 16, message: "Password must be at most 16 characters" } })}
            placeholder="Password"
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}

          <input
            {...register("confirmPwd", { validate: validatePassword })}
            placeholder="Confirm Password"
            type="password"
          />
          {errors.confirmPwd && <p>{errors.confirmPwd.message}</p>}

          <button type="submit">Submit</button>
        </form>
        {successMessage && <p>{successMessage}</p>}
      </div>
    </>
  );
}

export default Registration;
