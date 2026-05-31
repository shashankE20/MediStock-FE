import { useEffect, useState } from "react";
import API from "../../api/axios";
import MainLayout from "../../layouts/MainLayout";
function AIInsights() {

    const [insights, setInsights] = useState([]);

    const fetchAIInsights = async () => {

        try {

            const response = await API.get(
                "/ai/insights"
            );

            setInsights(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchAIInsights();

    }, []);

    return (

        <MainLayout>
            <div className="min-h-screen bg-gray-100 p-6">

                <h1 className="text-4xl font-bold text-blue-600 mb-8">
                    AI Inventory Insights
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {
                        insights.length > 0
                            ? (
                                insights.map((item, index) => (

                                    <div
                                        key={index}
                                        className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600"
                                    >

                                        <h2 className="text-2xl font-bold text-purple-600 mb-4">
                                            {item.medicineName}
                                        </h2>

                                        {/* CURRENT STOCK */}

                                        <div className="mb-3">

                                            <p className="text-gray-600">
                                                Current Stock
                                            </p>

                                            <p className="text-xl font-semibold">
                                                {item.currentStock}
                                            </p>

                                        </div>

                                        {/* MONTHLY SALES */}

                                        <div className="mb-3">

                                            <p className="text-gray-600">
                                                Estimated Monthly Sales
                                            </p>

                                            <p className="text-xl font-semibold">
                                                {item.estimatedMonthlySales}
                                            </p>

                                        </div>

                                        {/* RUNOUT DAYS */}

                                        <div className="mb-3">

                                            <p className="text-gray-600">
                                                Estimated Runout Days
                                            </p>

                                            <p className="text-xl font-semibold text-red-500">
                                                {item.estimatedRunOutDays} Days
                                            </p>

                                        </div>

                                        {/* RECOMMENDATION */}

                                        <div className="mt-5 bg-purple-100 p-4 rounded-lg">

                                            <p className="font-medium text-purple-700">
                                                {item.recommendation}
                                            </p>

                                        </div>

                                    </div>
                                ))
                            )
                            : (
                                <p className="text-gray-500">
                                    No AI insights available
                                </p>
                            )
                    }

                </div>

            </div>
        </MainLayout>
    );
}

export default AIInsights;