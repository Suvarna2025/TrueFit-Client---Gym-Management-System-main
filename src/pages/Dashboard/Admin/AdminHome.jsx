import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data = {}, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const result = await axiosSecure.get("/financial-overview");
      return result.data;
    },
  });

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const result = await axiosSecure.get("/subscribers-vs-members");
      return result.data;
    },
  });

  if (isLoading || statsLoading) return <Loading></Loading>;

  const transactions = data?.latestTransactions;
  const totalBalance = data?.totalBalance;

  // Data for Bar and Pie Charts
  const chartData = [
    { name: "Paid Members", value: stats?.totalPaidMembers },
    { name: "Newsletter Subscribers", value: stats?.totalSubscribers },
  ];

  const COLORS = ["#2196F3", "#4CAF50"];

  return (
    <div>
      <Helmet>
        <title>TrueFit - Hey Admin, Your Dashboard Here!.</title>
      </Helmet>
      {/* Total Balance Section */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Total Balance
        </h2>
        <p className="text-4xl font-semibold text-green-600 dark:text-green-400">${totalBalance}</p>
      </div>
      <hr className="my-8" />

      {/* Recent Transactions Section */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-200">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-600">
                <th className="text-left px-4 py-2 border-b">#</th>
                <th className="text-left px-4 py-2 border-b">Member</th>
                <th className="text-left px-4 py-2 border-b">Amount</th>
                <th className="text-left px-4 py-2 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{transaction.userName}</td>
                  <td className="px-4 py-2 border-b text-green-600">
                    ${transaction.price}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {transaction.date.split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <hr className="my-8" />

      {/* Chart Section */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Subscribers vs Paid Members
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bar Chart */}
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill={(entry, index) => COLORS[index % COLORS.length]}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
