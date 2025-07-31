import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import React, { useState } from 'react';
export default function LoginModal({ close }) {
  const { login } = useAuth();
  const [phone,setPhone]=useState(''),[password,setPassword]=useState(''),[err,setErr]=useState('');
  const s=async e=>{
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { phone, password });
      console.log(data); 
      login(data.user,data.token); close();
    } catch { setErr('Invalid credentials'); }
  };
  return (
    <div className="modal show d-block"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5>Login</h5><button className="btn-close" onClick={close}/></div>
      <form className="modal-body" onSubmit={s}>
        <input type="text" className="form-control mb-2" placeholder="Phone" required value={phone} onChange={e=>setPhone(e.target.value)}/>
        <input type="password" className="form-control mb-2" placeholder="Password" required value={password} onChange={e=>setPassword(e.target.value)}/>
        {err && <div className="text-danger mb-2">{err}</div>}
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div></div></div>
  );
}
