import React from "react";

const Pagination = ({ focus, setPagination, quantityPage  }) => (
    <span>
        {Array(focus).fill('').map((_, i) => (
            <button 
                key={i} 
                className={i === quantityPage ? "Focus" : ""} 
                onClick={() => setPagination(i)}>{i + 1}
            </button>) 
        )}
    </span>
)

export default Pagination