import React from 'react';

const ToggleButton = ({ isActive, label, onClick,color }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`text-white rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ${
        isActive
          ? `bg-${color}-500 hover:bg-blue-800`
          : `bg-gray-500 hover:bg-gray-600`
      }` }
    >
      {label}
    </button>
  );
};

export default ToggleButton;
