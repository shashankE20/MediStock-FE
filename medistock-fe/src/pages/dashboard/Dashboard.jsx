import { useEffect, useState } from "react";
import API from "../../api/axios";

function Dashboard() {

  const [dashboardData, setDashboardData] = useState({
    totalMedicines: 0,
    totalStockQuantity: 0,
    lowStockCount: 0,
    expiryAlertCount: 0,
    totalSales: 0,
  });

  const getDashboardSummary = async () => {

    try {

      const response = await API.get(
        "/dashboard/summary"
      );

      setDashboardData(response.data);

    } catch (error) {

      console.log("Dashboard Error", error);
    }
  };

  useEffect(() => {

    getDashboardSummary();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        MediStock Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Medicines */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold">
            Total Medicines
          </h2>

          <p className="text-3xl mt-4 font-bold text-blue-600">
            {dashboardData.totalMedicines}
          </p>

        </div>

        {/* Total Stock */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold">
            Total Stock
          </h2>

          <p className="text-3xl mt-4 font-bold text-green-600">
            {dashboardData.totalStockQuantity}
          </p>

        </div>

        {/* Low Stock */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold">
            Low Stock Alerts
          </h2>

          <p className="text-3xl mt-4 font-bold text-red-500">
            {dashboardData.lowStockCount}
          </p>

        </div>

        {/* Expiry Alerts */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold">
            Expiry Alerts
          </h2>

          <p className="text-3xl mt-4 font-bold text-yellow-500">
            {dashboardData.expiryAlertCount}
          </p>

        </div>

      </div>

      {/* Total Sales Card */}

      <div className="mt-6">

        <div className="bg-white p-6 rounded-xl shadow w-full md:w-[300px]">

          <h2 className="text-xl font-semibold">
            Total Sales
          </h2>

          <p className="text-3xl mt-4 font-bold text-purple-600">
            {dashboardData.totalSales}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;