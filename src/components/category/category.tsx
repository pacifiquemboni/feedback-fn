import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, registerCategory } from '../../redux/slice/category';
import { RootState, AppDispatch } from '../../redux/store';
import 'react-toastify/dist/ReactToastify.css';

export default function Category() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerCategory({ name, type }))
      .then(() => {
        
        setName('');
        setType('');
        dispatch(fetchCategory());
      })
      .catch(() => {
        
      });
  };

  return (
    <><div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Add Category</h1>
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Category'}
          </button>
        </div>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        
      </form>
    </div>
    </>
    
  );
}