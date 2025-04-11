import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Sign Up</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required style={styles.input} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
          <select name="role" onChange={handleChange} value={formData.role} style={styles.input}>
            <option value="user">User</option>
            <option value="storeowner">Store Owner</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={styles.button}>Signup</button>
        </form>
        <p>Already have an account? 
          <span style={styles.link} onClick={() => navigate('/login')}> Login here</span>
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
    width: '320px',
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
    backgroundColor: '#10b981',
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

export default Signup;
