import React from 'react';
import { RefreshCw, Calculator } from 'lucide-react';
import { useCalculator } from '../context/CalculatorContext';

const Dashboard = () => {
  const {
    milestones,
    projection,
    formatCurrency,
    formatRange,
    resetToDefaults,
    handleCalculate,
    calculateCosts,
    pricing,
    isCalculating
  } = useCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-vebuiln-sky-blue to-vebuiln-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-vebuiln-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📊</div>
              <div>
                <h1 className="text-3xl font-bold text-vebuiln-charcoal">Cost Calculator Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Real-time cost projections and analysis</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={resetToDefaults}
                className="flex items-center gap-2 bg-vebuiln-text text-vebuiln-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                <RefreshCw className="w-5 h-5" />
                Reset
              </button>
              <button
                onClick={handleCalculate}
                disabled={isCalculating}
                className="flex items-center gap-2 bg-vebuiln-corporate-blue text-vebuiln-white px-4 py-2 rounded-lg hover:bg-vebuiln-sky-blue transition disabled:opacity-50"
              >
                <Calculator className="w-5 h-5" />
                {isCalculating ? 'Calculating...' : 'Calculate'}
              </button>
            </div>
          </div>
        </div>

        {/* Key Milestones */}
        <div className="bg-vebuiln-white rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📍 Key Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border-2 border-indigo-200 hover:shadow-lg transition">
                <div className="text-sm font-semibold text-indigo-600 mb-1">
                  {milestone.month === 0 ? '🧪 Phase-0' : `📅 Month ${milestone.month}`}
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  🏪 {milestone.stores} {milestone.stores === 1 ? 'Store' : 'Stores'}
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Running:</span>
                    <span className="font-semibold">{milestone.monthlyTotalMin !== undefined ? formatRange(milestone.monthlyTotalMin, milestone.monthlyTotalMax) : formatCurrency(milestone.monthlyTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cumulative:</span>
                    <span className="font-semibold text-indigo-600">{milestone.cumulativeCostMin !== undefined ? formatRange(milestone.cumulativeCostMin, milestone.cumulativeCostMax) : formatCurrency(milestone.cumulativeCost)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Projection Table */}
        <div className="bg-vebuiln-white rounded-lg shadow-xl p-6 overflow-hidden">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Detailed Monthly Projection</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Month</th>
                  <th className="px-4 py-3 text-left">Phase</th>
                  <th className="px-4 py-3 text-right">Stores</th>
                  <th className="px-4 py-3 text-right">New Stores</th>
                  <th className="px-4 py-3 text-right">Hardware CAPEX Min</th>
                  <th className="px-4 py-3 text-right">Hardware CAPEX Max</th>
                  <th className="px-4 py-3 text-right">AWS Cost</th>
                  <th className="px-4 py-3 text-right">Maintenance Min</th>
                  <th className="px-4 py-3 text-right">Maintenance Max</th>
                  <th className="px-4 py-3 text-right">Monthly Running Min</th>
                  <th className="px-4 py-3 text-right">Monthly Running Max</th>
                  <th className="px-4 py-3 text-right">Cumulative Min</th>
                  <th className="px-4 py-3 text-right">Cumulative Max</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projection.map((row, idx) => (
                  <tr key={idx} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition`}>
                    <td className="px-4 py-3 font-medium">
                      {row.month === 0 ? 'Phase-0' : `M${row.month}`}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{row.phase}</td>
                    <td className="px-4 py-3 text-right font-semibold">{row.stores}</td>
                    <td className="px-4 py-3 text-right text-green-600 font-semibold">
                      {row.newStores > 0 ? `+${row.newStores}` : '-'}
                    </td>
                    <td className="px-4 py-3 text-right text-orange-600">
                      {row.hardwareCostMin !== undefined ? formatCurrency(row.hardwareCostMin) : formatCurrency(row.hardwareCost)}
                    </td>
                    <td className="px-4 py-3 text-right text-orange-600">
                      {row.hardwareCostMax !== undefined ? formatCurrency(row.hardwareCostMax) : formatCurrency(row.hardwareCost)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {formatCurrency(row.awsCost)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {row.maintenanceCostMin !== undefined ? formatCurrency(row.maintenanceCostMin) : formatCurrency(row.maintenanceCost)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {row.maintenanceCostMax !== undefined ? formatCurrency(row.maintenanceCostMax) : formatCurrency(row.maintenanceCost)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {row.monthlyTotalMin !== undefined ? formatCurrency(row.monthlyTotalMin) : formatCurrency(row.monthlyTotal)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {row.monthlyTotalMax !== undefined ? formatCurrency(row.monthlyTotalMax) : formatCurrency(row.monthlyTotal)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-indigo-600">
                      {row.cumulativeCostMin !== undefined ? formatCurrency(row.cumulativeCostMin) : formatCurrency(row.cumulativeCost)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-indigo-600">
                      {row.cumulativeCostMax !== undefined ? formatCurrency(row.cumulativeCostMax) : formatCurrency(row.cumulativeCost)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cost Breakdown Summary */}
        <div className="bg-vebuiln-white rounded-lg shadow-xl p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💰 Per Store Cost Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <span className="font-medium text-gray-700">📹 Cameras ({pricing.camerasPerStore} × {formatRange(pricing.cameraUnitMin, pricing.cameraUnitMax)}):</span>
                <span className="font-bold text-gray-900">{formatRange(calculateCosts.perStore.cameraCostMin, calculateCosts.perStore.cameraCostMax)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <span className="font-medium text-gray-700">🖥️ Edge Devices ({formatRange(pricing.edgeDevicesPerStoreMin, pricing.edgeDevicesPerStoreMax)} × {formatRange(pricing.edgeDeviceUnitMin, pricing.edgeDeviceUnitMax)}):</span>
                <span className="font-bold text-gray-900">{formatRange(calculateCosts.perStore.edgeCostMin, calculateCosts.perStore.edgeCostMax)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <span className="font-medium text-gray-700">☁️ AWS (Monthly):</span>
                <span className="font-bold text-gray-900">{formatCurrency(calculateCosts.perStore.awsCost)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <span className="font-medium text-gray-700">🔧 Maintenance (Monthly):</span>
                <span className="font-bold text-gray-900">{formatRange(calculateCosts.perStore.maintenanceCostMin, calculateCosts.perStore.maintenanceCostMax)}</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center p-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-lg border-2 border-indigo-300">
                <div className="text-sm text-gray-600 mb-2">💵 Total Monthly Running Cost per Store</div>
                <div className="text-5xl font-bold text-indigo-600 mb-2">
                  {formatRange(calculateCosts.perStore.totalMonthlyMin, calculateCosts.perStore.totalMonthlyMax)}
                </div>
                <div className="text-sm text-gray-500">
                  (AWS + Maintenance Only)
                </div>
                <div className="mt-4 text-xs text-gray-600 bg-white p-2 rounded">
                  Hardware CAPEX: {formatRange(calculateCosts.perStore.hardwareCostMin, calculateCosts.perStore.hardwareCostMax)} (one-time)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;