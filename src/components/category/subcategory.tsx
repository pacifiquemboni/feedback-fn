import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../redux/slice/category';
import { createSubCategory } from '../../redux/actions/subCategory';
import { RootState, AppDispatch } from '../../redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SubCategoryForm() {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const { data: categories, loading, error } = useSelector((state: RootState) => state.category) as { data: { id: string, name: string }[], loading: boolean, error: string };

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
console.log("category id", category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createSubCategory({ name, category_id: category }))
      .then(() => {
        
        setName('');
        setCategory('');
      })
      .catch(() => {
        
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Add SubCategory</h1>
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
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
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add SubCategory'}
          </button>
        </div>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        <ToastContainer />
      </form>
    </div>
  );
}