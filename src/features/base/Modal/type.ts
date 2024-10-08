import { InputHTMLAttributes, ReactNode } from "react";

export type ModalProps = InputHTMLAttributes<HTMLInputElement> & {
    isOpen: boolean;
    onClose: any;
    onConfirm: any;
    children: React.ReactNode;  
};
