import React, { useEffect, useState } from "react";
import loginImage from "../assets/login.svg";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, googleLogin } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";

const Signup = () => {
  const { handleSubmit, register, control } = useForm();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const { isError, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
  }, [isError, error]);

  const onSubmit = (data) => {
    dispatch(createUser({ email: data.email, password: data.password }));
  };

  return (
    <div className="flex h-screen items-center pt-14">
      
    </div>
  );
};

export default Signup;
