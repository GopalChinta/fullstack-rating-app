import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (res.data.user.role === "storeowner") {
        navigate("/store-dashboard");
      } else {
        navigate("/user-dashboard");
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p>Don't have an account? 
          <span style={styles.link} onClick={() => navigate('/signup')}> Sign up here</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f3f4f6',
  },
  card: {
    background: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '300px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  link: {
    color: '#3b82f6',
    cursor: 'pointer',
    marginLeft: '5px',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
};

export default Login;
