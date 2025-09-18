const ContactForm = () => {
    return (
        <div className="flex flex-col md:flex-row items-start justify-between  w-full p-10 bg-gray-100">

            <div className="w-full mx-12 md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold">Get in Touch</h2>
                <p className="text-gray-600">
                    <strong> Sed ut perspiciatis unde omnis</strong> iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                </p>
                <div className="space-y-2 flex items-center gap-8">
                    <div>
                        <div className="flex items-center space-x-2 text-gray-700">
                            <span className="text-blue-500">📞</span>
                            <span>(+04) 743 323 424</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700">
                            <span className="text-blue-500">📍</span>
                            <span>Collins Street West Victoria</span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2 text-gray-700">
                            <span className="text-blue-500">📧</span>
                            <span>contact@urban.com</span>
                        </div>

                        <div className="flex items-center space-x-2 text-gray-700">
                            <span className="text-blue-500">⏰</span>
                            <span>Mon-Sat: 9:00 - 18:00</span>
                        </div>
                    </div>

                </div>
            </div>

            <form className="w-full md:w-1/2  p-6 rounded-lg ">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="p-3 border rounded-md w-full" />
                    <input type="text" placeholder="Subject" className="p-3 border rounded-md w-full" />
                    <input type="email" placeholder="Email Address" className="p-3 border rounded-md w-full col-span-1" />
                    <input type="text" placeholder="Last Name" className="p-3 border rounded-md w-full col-span-1" />
                </div>
                <textarea placeholder="Message" className="w-full p-3 border rounded-md mt-4 h-32"></textarea>
                <button className="w-full bg-gray-900 text-white p-3 rounded-md mt-4 hover:bg-blue-600">Send Message →</button>
            </form>
        </div>
    );
};

export default ContactForm;
