import BudgetVsExpense from "../components/dashboard/budget";
import Category from "../components/dashboard/category";
import ExpenseDistribution from "../components/dashboard/expense";
import Profile from "../components/dashboard/Profile";
import bgImage from '../assets/bg.jpg';
import { useEffect, useState } from "react";
import TransactionModel from "../components/modal/Transactionmodal";
import TransactionForm from "../components/transaction/TransactionForm";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { adminUpdateProperty, deleteProperty, fetchAdminProperty } from "../redux/actions/property";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function AdminDashBoard() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isTransaction, setTransaction] = useState(false);
    const [properties, setProperties] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const adminData = useSelector((state: RootState) => state.property.adminData);

    useEffect(() => {
        dispatch(fetchAdminProperty());
    }, [dispatch]);

    useEffect(() => {
        if (adminData) {
            // Sort properties by createdAt date in descending order (newest first)
            const sortedProperties = [...adminData].sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setProperties(sortedProperties);
        }
    }, [adminData]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProperties = properties.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(properties.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const handleConfirm = (propertyId: string) => {
        // Dispatch an action or make an API request to confirm the property
        dispatch(adminUpdateProperty(propertyId));
        console.log(`Confirming property: ${propertyId}`);
    };
    
    const handleCancel = (propertyId: string) => {
        // Dispatch an action or make an API request to cancel the property
        dispatch(deleteProperty(propertyId));

        console.log(`Cancelling property: ${propertyId}`);
    };

  
    return (
        <div className="min-h-screen bg-gray-100" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="lg:p-5">
                <div className="flex mx-5 lg:mx-0 justify-between items-center">
                    <h1 className="hidden lg:block text-3xl font-bold mb-4 text-white">Admin Dashboard</h1>
                </div>

                <div className="flex flex-col p-2 rounded-lg">
                    <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg">
                        <Profile />
                    </div>

                    {/* Properties Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-700">Total Properties</h3>
                            <p className="text-2xl font-bold text-blue-600">{properties.length}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-700">Available Properties</h3>
                            <p className="text-2xl font-bold text-green-600">
                                {properties.filter(p => p.status.toLowerCase() === 'available').length}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-700">Booked Properties</h3>
                            <p className="text-2xl font-bold text-orange-600">
                                {properties.filter(p => p.status.toLowerCase() === 'booked').length}
                            </p>
                        </div>
                    </div>

                    {/* Properties Table */}
                    <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">All Properties</h2>
                        <div className="overflow-x-auto">
                            {properties.length > 0 ? (
                                <>
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border p-2 text-left">Property</th>
                                                <th className="border p-2 text-left">Created At</th>
                                                <th className="border p-2 text-left">Description</th>
                                                <th className="border p-2 text-left">Price</th>
                                                <th className="border p-2 text-left">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentProperties.map((property) => (
                                                <tr key={property.id} className="border hover:bg-gray-50">
                                                    <td className="border p-2">
                                                        <div className="flex items-center space-x-3">
                                                            {property.pictures?.length > 0 && (
                                                                <img
                                                                    src={property.pictures[0]}
                                                                    alt="Property"
                                                                    className="w-12 h-12 object-cover rounded"
                                                                />
                                                            )}
                                                            <span className="font-medium">{property.Title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="border p-2">
                                                        {formatDate(property.createdAt)}
                                                    </td>
                                                    <td className="border p-2">
                                                        <p className="truncate max-w-xs">{property.Description}</p>
                                                    </td>
                                                    <td className="border p-2 font-medium">
                                                        ${property.price}
                                                    </td>
                                                    <td className={`font-semibold p-2 rounded-md 
                                                     ${property.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''} 
                                                        ${property.status === 'confirmed' ? 'bg-green-100 text-green-700' : ''} 
                                                        ${property.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''} 
                                                         ${property.status === 'booked' ? 'bg-blue-100 text-blue-700' : ''}`}>
                                                        {property.status}
                                                    </td>
                                                    <td className="border p-2">
                                                        {property.status === 'pending' ? (
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                                                    onClick={() => handleConfirm(property.id)}
                                                                >
                                                                    Confirm
                                                                </button>
                                                                <button
                                                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                                                    onClick={() => handleCancel(property.id)}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        ) : (
                                                           <div>
                                                            
                                                                <button
                                                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                                                    onClick={() => handleCancel(property.id)}
                                                                >
                                                                    delete
                                                                </button>
                                                           </div>
                                                        )}
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Pagination */}
                                    <div className="flex justify-between items-center mt-4">
                                        <button
                                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
                                            disabled={currentPage === 1}
                                            onClick={() => handlePageChange(currentPage - 1)}
                                        >
                                            Previous
                                        </button>
                                        <div className="flex space-x-2">
                                            {[...Array(totalPages)].map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={`px-4 py-2 rounded ${currentPage === index + 1
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-200 text-black hover:bg-gray-300'
                                                        }`}
                                                    onClick={() => handlePageChange(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
                                            disabled={currentPage === totalPages}
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p className="text-center text-gray-500 py-4">No properties available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isTransaction && (
                <TransactionModel children={<TransactionForm />} onClose={() => setTransaction(false)} />
            )}
            <ToastContainer />
        </div>
    );
}