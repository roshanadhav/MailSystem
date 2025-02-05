import  { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios'; // Import axios

const LoginSignupDialog = ({ showDialog, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(''); // State to store error messages

  // Handle Sign In request
  const handleSignIn = async () => {
    if (username && password) {
      try {
        const response = await axios.post('http://localhost:8080/api/signin', { username, password } , { withCredentials: true });
        if (response.status == 200 ) {
          setError('');
          onClose(); // Close the form on successful login
        } else {
          setError('Invalid credentials.');
        }
      } catch (error) {
        setError('Error signing in.');
      }
    } else {
      setError('Please fill in both username and password');
    }
  };

  // Handle Sign Up request
  const handleSignUp = async () => {
    if (username && password && confirmPassword && name) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post('http://localhost:8080/api/signup', { username, password, name }, { withCredentials: true });
          if (response.data.success) {
            setError('');
            onClose(); // Close the form on successful signup
          } else {
            setError('Failed to sign up.');
          }
        } catch (error) {
          setError('Error signing up.');
        }
      } else {
        setError('Passwords do not match.');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  if (!showDialog) return null;

  return (
    <Dialog open={showDialog} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{isSignUp ? 'Sign Up' : 'Sign In'}</DialogTitle>
      <DialogContent>
        {isSignUp ? (
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            <Button
              variant="contained"
              onClick={handleSignUp}
              fullWidth
              style={{ backgroundColor: '#1565c0', color: '#ffffff' }}
            >
              Sign Up
            </Button>
            <Typography onClick={() => setIsSignUp(false)} style={{ cursor: 'pointer', textAlign: 'center' }}>
              Already have an account? Sign In
            </Typography>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            <Button
              variant="contained"
              onClick={handleSignIn}
              fullWidth
              style={{ backgroundColor: '#1565c0', color: '#ffffff' }}
            >
              Sign In
            </Button>
            <Typography onClick={() => setIsSignUp(true)} style={{ cursor: 'pointer', textAlign: 'center' }}>
              Don't have an account? Sign Up
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginSignupDialog;
