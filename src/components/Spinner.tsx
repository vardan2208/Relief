import React from 'react';

const Spinner: React.FC = () => {
    return (
        <div className="w-16 h-16 border-4 border-t-neon-cyan border-r-neon-cyan border-b-neon-cyan/30 border-l-neon-cyan/30 rounded-full animate-spin"></div>
    );
};

export default Spinner;
