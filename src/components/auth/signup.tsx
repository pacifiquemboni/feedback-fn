import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, reset } from '../../redux/slice/user';
import { AppDispatch } from '../../redux/store';
import { RootState } from '../../redux/store';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleButton from 'react-google-button';

export default function Signup() {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Dob, setDob] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const { loading, success, error } = useSelector((state: RootState) => state.users);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ FirstName,LastName, email, password, Dob }));
  };

  useEffect(() => {
    if (success) {
      toast.success('Registration successful');
      dispatch(reset());
    }
    if (error) {
      toast.error(`Registration error: ${error}`);
      dispatch(reset());
    }
  }, [success, error]);
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3007/auth/google"; // Redirect to backend
  };
  return (
    <div className="flex py-2 items-center w-full justify-center">
      <div className="text-white w-3/4 p-5 h-auto rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className='lg:flex gap-2'>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              FirstName
            </label>
            <input
              type="text"
              id="name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              LastName
            </label>
            <input
              type="text"
              id="lastname"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          </div>
          
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Date of Birth
            </label>
            <input
              type="text"
              id="dob"
              value={Dob}
              onChange={(e) => setDob(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
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
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
              'Registering...' 
              </button> ): (
                <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                Sign Up
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