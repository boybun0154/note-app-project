import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { useCallback, useEffect, useState } from 'react'
import _ from "lodash";
import { auth } from "../../apis/index";
import { auth as authHelper } from "../../helpers/index";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Hondaiteam
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validate = useCallback(
    (username, email, password) => {
    const errors = {}

    if (!username) {
      errors.username = 'User Name is required'
    } else if (username.length < 5) {
      errors.username = 'User Name must be 5 characters or more'
    }

    if (!email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid'
    }

    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 8) {
      errors.password = 'Password must be 8 characters or more'
    }
    return errors
    },
    []
  )

  useEffect(() => {
    const errors = validate(username, email, password)
    setErrors(errors);
  }, [username, email, password, validate]);

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (Object.keys(errors).length === 0) {
      // submit the form
      const data = new FormData(event.currentTarget);
      const user = {
        username: data.get("username"),
        password: data.get("password"),
        email: data.get("email"),
        avatar: 'https://example.com/avatar5.jpg',
        displayName: data.get("username")
      };
      const responseData = await auth.register(user);
      console.log('responseData: ', responseData);
      if (responseData.acknowledged) {
        // authHelper.setJwtToken(responseData.accessToken)
        navigate('/signin')
      }
    }
  }

  return (
    <Box sx={{
      backgroundImage: 'url("https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.499/trello-left.4f52d13c.svg"), url("https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.499/trello-right.3ee60d6f.svg")',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'left bottom, right bottom',
      backgroundSize: 'calc(((100vw - 400px) / 2) - 32px), calc(((100vw - 400px) / 2) - 32px)'
    }}>
      <Container maxWidth="xs">
        <Paper
          square={false}
          elevation={3}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 4
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                disabled={!_.isEqual(errors, {})}
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#0052CC',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#3742fa',
                    boxShadow: 'none'
                  }
                }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Paper>
      </Container>
    </Box>
  )
}
