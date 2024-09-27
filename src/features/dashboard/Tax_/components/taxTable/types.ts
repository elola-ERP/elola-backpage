import { Tax } from '@/src/assets';

export interface TaxTableProps {
    taxes: Tax[];
    handleModalOpen: (type: string, tax: Tax) => void;
}