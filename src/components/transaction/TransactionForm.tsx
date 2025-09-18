import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../redux/slice/category';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchSubCategory } from '../../redux/actions/subCategory';
import { addTransaction } from '../../redux/actions/transaction';
import 'react-toastify/dist/ReactToastify.css';

export default function TransactionForm() {
  const [account, setAccount] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const { data: categories, loading: categoryLoading, error: categoryError } = useSelector(
    (state: RootState) => state.category
  ) as { data: { id: string; name: string }[], loading: boolean, error: string };
  const { subData: subCategoryData, loading: subCategoryLoading, error: subCategoryError } = useSelector(
    (state: RootState) => state.subCategory
  ) as { subData: { id: string; name: string }[], loading: boolean, error: string };

  const {  loading: transactionLoading, error: transactionError } = useSelector(
    (state: RootState) => state.transactions
  ) as { data: any; loading: boolean; error: string };

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      dispatch(fetchSubCategory({ categoryId: category })); // Fetch subCategoryData based on selected category
    }
  }, [category, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTransaction({ account, type, amount: parseFloat(amount), category_id: category, sub_category_id: subCategory, description }))
      .then(() => {
        
        resetForm();
      })
      .catch(() => {
        
      });
  };
  const resetForm = () => {
    setAccount('');
    setType('');
    setAmount('');
    setCategory('');
    setSubCategory('');
    setDescription('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">CREATE A PROPERTY</h1>
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full lg:w-1/2 px-2">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="account">
                Account
              </label>
              <select
                id="account"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Account</option>
                <option value="Mobile Money">Mobile Money</option>
                <option value="Bank">Bank</option>
                <option value="Cash">Cash</option>
              </select>
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
          </div>
          <div className="w-full lg:w-1/2 px-2">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  const selectedCategoryId = e.target.value;
                  setCategory(selectedCategoryId);
                  setSubCategory(''); // Reset subCategory when category changes
                  if (selectedCategoryId) {
                    localStorage.setItem('selectedCategoryId', selectedCategoryId);
                    dispatch(fetchSubCategory({ categoryId: category }));
                  }
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Category</option>
                {Array.isArray(categories) && categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subCategory">
                Sub Category
              </label>
              <select
                id="subCategory"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Sub Category</option>
                {Array.isArray(subCategoryData) && subCategoryData.map((subCat) => (
                  <option key={subCat.id} value={subCat.id}>
                    {subCat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={categoryLoading || subCategoryLoading || transactionLoading}
          >
            {transactionLoading ? 'Submitting...' : 'Add Transaction'}
          </button>
        </div>
        {categoryError && <p className="text-red-500 text-xs italic mt-4">{categoryError}</p>}
        {subCategoryError && <p className="text-red-500 text-xs italic mt-4">{subCategoryError}</p>}
        {transactionError && <p className="text-red-500 text-xs italic mt-4">{transactionError}</p>}
      </form>
    </div>
  );
}
