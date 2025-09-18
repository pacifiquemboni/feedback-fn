import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBudgets } from '../../redux/actions/budget';
import { RootState, AppDispatch } from '../../redux/store';
import BudgetForm from '../budget';
import TransactionModel from '../modal/Transactionmodal';

interface Budget {
  id: string;
  name: string;
  amount: number;
  category_id: string;
  status: string;
  start_date: string;
  end_date: string;
}

const BudgetItem: React.FC<{ budget: Budget }> = ({ budget }) => (
  <div className="mt-2 border-b pb-2">
    <p className="text-gray-700 font-medium">{budget.name}</p>
    <p className="text-gray-500">Amount: {budget.amount}</p>
    <p className="text-gray-500">Category: {budget.category_id}</p>
    <p className="text-gray-500">Status: {budget.status}</p>
  </div>
);

export default function BudgetVsExpense() {
  const [isBudget, setBudget] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { data: budgets = [], loading, error } = useSelector((state: RootState) => state.budget) as {
    data: Budget[];
    loading: boolean;
    error: string;
  };

  useEffect(() => {
    dispatch(fetchBudgets());
  }, [dispatch]);

  const activeBudgets = Array.isArray(budgets)
    ? budgets.filter(budget => budget.status === 'active')
    : [];
console.log("budget data:", budgets);

  const startDate = activeBudgets.length
    ? new Date(activeBudgets[0].start_date).toLocaleDateString()
    : 'N/A';
  const endDate = activeBudgets.length
    ? new Date(activeBudgets[0].end_date).toLocaleDateString()
    : 'N/A';

  const progress = 71; // Dynamically calculate this based on budget usage
  const remainingDays = 9; // Dynamically calculate remaining days based on the end_date

  return (
    <div className="bg-white p-6 rounded-lg text-center w-full lg:w-1/3 mx-auto">
      <h2 className="text-lg font-bold text-gray-800">Budget Vs Expense</h2>
      <p className="text-sm text-gray-500">From {startDate} - {endDate}</p>

      <div className="mt-2 py-2">
        <p className="text-gray-600 font-semibold">{progress}% Completed</p>
        <div className="relative mt-2 h-4 bg-gray-200 rounded-lg">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">Remaining: {remainingDays} Days</p>
      </div>

      <div className="mt-4">
        {loading && <p>Loading budgets...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && activeBudgets.length === 0 && (
          <p className="text-gray-500">No active budgets available</p>
        )}
        {!loading && !error && activeBudgets.map(budget => (
          <BudgetItem key={budget.id} budget={budget} />
        ))}
      </div>

      <button
        onClick={() => setBudget(true)}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        + Add Budget
      </button>

      {isBudget && <BudgetForm />}
      {isBudget && <TransactionModel onClose={() => setBudget(false)} children={<BudgetForm />} />}
    </div>
  );
}
