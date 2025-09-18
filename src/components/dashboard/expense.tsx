export default function ExpenseDistribution() {
    return (
        <div className="bg-white p-4 rounded-lg w-full lg:w-1/3 mx-auto">
            {/* Title */}
            <h2 className="text-lg font-bold text-gray-800">Expense Distribution</h2>
            <p className="text-sm text-gray-500">From 01 - 22 August</p>
            <div className="flex">
                <div className="mt-6 text-sm text-gray-600">
                    <ul>
                        <li className="flex items-center">
                            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Bills & Utilities
                        </li>
                        <li className="flex items-center">
                            <span className="w-3 h-3 bg-blue-300 rounded-full mr-2"></span>Food
                        </li>
                        <li className="flex items-center">
                            <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>Personal
                        </li>
                        <li className="flex items-center">
                            <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>Healthcare
                        </li>
                        <li className="flex items-center">
                            <span className="w-3 h-3 bg-orange-400 rounded-full mr-2"></span>Education
                        </li>
                        <li className="flex items-center">
                            <span className="w-3 h-3 bg-purple-300 rounded-full mr-2"></span>Transport
                        </li>
                        <li className="flex items-center">
                            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>Investment
                        </li>
                        <li className="flex items-center">
                            <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>Other
                        </li>
                    </ul>
                </div>
                <div className="relative mt-6 flex justify-center">
                    <svg viewBox="0 0 36 36" className="w-40 h-40">
                        <circle
                            cx="18"
                            cy="18"
                            r="15.915"
                            fill="none"
                            stroke="#d1d5db"
                            strokeWidth="3.5"
                        />
                        <circle
                            cx="18"
                            cy="18"
                            r="15.915"
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="3.5"
                            strokeDasharray="27 73"
                            strokeDashoffset="0"
                        />
                        <circle
                            cx="18"
                            cy="18"
                            r="15.915"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3.5"
                            strokeDasharray="12 88"
                            strokeDashoffset="-27"
                        />
                        <circle
                            cx="18"
                            cy="18"
                            r="15.915"
                            fill="none"
                            stroke="#4ade80"
                            strokeWidth="3.5"
                            strokeDasharray="15 85"
                            strokeDashoffset="-39"
                        />
                        <circle
                            cx="18"
                            cy="18"
                            r="15.915"
                            fill="none"
                            stroke="#fde047"
                            strokeWidth="3.5"
                            strokeDasharray="10 90"
                            strokeDashoffset="-54"
                        />
                        <circle
                            cx="18"
                            cy="18"
                            r="15.915"
                            fill="none"
                            stroke="#f97316"
                            strokeWidth="3.5"
                            strokeDasharray="5 95"
                            strokeDashoffset="-64"
                        />
                        <circle
                            cx="18"
                            cy="18"
                            r="15.915"
                            fill="none"
                            stroke="#e879f9"
                            strokeWidth="3.5"
                            strokeDasharray="8 92"
                            strokeDashoffset="-69"
                        />
                        <circle
                            cx="18"
                            cy="18"
                            r="15.915"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="3.5"
                            strokeDasharray="10 90"
                            strokeDashoffset="-77"
                        />
                    </svg>
                </div>
            </div>
            {/* Donut Chart */}


            {/* Legend */}

        </div>
    );
}
