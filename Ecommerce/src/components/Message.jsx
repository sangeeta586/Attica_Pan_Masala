import React, { useEffect, useState } from 'react';

const Message = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000); // Changed timeout duration to 5000 milliseconds (5 seconds)

    return () => clearTimeout(timer);
  }, [onClose]);

  return visible ? (
    <div className="fixed top-5 right-5 bg-green-500 text-white py-4 px-6 rounded-lg text-lg font-bold">
      {message}
    </div>
  ) : null;
};

export default Message;
