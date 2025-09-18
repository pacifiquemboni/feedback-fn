import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../redux/slice/category';
import { RootState, AppDispatch } from '../../redux/store';
import logo from '../../assets/expense.svg';
import TransactionModel from '../modal/Transactionmodal';
import CategoryIndex from '../category';

export default function Category() {
  const [isCategory, setCategory] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  // Select categories data, loading, and error from Redux state
  const { data: categories, loading, error } = useSelector(
    (state: RootState) => state.category
  ) as { data: { id: string; name: string }[]; loading: boolean; error: string };

  useEffect(() => {
    // Dispatch the fetchCategory thunk to load categories
    dispatch(fetchCategory());
  }, [dispatch]);

  console.log('Categories:', categories); // Debugging log

  return (
    <div className="bg-white p-6 w-full max-w-3xl mx-auto">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Categories</h2>
        <button
          className="px-4 py-2 border rounded"
          onClick={() => setCategory(true)}
        >
          + create category
        </button>
      </div>

      {/* Display loading, error, or categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {
          categories?.length === 0 ? (
            <p className="text-gray-500 border w-full">No categories found, add one</p>
          ) : (
            Array.isArray(categories) && categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Category icon */}
                <img
                  src={logo}
                  alt={category.name}
                  className="w-16 h-16 object-cover mb-2"
                />
                {/* Category name */}
                <p className="text-sm font-medium text-gray-700">{category.name}</p>
              </div>
            )
            )
          )

        }



      </div>

      {/* Conditional rendering for CategoryIndex */}
      {isCategory && <TransactionModel children={<CategoryIndex/>} onClose={()=>setCategory(false)} />}
    </div>
  );
}
