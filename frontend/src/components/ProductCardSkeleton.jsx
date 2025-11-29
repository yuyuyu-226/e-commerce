import React from 'react';

const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-200 w-full"></div>

            {/* Content Placeholder */}
            <div className="p-5 space-y-4">
                {/* Title */}
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                
                {/* Description (3 lines) */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>

                {/* Price and Button Row */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="h-6 bg-gray-200 rounded w-20"></div> {/* Price */}
                    <div className="h-10 bg-gray-200 rounded-full w-32"></div> {/* Button */}
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;