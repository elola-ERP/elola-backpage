import React from 'react';
import { TaxTableProps } from './types';

export default function TaxTable({ taxes = [], handleModalOpen }: TaxTableProps) {
    
    return (
        <div>
            <table className="min-w-full table-fixed text-center">
                <thead className=" text-gray-4">
                    <tr>
                        <th className="">Tax Id</th>
                        <th className="">Name</th>
                        <th className="">Type</th>
                        <th className="">Value ( % )</th>
                        <th className="">Status</th>
                        <th className="w-10">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-1">
                    {Array.isArray(taxes) && taxes.length > 0 ? (
                        taxes.map((tax) => (
                        <tr key={tax.tax_id} className="even:bg-gray-6">
                            <td className="">{tax.tax_id}</td>
                            <td className="">{tax.tax_name}</td>
                            <td className="">{tax.tax_type}</td>
                            <td className="">{tax.tax_value}%</td>
                            <td className="">
                                <span className={`px-8 py-1 rounded-lg text-white ${tax.tax_status ? 'bg-green-400' : 'bg-red-400'}`}>
                                    {tax.tax_status ? 'On' : 'Off'}
                                </span>
                            </td>
                            <td className="py-4 px-4 flex justify-center items-center gap-1">
                                <button className="w-10 bg-gray-200 p-1 rounded hover:bg-gray-300 flex justify-center" title="edit" onClick={() => handleModalOpen('edit',tax)}>
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3491 3.55222L14.6846 2.21589C14.963 1.93748 15.3406 1.78107 15.7344 1.78107C16.1281 1.78107 16.5057 1.93748 16.7841 2.21589C17.0625 2.4943 17.2189 2.87191 17.2189 3.26564C17.2189 3.65937 17.0625 4.03698 16.7841 4.31539L8.37742 12.7221C7.95888 13.1404 7.44275 13.4478 6.87563 13.6167L4.75 14.25L5.38333 12.1244C5.55218 11.5573 5.85963 11.0411 6.27792 10.6226L13.3491 3.55222ZM13.3491 3.55222L15.4375 5.64064M14.25 11.0833V14.8438C14.25 15.3162 14.0623 15.7692 13.7283 16.1033C13.3942 16.4373 12.9412 16.625 12.4688 16.625H4.15625C3.68383 16.625 3.23077 16.4373 2.89672 16.1033C2.56267 15.7692 2.375 15.3162 2.375 14.8438V6.53126C2.375 6.05885 2.56267 5.60578 2.89672 5.27173C3.23077 4.93768 3.68383 4.75001 4.15625 4.75001H7.91667" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button className="w-10 bg-red-200 p-1 rounded hover:bg-red-300 flex justify-center" title="delete" onClick={() => handleModalOpen('delete', tax)}>
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.6692 7.12499L11.3953 14.25M7.60475 14.25L7.33083 7.12499M15.2222 4.58374C15.4929 4.6249 15.7621 4.66844 16.0313 4.71515M15.2222 4.58374L14.3767 15.5744C14.3422 16.0219 14.14 16.4399 13.8106 16.7447C13.4813 17.0496 13.049 17.2189 12.6002 17.2187H6.39983C5.95103 17.2189 5.51873 17.0496 5.18936 16.7447C4.85999 16.4399 4.65784 16.0219 4.62333 15.5744L3.77783 4.58374M15.2222 4.58374C14.3085 4.4456 13.3901 4.34077 12.4688 4.26944M3.77783 4.58374C3.50708 4.62411 3.23792 4.66765 2.96875 4.71436M3.77783 4.58374C4.69152 4.4456 5.60994 4.34077 6.53125 4.26944M12.4688 4.26944V3.54428C12.4688 2.61011 11.7483 1.83111 10.8142 1.80182C9.93828 1.77382 9.06172 1.77382 8.18583 1.80182C7.25167 1.83111 6.53125 2.6109 6.53125 3.54428V4.26944M12.4688 4.26944C10.4925 4.11671 8.50747 4.11671 6.53125 4.26944" stroke="#F04B4B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="py-4">No taxes available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
