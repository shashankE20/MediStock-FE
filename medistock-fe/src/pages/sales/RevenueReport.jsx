import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import API from "../../api/axios";

function RevenueReport() {

    const [sales, setSales] = useState([]);

    const [filter, setFilter] = useState("daily");

    useEffect(() => {

        fetchSales();

    }, []);

    const fetchSales = async () => {

        const response =
            await API.get("/sales");

        setSales(response.data);

    };

    const groupedRevenue =
        sales.reduce((acc, sale) => {

            const date =
                new Date(sale.soldAt);

            let key;

            if (filter === "daily") {

                key =
                    date.toLocaleDateString();

            }

            else if (filter === "monthly") {

                key =
                    `${date.getMonth() + 1}-${date.getFullYear()}`;

            }

            else {

                key =
                    date.getFullYear();

            }

            acc[key] =
                (acc[key] || 0)
                +
                sale.totalPrice;

            return acc;

        }, {});

    return (

        <MainLayout>

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Revenue Report
                </h1>

                <div className="flex gap-3 mb-6">

                    <button
                        onClick={() => setFilter("daily")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Daily
                    </button>

                    <button
                        onClick={() => setFilter("monthly")}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Monthly
                    </button>

                    <button
                        onClick={() => setFilter("yearly")}
                        className="bg-purple-600 text-white px-4 py-2 rounded"
                    >
                        Yearly
                    </button>

                </div>

                {/* <table>
                    <thead>
                        <tr>
                            <th>Medicine</th>
                            <th>Quantity Sold</th>
                            <th>Revenue</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>

                        {sales.map((sale) => (
                            <tr key={sale.id}>

                                <td>{sale.medicineName}</td>

                                <td>{sale.quantitySold}</td>

                                <td>₹ {sale.totalPrice}</td>

                                <td>
                                    {
                                        new Date(sale.soldAt)
                                            .toLocaleDateString()
                                    }
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </table> */}

                <table className="w-full bg-white">

                    <thead>

                        <tr>

                            <th className="p-3 border">Date</th>
                            <th className="p-3 border">Medicine</th>
                            <th className="p-3 border">Quantity Sold</th>
                            <th className="p-3 border">Revenue</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            Object.entries(groupedRevenue)
                                .map(([date, revenue, medicineName, quantity]) => (

                                    <tr key={date}>

                                        <td className="border p-3">
                                            {date}
                                        </td>

                                        <td className="border p-3">
                                            {medicineName}
                                        </td>
                                        <td className="border p-3">
                                            {quantity}
                                        </td>

                                        <td className="border p-3">
                                            ₹ {revenue}
                                        </td>

                                    </tr>

                                    

                                ))
                        }

                    </tbody>

                </table>

            </div>

        </MainLayout>
    );
}

export default RevenueReport;