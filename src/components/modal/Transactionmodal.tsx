import React, { ReactNode, useEffect, useState } from "react";

import close from '../../assets/close.svg';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}
const TransactionModel: React.FC<ModalProps> = ({ children, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsVisible(true); // Trigger slide-in animation
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false); // Trigger slide-out animation
    setTimeout(onClose, 300); // Delay closure until animation completes
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-50 overflow-y-auto w-full transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      <div className="flex items-center justify-center py-10 lg:px-10 rounded-lg">
        <div
          className={`bg-gray-900 rounded-lg relative w-full lg:w-1/2  transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-x-full"
            }`}
        >
          {/* Close button for desktop */}
          <div
            onClick={handleClose}
            className=" absolute top-2.5 right-2.5 bg-transparent border-none text-xl cursor-pointer text-black"
          >
            <img src={close} alt="Close" className="w-5 h-5" />
          </div>
          {children}
        </div>
      </div>


    </div>
  );
};

export default TransactionModel;
