import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({ text }) => {
    return (
        <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            {text && <span className="px-4 text-gray-500">{text}</span>}
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
    );
};

Divider.propTypes = {
    text: PropTypes.string,
};

export default Divider;