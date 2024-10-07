import React from "react";

const TaxCardSkeleton = () => {
    return (
        <div className="grid grid-cols-3 gap-4"> {/* Skeleton with 3 cards per row */}
            {[...Array(3)].map((_, index) => (
                <div key={index} className="p-3 bg-gray-200 rounded-[5px] animate-pulse">
                    {/* Simulate TaxCard structure */}
                    <div className="flex w-full justify-between pb-3">
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-300 h-12 w-12 rounded-[5px]" />
                            <div className="flex flex-col">
                                <div className="bg-gray-300 w-16 h-2 mb-1 rounded-md" />
                                <div className="bg-gray-300 w-48 h-8 rounded-md" />
                            </div>
                        </div>
                        <div className="bg-gray-300 h-8 w-8 rounded-md" />
                    </div>
                    <div className="flex p-8 justify-between bg-white rounded-xl">
                    </div>
                    <div className="flex pt-2 justify-between gap-24">
                        <div className="bg-gray-300 w-1/2 h-10 rounded-md" />
                        <div className="bg-gray-300 w-1/2 h-10 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaxCardSkeleton;
