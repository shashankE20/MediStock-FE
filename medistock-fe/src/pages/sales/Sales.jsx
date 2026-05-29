import { useEffect, useState } from "react";
import API from "../../api/axios";

function Sales() {

  const [medicines, setMedicines] = useState([]);

  const [weeklyReport, setWeeklyReport] = useState([]);

  const [saleData, setSaleData] = useState({
    medicineId: "",
    quantitySold: "",
  });

  // FETCH MEDICINES

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

  // FETCH WEEKLY REPORT

  const fetchWeeklyReport = async () => {

    try {

      const response = await API.get(
        "/sales/weekly-report"
      );

      setWeeklyReport(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setSaleData({
      ...saleData,
      [e.target.name]: e.target.value,
    });
  };

  // SELL MEDICINE

  const sellMedicine = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        `/sales/sell/${saleData.medicineId}`,
        {
          quantitySold: Number(
            saleData.quantitySold
          ),
        }
      );

      alert("Medicine Sold Successfully");

      fetchMedicines();

      fetchWeeklyReport();

      setSaleData({
        medicineId: "",
        quantitySold: "",
      });

    } catch (error) {

      console.log(error);

      alert("Sale Failed");
    }
  };

  useEffect(() => {

    fetchMedicines();

    fetchWeeklyReport();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Sales Management
      </h1>

      {/* SELL MEDICINE FORM */}

      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h2 className="text-2xl font-semibold mb-4">
          Sell Medicine
        </h2>

        <form
          onSubmit={sellMedicine}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >

          {/* MEDICINE SELECT */}

          <select
            name="medicineId"
            value={saleData.medicineId}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >

            <option value="">
              Select Medicine
            </option>

            {
              medicines.map((medicine) => (

                <option
                  key={medicine.id}
                  value={medicine.id}
                >
                  {medicine.medicineName}
                </option>
              ))
            }

          </select>

          {/* QUANTITY */}

          <input
            type="number"
            name="quantitySold"
            placeholder="Quantity Sold"
            value={saleData.quantitySold}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            className="bg-green-600 text-white rounded-lg p-3 hover:bg-green-700"
          >
            Sell Medicine
          </button>

        </form>

      </div>

      {/* MEDICINES STOCK TABLE */}

      <div className="bg-white p-6 rounded-xl shadow mb-10 overflow-x-auto">

        <h2 className="text-2xl font-semibold mb-4">
          Current Stock
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

            </tr>

          </thead>

          <tbody>

            {
              medicines.map((medicine) => (

                <tr
                  key={medicine.id}
                  className="border-b"
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

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

      {/* WEEKLY SALES REPORT */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-semibold mb-4">
          Weekly High Sales Report
        </h2>

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-purple-600 text-white">

              <th className="p-3 text-left">
                Medicine
              </th>

              <th className="p-3 text-left">
                Quantity Sold
              </th>

            </tr>

          </thead>

          <tbody>

            {
              weeklyReport.length > 0
                ? (
                    weeklyReport.map((report, index) => (

                      <tr
                        key={index}
                        className="border-b"
                      >

                        <td className="p-3">
                          {report.medicineName}
                        </td>

                        <td className="p-3">
                          {report.totalQuantitySold}
                        </td>

                      </tr>
                    ))
                  )
                : (
                    <tr>

                      <td
                        colSpan="2"
                        className="p-3 text-center text-gray-500"
                      >
                        No sales data available
                      </td>

                    </tr>
                  )
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Sales;