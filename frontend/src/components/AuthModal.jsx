import React, { useState } from 'react';
import API from '../api';

const AuthModal = ({ closeModal, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', phone: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? '/auth/login' : '/auth/signup';
      const payload = isLogin
        ? { phone: form.phone, password: form.password }
        : form;

      const res = await API.post(url, payload);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      closeModal();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">{isLogin ? 'Login' : 'Signup'}</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            {!isLogin && (
              <div className="mb-3">
                <label>Name</label>
                <input className="form-control" name="name" onChange={handleChange} required />
              </div>
            )}
            <div className="mb-3">
              <label>Phone</label>
              <input className="form-control" name="phone" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control" name="password" onChange={handleChange} required />
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              {isLogin ? 'Login' : 'Signup'}
            </button>
            <button type="button" className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
