const BASE_URL = "https://contact-json-j1s2.onrender.com/contacts";

export const getContacts = async () => {
    const res = await fetch(BASE_URL);
    return res.json();
};

export const getContactById = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    return res.json();
};

export const createContact = async (data) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const updateContact = async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const deleteContact = async (id) => {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
