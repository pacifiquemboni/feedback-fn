import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchProperty, getProperty, updateProperty } from '../../redux/actions/property';

export default function UpdatePropertyForm() {
    const dispatch: AppDispatch = useDispatch();
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [pictures, setPictures] = useState<File[]>([]); // Keep track of pictures
    const { singleData, loading } = useSelector((state: any) => state.property); // Destructure data and loading from Redux state

    useEffect(() => {
        // Fetch property data when the component mounts
        
            dispatch(getProperty());
      
    }, [dispatch]);

    console.log('Fetched singleData:', singleData);

    // Update form fields when property data is fetched
    useEffect(() => {
        if (singleData) {
            setTitle(singleData.Title || ''); // Populate Title
            setDescription(singleData.Description || ''); // Populate Description
            setPrice(singleData.price ? singleData.price.toString() : ''); // Populate Price
            setLocation(singleData.location ? singleData.location.toString() : ''); // Populate Price

            setPictures([]); // Don't update pictures
        }
        
    }, [singleData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPictures(Array.from(e.target.files)); // Convert FileList to Array
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Create a plain JavaScript object
        const propertyData = {
            Title: Title,
            Description: Description,
            price: price,
            location: location,
        };

        console.log("Property Data:", propertyData);

        // Dispatch the action with the object instead of FormData
        dispatch(updateProperty(propertyData));
        dispatch(fetchProperty());

    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-white">UPDATE A PROPERTY</h1>
            <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md">
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full lg:w-1/2 px-2">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                            <input
                                type="text"
                                value={Title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 px-2">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <input
                                type="text"
                                value={Description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
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
                        disabled={loading}
                    >
                        {loading ? 'Updating Property...' : 'Update Property'}
                    </button>
                </div>
            </form>
        </div>
    );
}