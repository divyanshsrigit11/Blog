import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

import logo from '../../assets/logo.png';
const loginInitialValues = { username: '', password: '' };
const signupInitialValues = { name: '', username: '', password: '' };

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    // Using a cleaner logo or your brand name
    const imageURL = logo;

    useEffect(() => {
        showError('');
    }, [login, signup, account]);

    const onValueChange = (e) => setLogin({ ...login, [e.target.name]: e.target.value });
    const onInputChange = (e) => setSignup({ ...signup, [e.target.name]: e.target.value });

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            isUserAuthenticated(true);
            navigate('/');
        } else {
            showError('Invalid credentials. Please try again.');
        }
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong. Please try again later.');
        }
    }

    return (
        <Box className="auth-container">
            <Box sx={{ pt: 5, textAlign: 'center' }}>
                {/* Now it will load instantly from your own code */}
                <img src={imageURL} alt="logo" style={{ width: 100 }} />
                <Typography className="auth-title">
                    {account === 'login' ? 'Welcome Back' : 'Join the Community'}
                </Typography>
            </Box>

            {account === 'login' ? (
                <Box className="auth-wrapper">
                    <TextField variant="outlined" fullWidth value={login.username} onChange={onValueChange} name='username' label='Username' />
                    <TextField variant="outlined" fullWidth type="password" value={login.password} onChange={onValueChange} name='password' label='Password' />
                    
                    {error && <Typography sx={{ color: '#ef4444', fontSize: '13px', textAlign: 'center' }}>{error}</Typography>}

                    <Button className="btn-primary" onClick={loginUser}>Login</Button>
                    <Typography sx={{ textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>OR</Typography>
                    <Button className="btn-secondary" onClick={() => toggleAccount('signup')}>Create an account</Button>
                </Box>
            ) : (
                <Box className="auth-wrapper">
                    <TextField variant="outlined" fullWidth onChange={onInputChange} name='name' label='Name' />
                    <TextField variant="outlined" fullWidth onChange={onInputChange} name='username' label='Username' />
                    <TextField variant="outlined" fullWidth type="password" onChange={onInputChange} name='password' label='Password' />

                    {error && <Typography sx={{ color: '#ef4444', fontSize: '13px', textAlign: 'center' }}>{error}</Typography>}

                    <Button className="btn-primary" onClick={signupUser}>Signup</Button>
                    <Typography sx={{ textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>OR</Typography>
                    <Button className="btn-secondary" onClick={() => toggleAccount('login')}>Already have an account</Button>
                </Box>
            )}
        </Box>
    );
};

export default Login;