import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getProperty } from '../../redux/actions/property';

export default function SinglePropertyRentersDetails() {
    const dispatch: AppDispatch = useDispatch();
    const { singleData, loading } = useSelector((state: any) => state.property);

    useEffect(() => {
        dispatch(getProperty()); // Fetch property data when the component mounts
    }, [dispatch]);

    if (loading) {
        return <div className="text-center text-gray-700">Loading property details...</div>;
    }

    if (!singleData) {
        return <div className="text-center text-red-500">No property singleData available</div>;
    }


    console.log("single dta", singleData)
    const { Title, Description, price, pictures, status, createdAt, updatedAt } = singleData;

    return (
        <div className="max-w-4xl mx-auto p-6 h-fit text-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-white mb-4">{Title}</h1>
            <p className="text-white text-lg mb-2">{Description}</p>
            <p className="text-white font-semibold text-xl">Price: ${price}</p>
            {/* <p className="text-white">
                Status:
                <span className={`font-semibold ml-2
        ${status === 'pending' ? 'text-yellow-500' : ''}
        ${status === 'confirmed' ? 'text-green-500' : ''}
        ${status === 'cancelled' ? 'text-red-500' : ''}
        ${status === 'booked' ? 'text-blue-500' : ''}`}>
                    {status}
                </span>
            </p> */}
            {pictures && pictures.length > 0 && (
                <div className="mt-4 grid  md:grid-cols-2 items-center">
                    <img src={pictures[0]} alt="Property" className="w-full h-64 object-cover rounded-md" />
                    <div className='grid grid-rows-2 md:grid-rows-2 h-64'>
                        {pictures.length > 1 && (
                            <img src={pictures[1]} alt="Property" className="w-full h-32 object-cover rounded-md " />
                        )}
                        {pictures.length > 2 && (
                            <img src={pictures[2]} alt="Property" className="w-full h-32 object-cover rounded-md " />
                        )}
                    </div>

                </div>
            )}
            <div className='flex justify-between p-3 border border-b-4 mt-2 rounded'>
                <p className="text-white text-sm">Date added: {new Date(createdAt).toLocaleString()}</p>
                {/* <p>|</p> */}
                {/* <p className="text-white text-sm">Last Updated: {new Date(updatedAt).toLocaleString()}</p> */}
            </div>

        </div>
    );
}
