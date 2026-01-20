import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTimes, FaPlusCircle, FaFilter } from "react-icons/fa";
import { getContacts, deleteContact } from "../api/contactsApi";
import ContactModal from "./ContactModal";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("default");
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

    /* 🔍 SEARCH */
    const filteredContacts = contacts.filter((c) => {
        const query = searchTerm.toLowerCase();
        return (
            c.firstName?.toLowerCase().includes(query) ||
            c.lastName?.toLowerCase().includes(query) ||
            c.email?.toLowerCase().includes(query) ||
            c.phone?.toLowerCase().includes(query)
        );
    });

    /* 🔽 SORT */
    const sortedContacts = [...filteredContacts].sort((a, b) => {
        if (sortOption === "fname") {
            return a.firstName.localeCompare(b.firstName);
        }
        if (sortOption === "lname") {
            return a.lastName.localeCompare(b.lastName);
        }
        if (sortOption === "oldest") {
            return a.id - b.id;
        }
        return 0;
    });

    return (
        <>
            <Navbar />

            <div className="p-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <h1 className="text-2xl font-bold">All Contacts</h1>

                    <button
                        onClick={() => navigate("/add")}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        <FaPlusCircle /> Add New
                    </button>
                </div>

                {/* Search + Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-2/3 px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                    />

                    <div className="flex items-center gap-2 w-full md:w-1/3">
                        <FaFilter className="text-green-600" />
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                        >
                            <option value="default">Default</option>
                            <option value="fname">First Name (A → Z)</option>
                            <option value="lname">Last Name (A → Z)</option>
                            <option value="oldest">Oldest To First</option>
                        </select>
                    </div>
                </div>

                {/* Table / Empty State */}
                {sortedContacts.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 text-lg">
                        No Contact Information
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white shadow rounded">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3">#</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Phone</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedContacts.map((c, i) => (
                                    <tr
                                        key={c.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-3">{i + 1}</td>
                                        <td className="p-3">
                                            {c.firstName} {c.lastName}
                                        </td>
                                        <td className="p-3">{c.email}</td>
                                        <td className="p-3">{c.phone}</td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelected(c);
                                                        setIsOpen(true);
                                                    }}
                                                    className="text-blue-600"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/edit/${c.id}`,
                                                        )
                                                    }
                                                    className="text-gray-600"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(c.id)
                                                    }
                                                    className="text-red-600"
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
                )}

                {/* Modal */}
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
