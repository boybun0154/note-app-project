import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { auth } from "../../apis/index";
import { auth as authHelper } from "../../helpers/index";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Hondaiteam
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = useCallback((username, password) => {
    const errors = {};

    if (!username) {
      errors.username = "Username is required";
    } else if (username.length < 5) {
      errors.username = "Username must be 5 characters or more";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be 8 characters or more";
    }

    return errors;
  }, []);

  useEffect(() => {
    const errors = validate(username, password);
    setErrors(errors);
  }, [username, password, validate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      // submit the form
      const data = new FormData(event.currentTarget);
      const user = {
        username: data.get("username"),
        password: data.get("password"),
      };
      const responseData = await auth.login(user);
      const tempBoardId = "654f462cbae839768f802f92";
      if (responseData.isSuccess) {
        authHelper.setJwtToken(responseData.accessToken);
        authHelper.setCurrentUserId(responseData.id);
        navigate(`/boards/${tempBoardId}`);
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundImage:
          'url("https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.499/trello-left.4f52d13c.svg"), url("https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.499/trello-right.3ee60d6f.svg")',
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "left bottom, right bottom",
        backgroundSize:
          "calc(((100vw - 400px) / 2) - 32px), calc(((100vw - 400px) / 2) - 32px)",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          square={false}
          elevation={3}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            noValidate
            autoComplete="off"
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              disabled={!_.isEqual(errors, {})}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#0052CC",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#3742fa",
                  boxShadow: "none",
                },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Paper>
      </Container>
    </Box>
  );
}
