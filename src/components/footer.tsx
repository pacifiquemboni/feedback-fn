const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-10 px-5">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Us Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact us</h3>
            <p className="mb-2">📞 (+40) 74 0920 2288</p>
            <p className="mb-2">📧 <span className="text-white font-medium">office@example.com</span></p>
            <p>📍 8121 Sierra Lane Tampa, Florida 33604</p>
          </div>
          
          {/* Useful Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Blog</li>
              <li>Pricing</li>
              <li>Contact us</li>
              <li>Purchase Theme</li>
            </ul>
          </div>
          
          {/* Rent with Us */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Rent with Us</h3>
            <ul className="space-y-2">
              <li>Rent a House</li>
              <li>Book Now</li>
              <li>Book your Rooms</li>
              <li>Buy your Place</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          
          {/* Recent Posts */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Recent posts</h3>
            <div className="mb-3">
              <p className="text-white font-medium">Great Service</p>
              <p className="text-gray-400 text-sm">February 18, 2016</p>
            </div>
            <div>
              <p className="text-white font-medium">Best Coverage</p>
              <p className="text-gray-400 text-sm">February 18, 2016</p>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center">
          <p>Copyright by ModelTheme. All Rights Reserved.</p>
          
          {/* Social Icons */}
          <div className="flex justify-center space-x-4 mt-3">
            <span className="text-white cursor-pointer">🔵</span>
            <span className="text-white cursor-pointer">🐦</span>
            <span className="text-white cursor-pointer">📌</span>
            <span className="text-white cursor-pointer">💼</span>
            <span className="text-white cursor-pointer">📸</span>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  