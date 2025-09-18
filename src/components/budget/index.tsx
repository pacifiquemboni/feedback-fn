import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBudget } from '../../redux/actions/budget';
import { fetchCategory } from '../../redux/slice/category';
import { RootState, AppDispatch } from '../../redux/store';
import 'react-toastify/dist/ReactToastify.css';

export default function BudgetForm() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.budget);
  const { data: categories, loading: categoryLoading, error: categoryError } = useSelector((state: RootState) => state.category) as { data: { id: string; name: string }[]; loading: boolean; error: string | null };

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createBudget({  amount: parseFloat(amount), category_id:category, start_date: startDate, end_date: endDate }))
      .then(() => {
        
        setAmount('');
        setCategory('');
        setStartDate('');
        setEndDate('');
      })
      .catch(() => {
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Create Budget</h1>
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md">
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading || categoryLoading}
          >
            {loading || categoryLoading ? 'Submitting...' : 'Create Budget'}
          </button>
        </div>
        {categoryError && <p className="text-red-500 text-xs italic mt-4">{categoryError}</p>}
        
      </form>
    </div>
  );
}