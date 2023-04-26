import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, Avatar } from "@mui/material";
import logo from "../assets/images/ratlogo.png";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Authform() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [buttonClick, setButtonclick] = useState(false);
  const handleButtonClick = () => {
    setButtonclick(true);

    let username = `${firstName} ${lastName}`;
    let useremail = email;
    let userpassword = password;
    const register_data = {
      name: username,
      email: useremail,
      password: userpassword,
    };
    signup(register_data);
  };
  const navigate = useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const baseURL = "http://127.0.0.1:8000";

  const signup = async (register_data) => {
    await axios
      .post(`${baseURL}/register`, register_data)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.tokens));

        navigate("/dashboard");
      })
      .catch((error) => {
        setButtonclick(false);
        toast.error(`${error.response.data.errors[0]}`);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "greenyellow",
        height: "100vh",
      }}
    >
      <Card
        style={{
          width: "fit-content",
          marginRight: "20px",
          marginLeft: "20px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar src={logo} style={{ width: "80px", height: "80px" }} />
        </div>

        <CardContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="filled"
                label="First Name"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "greenyellow",
                    },
                  },
                }}
                onChange={(e) => setfirstName(e.target.value)}
              />
              <TextField
                id="filled"
                label="Last Name"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "greenyellow",
                    },
                  },
                }}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="filled"
                label="Email"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "greenyellow",
                    },
                  },
                }}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormControl
                sx={{
                  m: 1,
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "greenyellow",
                    },
                  },
                }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>

            <Button
              sx={{ m: 1, width: "100%" }}
              variant="contained"
              size="large"
              style={{
                backgroundColor: "greenyellow",
                color: "black",
                fontWeight: "700",
              }}
              onClick={handleButtonClick}
            >
              {buttonClick ? (
                <CircularProgress style={{ color: "white" }} size="25px" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default Authform;
