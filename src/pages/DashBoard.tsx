import Profile from "../components/dashboard/Profile";
import bgImage from '../assets/bckg.png';
import { useEffect, useState } from "react";
import TransactionModel from "../components/modal/Transactionmodal";
import TransactionForm from "../components/transaction/TransactionForm";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { cancelBooking, rentersBookings } from "../redux/actions/booking";
import { RootState, AppDispatch } from "../redux/store";

export default function DashBoard() {
    const [isTransaction, setTransaction] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const { rentersData, loading, error } = useSelector((state: RootState) => state.booking);

    useEffect(() => {
        dispatch(rentersBookings());
    }, [dispatch]);

    const handleCancel = (id: string) => {
        dispatch(cancelBooking(id));
    };

    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'text-yellow-500 bg-yellow-50',
            confirmed: 'text-green-500 bg-green-50',
            cancelled: 'text-red-500 bg-red-50',
            booked: 'text-blue-500 bg-blue-50'
        };
        return colors[status as keyof typeof colors] || '';
    };

    // Sort data by createdAt in descending order (newest first)
    const sortedData = rentersData ? [...rentersData].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }) : [];

    return (
        <div className="min-h-screen bg-gray-100" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="p-2 md:p-5">
                <div className="flex flex-col rounded-lg space-y-4">
                    <div className="flex flex-col bg-white shadow-md rounded-lg">
                        <Profile />
                    </div>
                    
                    <div className="flex flex-col h-full">
                        <div className="w-full bg-white shadow-md rounded-lg p-4">
                            <h2 className="font-bold text-xl py-2 mb-4 underline">Booked Property:</h2>
                            
                            {loading ? (
                                <p className="text-center text-gray-600">Loading bookings...</p>
                            ) : error ? (
                                <p className="text-center text-red-600">{error}</p>
                            ) : !Array.isArray(sortedData) || sortedData.length === 0 ? (
                                <p className="text-center text-gray-600">No bookings found</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {sortedData.map((booking: any) => (
                                        <div key={booking.id} className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                                            <div className="p-4">
                                                <div className="space-y-4">
                                                    {/* Header */}
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="font-semibold text-lg line-clamp-2">{booking.property.Title}</h3>
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                    
                                                    {/* Created Date */}
                                                    <div className="text-sm text-gray-500">
                                                        Booked on: {new Date(booking.createdAt).toLocaleDateString()} 
                                                        {new Date(booking.createdAt).toLocaleTimeString()}
                                                    </div>

                                                    {/* Details */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <p className="text-gray-600 text-sm">Check In</p>
                                                            <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-gray-600 text-sm">Check Out</p>
                                                            <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-gray-600 text-sm">Price/Night</p>
                                                            <p className="font-medium">${booking.property.price}</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-gray-600 text-sm">Days</p>
                                                            <p className="font-medium">{booking.totaldays}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Total Amount */}
                                                    <div className="border-t pt-3">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-gray-600">Total Amount:</span>
                                                            <span className="text-lg font-semibold">${booking.totalamount}</span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Action Button */}
                                                    <button 
                                                        className="w-full mt-2 border border-red-600 rounded-lg px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                                        onClick={() => handleCancel(booking.id)}
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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