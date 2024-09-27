import { CancelButton, DeleteButton, Modal } from "@/src/features";
import { deleteModalProps } from "./types";

export default function DeleteModal({isDeleteModalOpen, handleModalClose, selectedTax, handleConfirmDelete}: deleteModalProps) {
    return (
        <div>
            <Modal isOpen={isDeleteModalOpen} onClose={handleModalClose} onConfirm={handleModalClose}>
                <div className="w-full flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-orange-2">Confirm Delete</h2>
                    <span className="text-gray-2">Are you sure you want to delete</span>
                </div>
                <h2 className="p-6 text-2xl text-bold text-gray-1">{selectedTax?.tax_name}</h2>
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
};
