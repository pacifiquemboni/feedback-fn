import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/user';
import { AppDispatch, RootState } from '../../redux/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { reset } from '../../redux/slice/user';
import GoogleButton from 'react-google-button'
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading, success, error } = useSelector((state: RootState) => state.users);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  useEffect(() => {
    if (success) {
      toast.success('Login successful');
      const user = localStorage.getItem('user');
      if (user) {
        console.log(JSON.parse(user).type);
      }

      const userType = user ? JSON.parse(user).type : '';
      setTimeout(() => {
        if (userType === 'admin') {
          navigate('/admin-dashboard');
        } else if (userType === 'renters') {
          navigate('/renters-dashboard');
        } else {
          navigate('/host-dashboard'); // Default dashboard
        }
      }, 2000); // 2-second delay
      dispatch(reset());
    }
    if (error) {
      toast.error(`Login error: ${error}`);
      dispatch(reset());
    }
  }, [success, error, email, navigate, dispatch]);





  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3007/auth/google"; // Redirect to backend
  };

  return (
    <div className="flex items-center p-2 justify-center">
      <div className="text-white p-10 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            {
              loading ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={loading}
                >
                  Logging in...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={loading}
                >
                  Login
                </button>
              )
            }
          </div>
          <div className="flex items-center justify-center mt-4">
            or
          </div>
          <div className="flex items-center justify-center mt-4">

            <GoogleButton
              onClick={() => handleGoogleLogin()}
            />
          </div>
        </form>
      </div>
    </div>
  );
}