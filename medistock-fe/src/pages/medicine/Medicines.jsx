import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import API from "../../api/axios";

import { toast } from "react-toastify";

function Medicines() {

    const [medicines, setMedicines] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        medicineName: "",
        quantity: "",
        price: "",
        expiryDate: "",
        manufacturer: "",
    });

    // FETCH ALL MEDICINES

    const fetchMedicines = async () => {

        try {

            const response = await API.get(
                "/medicines"
            );

            setMedicines(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // HANDLE INPUT CHANGE

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ADD MEDICINE

    const addMedicine = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/medicines",
                {
                    ...formData,
                    quantity: Number(formData.quantity),
                    price: Number(formData.price),
                }
            );
            toast.success("Medicines added successfully")

            fetchMedicines();

            setFormData({
                medicineName: "",
                quantity: "",
                price: "",
                expiryDate: "",
                manufacturer: "",
            });

        } catch (error) {

            console.log(error);
        }
    };

    // EDIT MEDICINE

    const editMedicine = (medicine) => {

        setEditId(medicine.id);

        setFormData({
            medicineName: medicine.medicineName,
            quantity: medicine.quantity,
            price: medicine.price,
            expiryDate: medicine.expiryDate,
            manufacturer: medicine.manufacturer,
        });
    };

    // UPDATE MEDICINE

    const updateMedicine = async (e) => {

        e.preventDefault();

        try {

            await API.put(
                `/medicines/${editId}`,
                {
                    ...formData,
                    quantity: Number(formData.quantity),
                    price: Number(formData.price),
                }
            );

            toast.success("Medicines Updated successfully");
            fetchMedicines();

            setEditId(null);

            setFormData({
                medicineName: "",
                quantity: "",
                price: "",
                expiryDate: "",
                manufacturer: "",
            });

        } catch (error) {

            console.log(error);
        }
    };

    // DELETE MEDICINE

    const deleteMedicine = async (id) => {

        try {

            await API.delete(
                `/medicines/${id}`
            );

            toast.success("Medicines deleted successfully");

            fetchMedicines();

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchMedicines();

    }, []);

    const filteredMedicines = medicines.filter(
        (medicine) =>
            medicine.medicineName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );
    return (

        <MainLayout>
            <div className="min-h-screen bg-gray-100 p-6">

                <h1 className="text-4xl font-bold text-blue-600 mb-6">
                    Medicines Management
                </h1>

                {/* ADD / UPDATE FORM */}

                <div className="bg-white p-6 rounded-xl shadow mb-8">

                    <h2 className="text-2xl font-semibold mb-4">

                        {
                            editId
                                ? "Update Medicine"
                                : "Add Medicine"
                        }

                    </h2>

                    <form
                        onSubmit={
                            editId
                                ? updateMedicine
                                : addMedicine
                        }
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >

                        <input
                            type="text"
                            name="medicineName"
                            placeholder="Medicine Name"
                            value={formData.medicineName}
                            onChange={handleChange}
                            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <input
                            type="text"
                            name="manufacturer"
                            placeholder="Manufacturer"
                            value={formData.manufacturer}
                            onChange={handleChange}
                            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <button
                            type="submit"
                            className={`text-white rounded-lg p-3 transition ${editId
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >

                            {
                                editId
                                    ? "Update Medicine"
                                    : "Add Medicine"
                            }

                        </button>

                    </form>

                </div>

                {/* MEDICINES TABLE */}

                <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">


                    <div className="mb-4">

                        <input
                            type="text"
                            placeholder="Search Medicine..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border p-3 rounded-lg w-full"
                        />

                    </div>
                    <h2 className="text-2xl font-semibold mb-4">
                        Medicines List
                    </h2>

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-blue-600 text-white">

                                <th className="p-3 text-left">
                                    Medicine
                                </th>

                                <th className="p-3 text-left">
                                    Quantity
                                </th>

                                <th className="p-3 text-left">
                                    Price
                                </th>

                                <th className="p-3 text-left">
                                    Expiry Date
                                </th>

                                <th className="p-3 text-left">
                                    Manufacturer
                                </th>

                                <th className="p-3 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                filteredMedicines.map((medicine) => (

                                    <tr
                                        key={medicine.id}
                                        className="border-b hover:bg-gray-50"
                                    >

                                        <td className="p-3">
                                            {medicine.medicineName}
                                        </td>

                                        <td className="p-3">
                                            {medicine.quantity}
                                        </td>

                                        <td className="p-3">
                                            ₹ {medicine.price}
                                        </td>

                                        <td className="p-3">
                                            {medicine.expiryDate}
                                        </td>

                                        <td className="p-3">
                                            {medicine.manufacturer}
                                        </td>

                                        <td className="p-3 flex gap-2">

                                            <button
                                                onClick={() =>
                                                    editMedicine(medicine)
                                                }
                                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteMedicine(medicine.id)
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>
        </MainLayout>
    );
}

export default Medicines;