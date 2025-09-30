import React, { useState, useEffect } from 'react';
import { Download, FileText, Trash2, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useCalculator } from '../context/CalculatorContext';

const Reports = () => {
  const { projection, formatCurrency, formatRange, pricing, projectionMonths, setPricing, setProjectionMonths } = useCalculator();
  const [savedConfigs, setSavedConfigs] = useState([]);
  const [configName, setConfigName] = useState('');

  useEffect(() => {
    loadSavedConfigs();
  }, []);

  const loadSavedConfigs = () => {
    const configs = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('VeBuIn-belc-config-')) {
        try {
          const config = JSON.parse(localStorage.getItem(key));
          configs.push({ name: key.replace('VeBuIn-belc-config-', ''), ...config });
        } catch (e) {
          // Ignore invalid configs
        }
      }
    }
    setSavedConfigs(configs);
  };

  const exportToExcel = () => {
    const headers = [
      'Month', 'Phase', 'Total Stores', 'New Stores',
      'Hardware CAPEX Min (¥)', 'Hardware CAPEX Max (¥)',
      'AWS Cost (¥)', 'Maintenance Min (¥)', 'Maintenance Max (¥)',
      'Monthly Running Min (¥)', 'Monthly Running Max (¥)',
      'Monthly Total with CAPEX Min (¥)', 'Monthly Total with CAPEX Max (¥)',
      'Cumulative Min (¥)', 'Cumulative Max (¥)'
    ];

    const rows = projection.map(row => [
      row.month === 0 ? 'Phase-0' : `M${row.month}`,
      row.phase,
      row.stores,
      row.newStores,
      row.hardwareCostMin !== undefined ? Math.round(row.hardwareCostMin) : Math.round(row.hardwareCost || 0),
      row.hardwareCostMax !== undefined ? Math.round(row.hardwareCostMax) : Math.round(row.hardwareCost || 0),
      Math.round(row.awsCost),
      row.maintenanceCostMin !== undefined ? Math.round(row.maintenanceCostMin) : Math.round(row.maintenanceCost || 0),
      row.maintenanceCostMax !== undefined ? Math.round(row.maintenanceCostMax) : Math.round(row.maintenanceCost || 0),
      row.monthlyTotalMin !== undefined ? Math.round(row.monthlyTotalMin) : Math.round(row.monthlyTotal || 0),
      row.monthlyTotalMax !== undefined ? Math.round(row.monthlyTotalMax) : Math.round(row.monthlyTotal || 0),
      row.monthlyTotalWithCapexMin !== undefined ? Math.round(row.monthlyTotalWithCapexMin) : (row.monthlyTotalMin !== undefined ? Math.round(row.monthlyTotalMin) : Math.round(row.monthlyTotal || 0)),
      row.monthlyTotalWithCapexMax !== undefined ? Math.round(row.monthlyTotalWithCapexMax) : (row.monthlyTotalMax !== undefined ? Math.round(row.monthlyTotalMax) : Math.round(row.monthlyTotal || 0)),
      row.cumulativeCostMin !== undefined ? Math.round(row.cumulativeCostMin) : Math.round(row.cumulativeCost || 0),
      row.cumulativeCostMax !== undefined ? Math.round(row.cumulativeCostMax) : Math.round(row.cumulativeCost || 0)
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cost Projection');
    XLSX.writeFile(wb, 'VeBuIn_belc_cost_projection.xlsx');
  };

  const saveNamedConfig = () => {
    if (!configName.trim()) return;
    const config = { pricing, projectionMonths };
    localStorage.setItem(`VeBuIn-belc-config-${configName}`, JSON.stringify(config));
    setConfigName('');
    loadSavedConfigs();
  };

  const loadNamedConfig = (config) => {
    setPricing(config.pricing);
    setProjectionMonths(config.projectionMonths);
  };

  const deleteConfig = (name) => {
    localStorage.removeItem(`VeBuIn-belc-config-${name}`);
    loadSavedConfigs();
  };

  // Analysis data
  const totalHardwareCapex = projection.reduce((sum, row) => sum + (row.hardwareCostMin || 0), 0);
  const totalHardwareCapexMax = projection.reduce((sum, row) => sum + (row.hardwareCostMax || 0), 0);
  const totalAwsCost = projection.reduce((sum, row) => sum + row.awsCost, 0);
  const totalMaintenance = projection.reduce((sum, row) => sum + (row.maintenanceCostMin || 0), 0);
  const totalMaintenanceMax = projection.reduce((sum, row) => sum + (row.maintenanceCostMax || 0), 0);
  const finalCumulative = projection[projection.length - 1]?.cumulativeCostMin || 0;
  const finalCumulativeMax = projection[projection.length - 1]?.cumulativeCostMax || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-vebuiln-sky-blue to-vebuiln-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-vebuiln-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📊</div>
              <div>
                <h1 className="text-3xl font-bold text-vebuiln-charcoal">Reports & Analysis</h1>
                <p className="text-sm text-gray-500 mt-1">Data export, analysis, and configuration management</p>
              </div>
            </div>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <Download className="w-5 h-5" />
              Export to Excel
            </button>
          </div>
        </div>

        {/* Analysis Summary */}
        <div className="bg-vebuiln-white rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📈 Cost Analysis Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Hardware CAPEX</div>
              <div className="text-2xl font-bold text-blue-600">{formatRange(totalHardwareCapex, totalHardwareCapexMax)}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total AWS Cost</div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalAwsCost)}</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Maintenance</div>
              <div className="text-2xl font-bold text-yellow-600">{formatRange(totalMaintenance, totalMaintenanceMax)}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Final Cumulative Cost</div>
              <div className="text-2xl font-bold text-purple-600">{formatRange(finalCumulative, finalCumulativeMax)}</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Stores at End</div>
              <div className="text-2xl font-bold text-indigo-600">{projection[projection.length - 1]?.stores || 0}</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Average Monthly Cost</div>
              <div className="text-2xl font-bold text-red-600">{formatRange(finalCumulative / projectionMonths, finalCumulativeMax / projectionMonths)}</div>
            </div>
          </div>
        </div>

        {/* Saved Configurations */}
        <div className="bg-vebuiln-white rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💾 Saved Configurations</h2>
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              placeholder="Configuration name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vebuiln-primary focus:border-transparent"
            />
            <button
              onClick={saveNamedConfig}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <FileText className="w-4 h-4" />
              Save
            </button>
          </div>
          <div className="space-y-2">
            {savedConfigs.map((config) => (
              <div key={config.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">{config.name}</div>
                  <div className="text-sm text-gray-600">
                    Stores: {config.pricing.storesPerMonth}/month, Months: {config.projectionMonths}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => loadNamedConfig(config)}
                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm"
                  >
                    <Upload className="w-4 h-4" />
                    Load
                  </button>
                  <button
                    onClick={() => deleteConfig(config.name)}
                    className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {savedConfigs.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No saved configurations yet. Save your current settings above.
              </div>
            )}
          </div>
        </div>


        {/* Export Preview */}
        <div className="bg-vebuiln-white rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Export Preview (First 10 Rows)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Month</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Phase</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Stores</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Cumulative Min</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Cumulative Max</th>
                </tr>
              </thead>
              <tbody>
                {projection.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-2">{row.month === 0 ? 'Phase-0' : `M${row.month}`}</td>
                    <td className="border border-gray-300 px-4 py-2">{row.phase}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{row.stores}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(row.cumulativeCostMin || 0)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(row.cumulativeCostMax || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Full data ({projection.length} rows) will be exported to Excel.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;