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

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [buttonClick, setButtonclick] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleButtonClick = () => {
    setButtonclick(true);
    let useremail = email;
    let userpassword = password;

    let data = { email: useremail, password: userpassword };
    login(data);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000";

  const login = async (login_data) => {
    await axios
      .post(`${baseURL}/login`, login_data)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.tokens));

        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error.response.data);
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
                "Log In"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signin;
