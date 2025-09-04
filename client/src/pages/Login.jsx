import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(){
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
      navigate('/shops');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container" style={{maxWidth:480}}>
      <div className="card">
        <h2>Welcome back</h2>
        <form onSubmit={submit} className="grid" style={{gap:12}}>
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div className="small" style={{color:'#fca5a5'}}>{error}</div>}
          <button className="btn">Login</button>
          <div className="small">No account? <Link className="link" to="/register">Register</Link></div>
        </form>
      </div>
    </div>
  );
}
