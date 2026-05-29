import { useEffect, useState } from "react";
import API from "../../api/axios";

function Alerts() {

  const [lowStockAlerts, setLowStockAlerts] = useState([]);

  const [expiryAlerts, setExpiryAlerts] = useState([]);

  // FETCH LOW STOCK ALERTS

  const getLowStockAlerts = async () => {

    try {

      const response = await API.get(
        "/alerts/low-stock"
      );

      setLowStockAlerts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH EXPIRY ALERTS

  const getExpiryAlerts = async () => {

    try {

      const response = await API.get(
        "/alerts/expiry"
      );

      setExpiryAlerts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    getLowStockAlerts();

    getExpiryAlerts();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Alerts Dashboard
      </h1>

      {/* LOW STOCK ALERTS */}

      <div className="mb-10">

        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Low Stock Alerts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {
            lowStockAlerts.length > 0
              ? (
                  lowStockAlerts.map((alert) => (

                    <div
                      key={alert.medicineId}
                      className="bg-white p-6 rounded-xl shadow border-l-4 border-red-500"
                    >

                      <h3 className="text-xl font-bold mb-2">
                        {alert.medicineName}
                      </h3>

                      <p className="text-gray-700">
                        Quantity Left:
                        <span className="font-bold text-red-500 ml-2">
                          {alert.quantity}
                        </span>
                      </p>

                      <p className="mt-3 text-red-500 font-medium">
                        {alert.alertMessage}
                      </p>

                    </div>
                  ))
                )
              : (
                  <p className="text-gray-500">
                    No low stock alerts
                  </p>
                )
          }

        </div>

      </div>

      {/* EXPIRY ALERTS */}

      <div>

        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
          Expiry Alerts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {
            expiryAlerts.length > 0
              ? (
                  expiryAlerts.map((alert) => (

                    <div
                      key={alert.medicineId}
                      className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500"
                    >

                      <h3 className="text-xl font-bold mb-2">
                        {alert.medicineName}
                      </h3>

                      <p className="text-gray-700">
                        Expiry Date:
                        <span className="font-bold ml-2">
                          {alert.expiryDate}
                        </span>
                      </p>

                      <p className="text-gray-700 mt-2">
                        Days Left:
                        <span className="font-bold text-yellow-500 ml-2">
                          {alert.daysLeft}
                        </span>
                      </p>

                      <p className="mt-3 text-yellow-600 font-medium">
                        {alert.alertMessage}
                      </p>

                    </div>
                  ))
                )
              : (
                  <p className="text-gray-500">
                    No expiry alerts
                  </p>
                )
          }

        </div>

      </div>
    </div>
  );
}

export default Alerts;