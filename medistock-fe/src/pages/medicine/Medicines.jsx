import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
    FaEdit,
    FaTrashAlt,
    FaSearch,
    FaCapsules,
    FaBoxes
} from "react-icons/fa";

function Medicines() {

    const [medicines, setMedicines] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const medicinesPerPage = 10;

    const [editId, setEditId] = useState(null);

    const [debouncedSearch, setDebouncedSearch] = useState("");

    const navigate = useNavigate();

    const location = useLocation();

    const showLowStock= location.pathname === "/medicines/low-stock";

    const showExpiry= location.pathname === "/medicines/expiry";

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
            setShowForm(false);

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

        setShowForm(true);

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
            setShowForm(false);

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

            toast.success("Medicines Deleted successfully");

            fetchMedicines();

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchMedicines();

    }, []);

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearch(searchTerm);

        }, 500);

        return () => clearTimeout(timer);

    }, [searchTerm]);

    const filteredMedicines = medicines
    .filter((medicine) => {

        if (showLowStock) {
            return medicine.quantity <= 10;
        }

        if (showExpiry){

            const today = new Date();
            const expiry = new Date(medicine.expiryDate);

            const diffDays = Math.ceil((expiry - today)/(1000*60*60*24));
            return diffDays >=0 && diffDays <= 30;
        }

        return true;
    })
    .filter((medicine) => {

        const search =
            debouncedSearch.toLowerCase();

        return (
            medicine.medicineName
                ?.toLowerCase()
                .includes(search)

            ||

            medicine.manufacturer
                ?.toLowerCase()
                .includes(search)
        );
    });

    // const filteredMedicines = medicines.filter((medicine) => {

    //     const search = debouncedSearch.toLowerCase();

    //     return (

    //         medicine.medicineName
    //             ?.toLowerCase()
    //             .includes(search)

    //         ||

    //         medicine.manufacturer
    //             ?.toLowerCase()
    //             .includes(search)

    //         ||

    //         medicine.expiryDate
    //             ?.toLowerCase()
    //             .includes(search)

    //     );
    // });

    const indexOfLastMedicine =
        currentPage * medicinesPerPage;

    const indexOfFirstMedicine =
        indexOfLastMedicine - medicinesPerPage;

    const currentMedicines =
        filteredMedicines.slice(
            indexOfFirstMedicine,
            indexOfLastMedicine
        );

    const totalPages = Math.ceil(
        filteredMedicines.length /
        medicinesPerPage
    );

    const resetForm = () => {

        setFormData({
            medicineName: "",
            quantity: "",
            price: "",
            expiryDate: "",
            manufacturer: "",
        });

        setEditId(null);

        setShowForm(false);
    };


    const handlePrevious = () => {

        if (currentPage > 1) {

            setCurrentPage(
                currentPage - 1
            );
        }
    };

    const handleNext = () => {

        if (currentPage < totalPages) {

            setCurrentPage(
                currentPage + 1
            );
        }
    };

    return (

        <MainLayout>
            <div className="min-h-screen bg-gray-100 p-6">

                
                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-4xl font-bold text-gray-800">
                        Medicines Management
                    </h1>

                    <button
                        onClick={() => {

                            setEditId(null);

                            setFormData({
                                medicineName: "",
                                quantity: "",
                                price: "",
                                expiryDate: "",
                                manufacturer: "",
                            });

                            setShowForm(true);
                        }}
                        className="
        bg-green-700
        hover:bg-green-900
        text-white
        px-6
        py-3
        rounded-xl
        font-medium
        "
                    >
                        + Add Medicine
                    </button>

                </div>

                {
                    showForm && (

                        <div className="bg-white p-6 rounded-3xl shadow-sm border mb-8">

                            <div className="flex justify-between items-center mb-4">

                                <h2 className="text-2xl font-semibold">

                                    {
                                        editId
                                            ? "Update Medicine"
                                            : "Add Medicine"
                                    }

                                </h2>

                                <button
                                    onClick={resetForm}
                                    className="
                    text-red-500
                    font-medium
                    "
                                >
                                    Close
                                </button>

                            </div>

                            <form
                                onSubmit={
                                    editId
                                        ? updateMedicine
                                        : addMedicine
                                }
                                className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-4
                "
                            >

                                <input
                                    type="text"
                                    name="medicineName"
                                    placeholder="Medicine Name"
                                    value={formData.medicineName}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                    required
                                />

                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                    required
                                />

                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                    required
                                />

                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                    required
                                />

                                <input
                                    type="text"
                                    name="manufacturer"
                                    placeholder="Manufacturer"
                                    value={formData.manufacturer}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                    required
                                />

                                <div className="flex gap-3">

                                    <button
                                        type="submit"
                                        className={`
                        text-white
                        px-6
                        rounded-lg
                        ${editId
                                                ? "bg-yellow-500 hover:bg-yellow-600"
                                                : "bg-blue-600 hover:bg-blue-700"
                                            }
                        `}
                                    >
                                        {
                                            editId
                                                ? "Update"
                                                : "Add"
                                        }
                                    </button>

                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="
                        bg-gray-500
                        text-white
                        px-6
                        rounded-lg
                        "
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        </div>
                    )
                }

                <div className="mb-4 ">

                    <input
                        type="text"
                        placeholder="Search Medicine..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border p-3 rounded-4xl "
                    />

                </div>

                {/* MEDICINES TABLE */}

                <div className="bg-white p-6 rounded-3xl shadow-sm border overflow-x-auto">


                    <h2 className="text-2xl font-semibold mb-4">
                        Medicines List
                    </h2>

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-gray-200 text-gray-700">

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
                                    Status
                                </th>

                                <th className="p-3 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                currentMedicines.map((medicine) => (

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

                                        <td className="p-3">

                                            {
                                                medicine.quantity === 0 ? (

                                                    <span className="
      bg-red-100
      text-red-600
      px-3
      py-1
      rounded-full
      text-sm
      ">
                                                        Out Of Stock
                                                    </span>

                                                ) : medicine.quantity <= 10 ? (

                                                    <span className="
      bg-yellow-100
      text-yellow-600
      px-3
      py-1
      rounded-full
      text-sm
      ">
                                                        Low Stock
                                                    </span>

                                                ) : (

                                                    <span className="
      bg-green-100
      text-green-600
      px-3
      py-1
      rounded-full
      text-sm
      ">
                                                        In Stock
                                                    </span>

                                                )
                                            }

                                        </td>

                                        <td className="p-3 flex gap-2">

                                            <button
                                                onClick={() =>
                                                    editMedicine(medicine)
                                                }
                                                className="
  text-yellow-500
  hover:text-yellow-700
  text-lg
  "
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteMedicine(medicine.id)
                                                }
                                                className="
  text-red-500
  hover:text-red-700
  text-lg
  "
                                            >
                                                <FaTrashAlt />
                                            </button>

                                        </td>

                                    </tr>
                                )
                                )

                            }

                        </tbody>

                    </table>

                    <div className="
flex
justify-between
items-center
mt-6
">

                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="
        bg-gray-500
        hover:bg-gray-700
        text-white
        px-4
        py-2
        rounded-lg
        disabled:opacity-50
        "
                        >
                           ← Previous
                        </button>

                        <span className="font-semibold">

                            Page {currentPage} of {totalPages}

                        </span>

                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="
        bg-gray-600
        hover:bg-gray-900
        text-white
        px-4
        py-2
        rounded-lg
        disabled:opacity-50
        "
                        >
                            Next
                        </button>

                    </div>

                </div>

                <div className="flex justify-left mt-6">

                    <button
                        onClick={() => navigate(-1)}
                        className="
        bg-gray-600
        hover:bg-gray-700
        text-white
        px-6
        py-3
        rounded-xl
        transition
        "
                    >
                        ← Back
                    </button>

                </div>

            </div>
        </MainLayout>
    );
}

export default Medicines;