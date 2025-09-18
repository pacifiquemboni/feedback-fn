import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransaction } from '../../redux/actions/transaction';
import { RootState, AppDispatch } from '../../redux/store';
import TransactionModel from '../modal/Transactionmodal';
import TransactionForm from '../transaction/TransactionForm';

type Transaction = {
    id: string;
    createdAt: string;
    type: string;
    amount: number;
    actions: string; // You can replace 'actions' with specific fields if needed
};

export default function Transaction() {
    const [isTransaction, setTransaction] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [transactionsPerPage] = useState(5); // Number of transactions per page
    const dispatch: AppDispatch = useDispatch();

    // Ensure that transactions is always an array
    const { data: transactions = [], loading, error } = useSelector(
        (state: RootState) => state.transactions
    ) as { data: Transaction[]; loading: boolean; error: string | null };

    useEffect(() => {
        dispatch(fetchTransaction());
    }, [dispatch]);

    // Sort transactions by date (most recent first)
    const sortedTransactions = Array.isArray(transactions) ? [...transactions].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }) : [];

    // Pagination Logic
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = sortedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    // Change Page Handler
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="bg-white p-6 w-full max-w-4xl mx-auto">
            {/* Title */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h2>
                <button onClick={() => setTransaction(true)} className="border bg-white rounded-lg p-2">+ Add Transaction</button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Date</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Type</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Amount</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={4} className="text-center py-4">Loading...</td>
                            </tr>
                        )}
                        {error && (
                            <tr>
                                <td colSpan={4} className="text-center text-red-500 py-4">Error: {error}</td>
                            </tr>
                        )}
                        {
                            !loading && !error && transactions.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-4">No transactions found</td>
                                </tr>
                            )
                        }
                        {currentTransactions.map((transaction, index) => (
                            <tr key={transaction.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} >
                                <td className="px-4 py-2 border-b">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border-b">{transaction.type}</td>
                                <td className="px-4 py-2 border-b">{transaction.amount}</td>
                                <td className="px-4 py-2 border-b">
                                    {/* Actions could be Edit, Delete, or any other action */}
                                    <button onClick={() => {/* Handle edit or delete action */ }} className="text-blue-500">Edit</button>
                                    <button onClick={() => {/* Handle delete action */ }} className="text-red-500 ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 p-2 border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Conditionally render the form/modal only when `isTransaction` is true */}
            {isTransaction && (
                <>
                    <TransactionForm />
                    <TransactionModel children={<TransactionForm />} onClose={() => {
                        setTransaction(false)
                    }} />
                </>
            )}
        </div>
    );
}
