import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTimes, FaPlusCircle } from "react-icons/fa";
import { getContacts, deleteContact } from "../api/contactsApi";
import ContactModal from "./ContactModal";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [selected, setSelected] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        const data = await getContacts();
        setContacts(data);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this contact?")) return;
        await deleteContact(id);
        setIsOpen(false);
        loadContacts();
    };

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">All Contacts</h1>

                    <button
                        onClick={() => navigate("/add")}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        <FaPlusCircle />
                        <span>Add New</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contacts.map((c, i) => (
                                <tr
                                    key={c.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="p-3">{i + 1}</td>

                                    <td className="p-3 font-medium">
                                        {c.firstName} {c.lastName}
                                    </td>

                                    <td className="p-3">{c.email}</td>

                                    <td className="p-3">{c.phone}</td>

                                    <td className="p-3">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                className="text-blue-600 hover:text-blue-800"
                                                onClick={() => {
                                                    setSelected(c);
                                                    setIsOpen(true);
                                                }}
                                            >
                                                <FaEye />
                                            </button>

                                            <button
                                                className="text-yellow-600 hover:text-yellow-800"
                                                onClick={() =>
                                                    navigate(`/edit/${c.id}`)
                                                }
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                className="text-red-600 hover:text-red-800"
                                                onClick={() =>
                                                    handleDelete(c.id)
                                                }
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <ContactModal
                    isOpen={isOpen}
                    contact={selected}
                    onClose={() => setIsOpen(false)}
                    onEdit={() => navigate(`/edit/${selected?.id}`)}
                    onDelete={handleDelete}
                />
            </div>
        </>
    );
}
