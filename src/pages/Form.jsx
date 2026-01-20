import { useEffect, useState } from "react";
import {
    createContact,
    getContactById,
    updateContact,
} from "../api/contactsApi";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Form() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getContactById(id).then(setForm);
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        id ? await updateContact(id, form) : await createContact(form);
        navigate("/");
    };

    return (
        <>
            <Navbar />
            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto p-6 space-y-4"
            >
                <h2 className="text-xl font-bold">
                    {id ? "Edit" : "Add"} Contact
                </h2>

                {["firstName", "lastName", "email", "phone", "address"].map(
                    (f) => (
                        <input
                            key={f}
                            name={f}
                            value={form[f]}
                            onChange={handleChange}
                            placeholder={f}
                            className="w-full border px-3 py-2"
                            required={f !== "address"}
                        />
                    ),
                )}

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Save
                </button>
            </form>
        </>
    );
}
