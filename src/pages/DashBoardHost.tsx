import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Profile from "../components/dashboard/Profile";
import TransactionModel from "../components/modal/Transactionmodal";
import PropertyForm from "../components/property/property";
import { deleteProperty, fetchProperty } from "../redux/actions/property";
import UpdatePropertyForm from "../components/property/updateProperty";
import SinglePropertyDetails from "../components/property/singleProperty";
import { confirmBooking, hostBookings } from "../redux/actions/booking";

export default function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isTransaction, setTransaction] = useState(false);
    const [isEditProperty, setEditProperty] = useState(false);
    const [isSingleProperty, setSingleProperty] = useState(false);

    const dispatch: AppDispatch = useDispatch();
    const { data, loading, error, updatesuccess } = useSelector((state: any) => state.property);
    const { hostData } = useSelector((state: any) => state.booking);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Sort properties by createdAt
    const properties = Array.isArray(data)
        ? [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        : Array.isArray(data?.properties)
            ? [...data.properties].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            : [];

    // Sort host bookings by createdAt
    const hostDatas = hostData.bookings
        ? [...hostData.bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        : [];

    useEffect(() => {
        if (!data?.length) {
            dispatch(fetchProperty());
        }
    }, [dispatch, data]);

    useEffect(() => {
        if (!data?.length) {
            dispatch(hostBookings());
        }
    }, [dispatch, data]);

    const handleCloseModal = useCallback(() => {
        if (updatesuccess) {
            setTransaction(false);
            dispatch(fetchProperty());
        }
    }, [updatesuccess]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProperties = properties.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(properties.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleEditClick = (id: string) => {
        localStorage.setItem('productId', id);
        setEditProperty(true);
    };

    const handleViewClick = (id: string) => {
        localStorage.setItem('productId', id);
        setSingleProperty(true);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteProperty(id));

        dispatch(fetchProperty());
    };

    const handleConfirm = (id: string) => {
        dispatch(confirmBooking(id));
        dispatch(fetchProperty());
    };

    
    if (updatesuccess) {
        dispatch(fetchProperty());
    }
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`bg-gray-900 text-white w-64 transition-all ${isSidebarOpen ? "block" : "hidden"}`}>
                <nav className="mt-5 ml-4">
                    <ul>
                        <li className="p-2 bg-gray-100 text-gray-900 rounded-l-3xl cursor-pointer w-full">Dashboard</li>

                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-5">
                {/* Header */}
                <div className="bg-red-200 text-red-800 rounded mb-4">
                    <Profile />
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-green-100 rounded shadow-md flex justify-between items-center">
                        <div>
                            <p className="text-lg font-bold">{properties?.length}</p>
                            <p className="text-sm">Properties</p>
                        </div>
                        <button onClick={() => setTransaction(true)} className="p-2 border rounded bg-teal-600 text-white">Add Property</button>
                    </div>
                </div>

                {/* Properties Table */}
                <div className="grid grid-cols-1 gap-4 mt-5">
                    <div className="bg-white p-4 shadow-md rounded">
                        <h3 className="text-lg font-bold text-blue-600 mb-3">PROPERTIES</h3>
                        {loading ? (
                            <p>Loading properties...</p>
                        ) : error ? (
                            <p className="text-red-600">{error}</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-blue-100">
                                            <th className="border border-gray-300 p-2">Title</th>
                                            <th className="border border-gray-300 p-2">Description</th>
                                            <th className="border border-gray-300 p-2">Price</th>
                                            <th className="border border-gray-300 p-2">Created At</th>
                                            <th className="border border-gray-300 p-2">Status</th>
                                            <th className="border border-gray-300 p-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentProperties.map((property: any) => (
                                            <tr key={property.id} className="border-b-2">
                                                <td className="p-2">{property.Title}</td>
                                                <td className="p-2">{property.Description}</td>
                                                <td className="p-2">${property.price}/night</td>
                                                <td className="p-2">{formatDate(property.createdAt)}</td>
                                                <td className={`font-semibold p-2
                                                    ${property.status === 'pending' ? 'text-yellow-500' : ''}
                                                    ${property.status === 'confirmed' ? 'text-green-500' : ''}
                                                    ${property.status === 'cancelled' ? 'text-red-500' : ''}
                                                    ${property.status === 'booked' ? 'text-blue-500' : ''}`}>
                                                    {property.status}
                                                </td>
                                                <td className="flex flex-row justify-evenly gap-2 p-2">
                                                    <button className="text-blue-600 h-5 w-5 hover:text-black" onClick={() => handleViewClick(property.id)}>
                                                        <FaEye />
                                                    </button>
                                                    <button className="text-blue-600 mr-2 hover:text-black" onClick={() => handleEditClick(property.id)}>
                                                        <FaEdit />
                                                    </button>
                                                    <button className="text-red-600 hover:text-black" onClick={() => handleDelete(property.id)}>
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-5">
                        <button
                            className="px-4 py-2 bg-teal-600 text-white rounded disabled:bg-gray-300"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <div className="flex space-x-2">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-black'} rounded`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            className="px-4 py-2 bg-teal-600 text-white rounded disabled:bg-gray-300"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>

                    {/* Host Bookings Table */}
                    <div className="bg-white p-4 shadow-md rounded mt-5">
                        <h3 className="text-lg font-bold text-blue-600 mb-3">Booked Property</h3>
                        {loading ? (
                            <p>Loading bookings...</p>
                        ) : error ? (
                            <p className="text-red-600">{error}</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-blue-100">
                                            <th className="border border-gray-300 p-2">Icon</th>
                                            <th className="border border-gray-300 p-2">Property</th>
                                            <th className="border border-gray-300 p-2">Created At</th>
                                            <th className="border border-gray-300 p-2">Check-in Date</th>
                                            <th className="border border-gray-300 p-2">Check-out Date</th>
                                            <th className="border border-gray-300 p-2">Booking Status</th>
                                            <th className="border border-gray-300 p-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hostDatas.length === 0 && (
                                            <div>no bookings at this time</div>
                                        )}
                                        {hostDatas?.map((booking: any) => (
                                            <tr key={booking.id} className="border-b-2">
                                                <td className="p-2"><img src={booking.property.pictures[0]} alt="" className="w-12 h-12 object-cover" /></td>
                                                <td className="p-2">{booking.property.Title}</td>
                                                <td className="p-2">{formatDate(booking.createdAt)}</td>
                                                <td className="p-2">{formatDate(booking.checkIn)}</td>
                                                <td className="p-2">{formatDate(booking.checkOut)}</td>
                                                <td className={`font-semibold p-2 
                                                    ${booking.status === 'pending' ? 'text-yellow-500' : ''}
                                                    ${booking.status === 'confirmed' ? 'text-green-500' : ''}
                                                    ${booking.status === 'cancelled' ? 'text-red-500' : ''}
                                                    ${booking.status === 'completed' ? 'text-blue-500' : ''}`}>
                                                    {booking.status}
                                                </td>
                                                <td className="flex flex-row justify-evenly gap-2 p-2">
                                                    {booking.status === 'pending' ? (
                                                        <div className="flex flex-row justify-evenly gap-2">
                                                            <button className="border border-green-600 p-1 text-green-600 rounded-sm hover:bg-green-600 hover:text-white transition-colors"
                                                                onClick={() => handleConfirm(booking.id)}>
                                                                Confirm
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-500 text-sm">No Actions</p>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {isTransaction && (
                <TransactionModel children={<PropertyForm />} onClose={handleCloseModal} />
            )}
            {isEditProperty && (
                <TransactionModel children={<UpdatePropertyForm />} onClose={() => setEditProperty(false)} />
            )}
            {isSingleProperty && (
                <TransactionModel children={<SinglePropertyDetails />} onClose={() => setSingleProperty(false)} />
            )}
        </div>
    );
}