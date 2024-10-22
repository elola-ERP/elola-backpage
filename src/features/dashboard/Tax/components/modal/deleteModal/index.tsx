import { DeleteModalProps } from "./types";

export default function DeleteModal({
    isDeleteModalOpen,
    handleDeleteCancel,
    handleDeleteConfirm,
}: DeleteModalProps) {
    if (!isDeleteModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Delete Tax</h2>
                <p className="mb-4">Are you sure you want to delete this tax?</p>
                <div className="flex justify-between">
                    <button onClick={handleDeleteCancel} className="bg-gray-500 text-white p-2 rounded">
                        Cancel
                    </button>
                    <button onClick={handleDeleteConfirm} className="bg-red-500 text-white p-2 rounded">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}