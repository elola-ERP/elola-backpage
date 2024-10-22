import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/src/api/axiosClient";
import { Button, CancelButton, DeleteButton, Modal } from "@/src/features";
import { DriverPartner } from "@/src/assets";
import Loader from "../../base/Loader";

const ITEMS_PER_PAGE = 10;

export default function DriverPartnerPage() {
    const [allDriverPartners, setAllDriverPartners] = useState<DriverPartner[]>([]);
    const [driverpartners, setDriverPartners] = useState<DriverPartner[]>([]);
    const [selectedDriverPartner, setSelectedDriverPartner] = useState<DriverPartner | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        store_id: 0,
        driver_partner_id: '',
        partner_name: '',
        benefit: 0,
    });
    const [errors, setErrors] = useState({
        driver_partner_id: '',
        partner_name: '',
        benefit: '',
    });
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); 

    // HANDLE GET DATA FROM API (IF NOT GETTING ANY DATA, GET FROM DUMMY DATA)
    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                setLoading(true)
                console.log("Loading started");

                await new Promise((resolve) => setTimeout(resolve, 1000));

                const response = await axiosInstance.get('/driver-partner'); 
                const driverPartnerfData = response.data.data;
                
                setAllDriverPartners(driverPartnerfData)
                setTotalPages(Math.ceil(driverPartnerfData.length / ITEMS_PER_PAGE));
                setDriverPartners(driverPartnerfData.slice(0, ITEMS_PER_PAGE)); 
            } catch (error) {
                console.error('Error fetching driver partners', error);
            } finally {
                setLoading(false);
                console.log("Loading finished");
            }
        };

        fetchStaffs();
    }, []);

    useEffect(() => {
        const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIdx = startIdx + ITEMS_PER_PAGE;
        setDriverPartners(allDriverPartners.slice(startIdx, endIdx)); 
    }, [currentPage, allDriverPartners]);

    
    // HANDLE POP UP ADD DATA
    const handleModalOpen = (type: string, driverPartner?: DriverPartner) => {
        if (type === 'add') {
            setFormData({ store_id: selectedDriverPartner?.store_id || 0, driver_partner_id: '', partner_name: '', benefit: 0, });
            setIsAddModalOpen(true);
        } else if (type === 'edit' && driverPartner) {
            setSelectedDriverPartner(driverPartner);
            setFormData({
                store_id: driverPartner.store_id,
                driver_partner_id: driverPartner.driver_partner_id,
                partner_name: driverPartner.partner_name,
                benefit: driverPartner.benefit,
            });
            setIsEditModalOpen(true);
        } else if (type === 'delete' && driverPartner) {
            setSelectedDriverPartner(driverPartner);
            setIsDeleteModalOpen(true);
        }
    };
    
    const handleModalClose = () => {
        setIsSecondModalOpen(false);
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedDriverPartner(null);
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "benefit" ? parseInt(value) : value
        }));
    };
    
    const refreshDriverPartners = async () => {
        try {
            const response = await axiosInstance.get('/driver-partner');
            const staffData = response.data.data;
            setAllDriverPartners(staffData);
            setDriverPartners(staffData.slice(0, ITEMS_PER_PAGE));
        } catch (error) {
            console.error('Error refreshing Driver Partners', error);
        }
    };

    const handleConfirmAdd = async () => {
        if (!validateForm()) return;

        try {
            
            const { driver_partner_id, ...dataToSend } = formData;
            console.log('Sending data:', dataToSend);

            await axiosInstance.post(`/driver-partner/${selectedDriverPartner?.driver_partner_id}`, dataToSend);
            await refreshDriverPartners();
            handleModalClose();
            setIsAddModalOpen(false);
            setIsSecondModalOpen(true);
        } catch (error) {
            console.error('Error adding Driver Partner', error);
        }
    };

    const handleConfirmEdit = async () => {
        try {
            const { driver_partner_id, ...dataToSend } = formData;
            if (selectedDriverPartner) {
                await axiosInstance.patch(`/driver-partner/${selectedDriverPartner.driver_partner_id}`, dataToSend);
                await refreshDriverPartners();
                handleModalClose();
            }
        } catch (error) {
            console.error('Error editing Driver Partner', error);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            if (selectedDriverPartner) {
                await axiosInstance.delete(`/driver-partner/${selectedDriverPartner.driver_partner_id}`);
                await refreshDriverPartners();
                handleModalClose();
            }
        } catch (error) {
            console.error('Error deleting Driver Partner', error);
        }
    };
    
    // HANDLE PAGE AND GENERATE PAGE
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    
    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            driver_partner_id: '',
            partner_name: '',
            benefit: ''  
        };

        if (!formData.driver_partner_id) {
            newErrors.driver_partner_id = 'Partner Id number is required';
            isValid = false;
        }
    
        if (!formData.partner_name) {
            newErrors.partner_name = 'Driver partner name is required';
            isValid = false;
        }

        if (!formData.benefit) {
            newErrors.benefit = 'Benefit is required';
            isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full">

                {/* HEADER */}
                <div className="flex justify-between items-center pt-20 mb-4 gap-6">
                    <div className="text-gray-2">
                        <h2 className="text-xl font-bold">Driver Partner</h2>
                        <p className="text-sm">Check your store driver partner details, you can add, edit and delete</p>
                    </div>
                    <Button className="bg-orange-2 h-full w-48 text-white rounded" onClick={() => handleModalOpen('add')}>+ Add Driver Partner</Button>
                </div>

                {/* TABLE */}
                <div className="p-4 bg-white border border-gray-6 rounded-[10px] shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl text-gray-2 font-semibold">Staff Data</h2>
                        
                        {/* PAGE */}
                        <div className="flex items-center gap-2">
                            <svg 
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={`cursor-pointer stroke-gray-3 ${currentPage === 1 ? 'opacity-10 cursor-not-allowed' : ''}`}
                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M15.75 19.5L8.25 12L15.75 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {pageNumbers.map((number) => (
                                <button
                                    key={number}
                                    onClick={() => handlePageChange(number)}
                                    className={`w-6 h-6 flex items-center justify-center rounded ${number === currentPage ? 'bg-orange-2 text-white' : 'bg-gray-6 hover:bg-gray-5'}`}
                                >
                                    {number}
                                </button>
                            ))}
                            <svg 
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={`cursor-pointer stroke-gray-3 ${currentPage === totalPages ? 'opacity-10 cursor-not-allowed' : ''}`}
                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8.25 4.5L15.75 12L8.25 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (

                    <div>
                        <table className="min-w-full table-fixed text-center">
                            <thead className=" text-gray-4">
                                <tr>
                                    <th className="">Partner Id</th>
                                    <th className="">Name</th>
                                    <th className="">Benefit (%)</th>
                                    <th className="w-10">Action</th>
                                </tr>
                            </thead>
                            <tbody className=" text-gray-1">
                                {driverpartners.map((driverPartner) => (
                                    <tr key={driverPartner.driver_partner_id} className="even:bg-gray-6">
                                        <td className="">{driverPartner.driver_partner_id}</td>
                                        <td className="">{driverPartner.partner_name}</td>
                                        <td className="">{driverPartner.benefit}%</td>
                                        <td className="py-4 px-4 flex justify-center items-center gap-1">
                                            <button className="w-10 bg-gray-200 p-1 rounded hover:bg-gray-300 flex justify-center" onClick={() => handleModalOpen('edit', driverPartner)}>
                                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.3491 3.55222L14.6846 2.21589C14.963 1.93748 15.3406 1.78107 15.7344 1.78107C16.1281 1.78107 16.5057 1.93748 16.7841 2.21589C17.0625 2.4943 17.2189 2.87191 17.2189 3.26564C17.2189 3.65937 17.0625 4.03698 16.7841 4.31539L8.37742 12.7221C7.95888 13.1404 7.44275 13.4478 6.87563 13.6167L4.75 14.25L5.38333 12.1244C5.55218 11.5573 5.85963 11.0411 6.27792 10.6226L13.3491 3.55222ZM13.3491 3.55222L15.4375 5.64064M14.25 11.0833V14.8438C14.25 15.3162 14.0623 15.7692 13.7283 16.1033C13.3942 16.4373 12.9412 16.625 12.4688 16.625H4.15625C3.68383 16.625 3.23077 16.4373 2.89672 16.1033C2.56267 15.7692 2.375 15.3162 2.375 14.8438V6.53126C2.375 6.05885 2.56267 5.60578 2.89672 5.27173C3.23077 4.93768 3.68383 4.75001 4.15625 4.75001H7.91667" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                            <button className="w-10 bg-red-200 p-1 rounded hover:bg-red-300 flex justify-center" onClick={() => handleModalOpen('delete', driverPartner)}>
                                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.6692 7.12499L11.3953 14.25M7.60475 14.25L7.33083 7.12499M15.2222 4.58374C15.4929 4.6249 15.7621 4.66844 16.0313 4.71515M15.2222 4.58374L14.3767 15.5744C14.3422 16.0219 14.14 16.4399 13.8106 16.7447C13.4813 17.0496 13.049 17.2189 12.6002 17.2187H6.39983C5.95103 17.2189 5.51873 17.0496 5.18936 16.7447C4.85999 16.4399 4.65784 16.0219 4.62333 15.5744L3.77783 4.58374M15.2222 4.58374C14.3085 4.4456 13.3901 4.34077 12.4688 4.26944M3.77783 4.58374C3.50708 4.62411 3.23792 4.66765 2.96875 4.71436M3.77783 4.58374C4.69152 4.4456 5.60994 4.34077 6.53125 4.26944M12.4688 4.26944V3.54428C12.4688 2.61011 11.7483 1.83111 10.8142 1.80182C9.93828 1.77382 9.06172 1.77382 8.18583 1.80182C7.25167 1.83111 6.53125 2.6109 6.53125 3.54428V4.26944M12.4688 4.26944C10.4925 4.11671 8.50747 4.11671 6.53125 4.26944" stroke="#F04B4B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    )}

                </div>
            </div>

            {/* FILL STAFF DATA POP UP */}
            <Modal isOpen={isAddModalOpen} onClose={handleModalClose} onConfirm={handleConfirmAdd}>
                <div className="w-full flex flex-col items-center pb-10">
                    <h2 className="text-2xl font-bold text-orange-2">Add Driver Partner</h2>
                    <span className="text-sm text-gray-3">Input all necesary data</span>
                </div>
                <form className="w-full text-center mb-6">
                    <label>Partner Id</label>
                    {errors.driver_partner_id && <p className="text-red-600 text-sm">{errors.driver_partner_id}</p>}
                    <input
                        type="number"
                        name="driver_partner_id"
                        className="border border-gray-300 p-2 mb-4 drop-shadow-md w-full rounded-[10px]"
                        placeholder="e.g Gojek, Grab, etc"
                        value={formData.driver_partner_id}
                        onChange={handleInputChange}
                    />
                    <label>Name</label>
                    {errors.partner_name && <p className="text-red-600 text-sm">{errors.partner_name}</p>}
                    <input
                        type="text"
                        name="partner_name"
                        className="border border-gray-300 p-2 mb-4 drop-shadow-md w-full rounded-[10px]"
                        placeholder="e.g Gojek, Grab, etc"
                        value={formData.partner_name}
                        onChange={handleInputChange}
                    />
                    <label>Benefit</label>
                    {errors.benefit && <p className="text-red-600 text-sm">{errors.benefit}</p>}
                    <input
                        type="number"
                        name="benefit"
                        className="border border-gray-300 p-2 mb-4 drop-shadow-md w-full rounded-[10px]"
                        placeholder="e.g. 20%"
                        value={formData.benefit} 
                        onChange={handleInputChange}
                    />
                </form>
                <div className="flex justify-between w-full mt-4 gap-2">
                    <CancelButton
                        onClick={handleModalClose}
                    >
                        Cancel
                    </CancelButton>
                    <Button
                        onClick={handleConfirmAdd}
                    >
                        Ok
                    </Button>
                </div>
            </Modal>
            <Modal isOpen={isSecondModalOpen} onClose={handleModalClose} onConfirm={handleModalClose}>
                <div className="w-full flex flex-col items-center pb-10">
                    <div className="text-green-2 flex row gap-2 justify-center items-center">
                        <svg width="24" height="24" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M10.3333 15.5417L13.4583 18.6667L18.6667 11.375M27 14.5C27 16.1415 26.6767 17.767 26.0485 19.2835C25.4203 20.8001 24.4996 22.1781 23.3388 23.3388C22.1781 24.4996 20.8001 25.4203 19.2835 26.0485C17.767 26.6767 16.1415 27 14.5 27C12.8585 27 11.233 26.6767 9.71646 26.0485C8.19989 25.4203 6.8219 24.4996 5.66116 23.3388C4.50043 22.1781 3.57969 20.8001 2.95151 19.2835C2.32332 17.767 2 16.1415 2 14.5C2 11.1848 3.31696 8.00537 5.66116 5.66117C8.00537 3.31696 11.1848 2 14.5 2C17.8152 2 20.9946 3.31696 23.3388 5.66117C25.683 8.00537 27 11.1848 27 14.5Z" 
                                stroke="currentColor" 
                                strokeWidth="4" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"/>
                        </svg>
                        <h2 className="text-2xl font-bold">Driver Partner Added</h2>
                    </div>
                    <span className="text-sm text-gray-3">You can update or delete this data later</span>
                </div>
                <div className="text-gray-1 w-full flex flex-col mb-6 gap-6">

                    <div className="flex flex-row gap-4 justify-start">
                        <h2 className="w-1/3 font-bold text-gray-3">Full Name</h2>
                        <span>:</span>
                        <p>{formData.partner_name}</p> 
                    </div>

                    <div className="flex flex-row gap-4 justify-start">
                        <h2 className="w-1/4 font-bold text-gray-3">Role</h2>
                        <span>:</span>
                        <p>{formData.benefit}%</p> 
                    </div>
                </div>
                <Button
                    onClick={handleModalClose}
                >
                    Ok
                </Button>
            </Modal>

            {/* EDIT */}
            <Modal isOpen={isEditModalOpen} onClose={handleModalClose} onConfirm={handleModalClose}>
                    <div className="w-full flex flex-col items-center pb-10">
                        <h2 className="text-2xl font-bold text-orange-2">Edit Staff</h2>
                        <span className="text-sm text-gray-3">Edit necesary data</span>
                    </div>
                    <form className="w-full text-center mb-6">
                        <label>Name</label>
                        <input
                            type="text"
                            name="partner_name"
                            className="border border-gray-300 p-2 mb-4 drop-shadow-md w-full rounded-[10px]"
                            placeholder="Enter driver partner name"
                            value={formData.partner_name}
                            onChange={handleInputChange}
                        />
                        <label>Benefit</label>
                        <input
                            type="number"
                            name="benefit"
                            className="border border-gray-300 p-2 mb-4 drop-shadow-md w-full rounded-[10px]"
                            placeholder="Enter benefit"
                            value={formData.benefit}
                            onChange={handleInputChange}
                        />
                    </form>
                    <Button
                        onClick={handleConfirmEdit}
                    >
                        Ok
                    </Button>
            </Modal>
            
            {/* DELETE */}
            <Modal isOpen={isDeleteModalOpen} onClose={handleModalClose} onConfirm={handleModalClose}>
                <div className="w-full flex flex-col items-center">
                        <h2 className="text-2xl font-bold text-orange-2">Confirm Delete</h2>
                        <span className="text-gray-2">Are you sure you want to delete</span>
                </div>
                    <h2 className="p-6 text-2xl text-bold text-gray-1">{selectedDriverPartner?.partner_name}</h2>
                <div className="flex justify-between w-full mt-4 gap-2">
                    <CancelButton 
                        onClick={handleModalClose}
                    >
                        Cancel
                    </CancelButton>
                    <DeleteButton
                        onClick={handleConfirmDelete}
                    >
                        Delete
                    </DeleteButton>
                </div>
            </Modal>
        </div>
    );
}
