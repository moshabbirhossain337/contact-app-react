import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";

export default function ContactModal({
    isOpen,
    contact,
    onClose,
    onEdit,
    onDelete,
}) {
    if (!isOpen || !contact) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="font-semibold text-lg">Contact Details</h2>
                    <button onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="p-6 space-y-3">
                    <Detail label="First Name" value={contact.firstName} />
                    <Detail label="Last Name" value={contact.lastName} />
                    <Detail label="Email" value={contact.email} />
                    <Detail label="Phone" value={contact.phone} />
                    <Detail label="Address" value={contact.address} />
                </div>

                <div className="flex justify-end gap-3 px-6 py-4 border-t">
                    <button
                        onClick={onEdit}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        <FaEdit /> Edit
                    </button>

                    <button
                        onClick={() => onDelete(contact.id)}
                        className="px-4 py-2 border border-red-600 text-red-600 rounded"
                    >
                        <FaTrash /> Delete
                    </button>

                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div className="grid grid-cols-3 gap-4">
            <span className="font-medium">{label}</span>
            <span className="col-span-2 text-gray-600">{value || "—"}</span>
        </div>
    );
}
