import { useEffect, useState } from 'react';
import { axiosInstance } from '@/src/api/axiosClient';
import { Tax } from '@/src/assets';

export const useTaxPageHooks = () => {
    const [taxes, setTaxes] = useState<Tax[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        tax_id: 0,
        tax_type: '',
        tax_name: '',
        tax_value: 0,
        tax_status: true,
    });
    const [errors, setErrors] = useState({
        tax_type: '',
        tax_name: '',
        tax_value: '',
    });
    const [selectedTax, setSelectedTax] = useState<Tax | null>(null);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [taxValueError, setTaxValueError] = useState<string>("");

    const fetchTaxes = async (page = 1) => {
        try {
            const response = await axiosInstance.get(`/tax`, {
                params: { page, limit: 10 },
            });

            const { taxes } = response.data.data;
            const { meta } = response.data.data;
            
            setTaxes(taxes);
            setTotalPages(parseInt(meta['Total Pages']));
            setCurrentPage(parseInt(meta['Current Page']))
        } catch (error) {
            console.error('Error fetching taxes', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTaxes(currentPage);
    }, [currentPage]);

    const handleModalOpen = (type: any, tax: Tax) => {
        if(type === 'add') {
        setFormData({ tax_id: 0, tax_name: '', tax_type: '', tax_value: 0, tax_status: true });
        setIsAddModalOpen(true);
        } else if (type === 'edit' && tax) {
        setSelectedTax(tax);
        setFormData({
            tax_id: tax.tax_id,
            tax_type: tax.tax_type,
            tax_name: tax.tax_name,
            tax_value: tax.tax_value,
            tax_status: tax.tax_status,
        });
        setIsEditModalOpen(true);
        } else if (type === 'delete' && tax) {
        setSelectedTax(tax);
        setIsDeleteModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setIsAddModalOpen(false);
        setIsSecondModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedTax(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'tax_value') {
            handleTaxValueChange(e);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleTaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value > 100) {
            setTaxValueError("The number must not be more than 100");
        } else {
            setTaxValueError("");
            setFormData((prevData) => ({ ...prevData, tax_value: value }));
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            tax_type: '',
            tax_name: '',
            tax_value: taxValueError,
        };

        if (!formData.tax_type) {
            newErrors.tax_type = 'Type is required';
            isValid = false;
        }
        if (!formData.tax_name) {
            newErrors.tax_name = 'Name is required';
            isValid = false;
        }
        if (taxValueError) {
            isValid = false;
        }

        setErrors(newErrors);
        return isValid; 
    };

    return {
        taxes,
        currentPage,
        totalPages,
        isAddModalOpen,
        isSecondModalOpen,
        isEditModalOpen,
        isDeleteModalOpen,
        formData,
        errors,
        selectedTax,
        loading,
        setFormData,
        setCurrentPage,
        fetchTaxes,
        handleModalOpen,
        handleModalClose,
        setIsSecondModalOpen,
        setIsAddModalOpen,
        handleInputChange,
        validateForm,
    };
};