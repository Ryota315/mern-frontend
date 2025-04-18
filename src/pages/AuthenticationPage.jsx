import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LightPurpleButton } from '../utils/buttonStyles';
import { authUser } from '../redux/userHandle';
import styled from 'styled-components';
import Popup from '../components/Popup';

const AuthenticationPage = ({ mode, role }) => {
    const bgpic = "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);
    
    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!email || !password) {
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        if (mode === "Register") {
            const name = event.target.userName.value;
            if (!name) {
                setUserNameError(true);
                return;
            }
            
            if (role === "Customer") {
                const customerFields = { name, email, password, role };
                dispatch(authUser(customerFields, role, mode));
            }
        } else if (mode === "Login") {
            const fields = { email, password };
            dispatch(authUser(fields, role, mode));
        }
        setLoader(true);
    };
    
    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'userName') setUserNameError(false);
    };
    
    useEffect(() => {
        if (status === 'success' && currentRole !== null) {
            navigate('/');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setLoader(false);
            setMessage("Network Error");
            setShowPopup(true);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);
    
    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <StyledTypography>{role} {mode}</StyledTypography>
                        {role === "Customer" && mode === "Register" && (
                            <Typography variant="h7">Register now to explore and buy products.</Typography>
                        )}
                        {mode === "Login" && (
                            <Typography variant="h7">Welcome back! Please enter your details</Typography>
                        )}
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            {mode === "Register" && (
                                <TextField margin="normal" required fullWidth id="userName" label="Enter your name" name="userName" autoComplete="name" autoFocus variant="standard" error={userNameError} helperText={userNameError && 'Name is required'} onChange={handleInputChange} />
                            )}
                            <TextField margin="normal" required fullWidth id="email" label="Enter your email" name="email" autoComplete="email" variant="standard" error={emailError} helperText={emailError && 'Email is required'} onChange={handleInputChange} />
                            <TextField margin="normal" required fullWidth name="password" label="Password" type={toggle ? 'text' : 'password'} id="password" autoComplete="current-password" variant="standard" error={passwordError} helperText={passwordError && 'Password is required'} onChange={handleInputChange} InputProps={{ endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setToggle(!toggle)}>{toggle ? (<Visibility />) : (<VisibilityOff />)}</IconButton></InputAdornment>), }} />
                            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                            </Grid>
                            <LightPurpleButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>{loader ? <CircularProgress size={24} color="inherit" /> : mode}</LightPurpleButton>
                            <Grid container>
                                <Grid>{mode === "Register" ? "Already have an account?" : "Don't have an account?"}</Grid>
                                <Grid item sx={{ ml: 2 }}>
                                    {mode === "Register" ? (
                                        <StyledLink to={`/${role}login`}>Log in</StyledLink>
                                    ) : (
                                        role === "Customer" && <StyledLink to={`/${role}register`}>Sign up</StyledLink>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: `url(${bgpic})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
}

export default AuthenticationPage;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;

const StyledTypography = styled.h4`
    margin: 0;
    font-weight: 400;
    font-size: 2.125rem;
    line-height: 1.235;
    letter-spacing: 0.00735em;
    color: #2c2143;
    margin-bottom: 16px;
`;
