import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Register(){
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await register(name, email, password);
      navigate('/shops');
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="container" style={{maxWidth:480}}>
      <div className="card">
        <h2>Create account</h2>
        <form onSubmit={submit} className="grid" style={{gap:12}}>
          <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div className="small" style={{color:'#fca5a5'}}>{error}</div>}
          <button className="btn">Register</button>
          <div className="small">Already have an account? <Link className="link" to="/login">Login</Link></div>
        </form>
      </div>
    </div>
  );
}
