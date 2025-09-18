import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { createBooking } from '../../redux/actions/booking';

export default function BookingForm() {
    const dispatch: AppDispatch = useDispatch();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const bookingState = useSelector((state: any) => state.booking); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const bookingData = {
            checkIn,
            checkOut
        };
    
        console.log("Sending JSON Data:", bookingData);
    
        dispatch(createBooking(bookingData))
            .then(() => resetForm())
            .catch((error) => console.error(error));
    };
    
    
    const resetForm = () => {
        setCheckIn('');
        setCheckOut('');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-white">BOOK THIS PROPERTY</h1>
            <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md">
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full lg:w-1/2 px-2">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">CHECKIN</label>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 px-2">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">CHECKOUT</label>
                            <input
                                type="date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
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
                        disabled={bookingState.loading}
                    >
                        {bookingState.loading ? 'Booking...' : 'Book'}
                    </button>
                </div>
            </form>
        </div>
    );
}
