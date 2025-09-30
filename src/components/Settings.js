import React, { useState } from 'react';
import { Save, Upload, AlertTriangle } from 'lucide-react';
import { useCalculator } from '../context/CalculatorContext';

const Settings = () => {
  const {
    pricing,
    projectionMonths,
    setProjectionMonths,
    handleInputChange,
    calculateCosts,
    formatCurrency,
    formatRange,
    resetToDefaults
  } = useCalculator();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateInput = (field, value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) {
      setError(`${field} must be a valid non-negative number`);
      return false;
    }
    setError('');
    return true;
  };

  const handleInputChangeWithValidation = (field, value) => {
    if (validateInput(field, value)) {
      handleInputChange(field, value);
    }
  };

  const saveConfiguration = () => {
    const config = { pricing, projectionMonths };
    localStorage.setItem('VeBuIn-belc-config', JSON.stringify(config));
    setSuccess('Configuration saved successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const loadConfiguration = () => {
    const saved = localStorage.getItem('VeBuIn-belc-config');
    if (saved) {
      try {
        const config = JSON.parse(saved);
        // Update pricing and projectionMonths
        Object.keys(config.pricing).forEach(key => {
          handleInputChange(key, config.pricing[key]);
        });
        setProjectionMonths(config.projectionMonths);
        setSuccess('Configuration loaded successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } catch (e) {
        setError('Failed to load configuration');
      }
    } else {
      setError('No saved configuration found');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vebuiln-sky-blue to-vebuiln-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-vebuiln-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">⚙️</div>
              <div>
                <h1 className="text-3xl font-bold text-vebuiln-charcoal">Configuration Settings</h1>
                <p className="text-sm text-gray-500 mt-1">Detailed configuration panel for all cost parameters</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={saveConfiguration}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <Save className="w-5 h-5" />
                Save Config
              </button>
              <button
                onClick={loadConfiguration}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Upload className="w-5 h-5" />
                Load Config
              </button>
              <button
                onClick={resetToDefaults}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-red-800">{error}</span>
              </div>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <span className="text-green-800">{success}</span>
              </div>
            </div>
          )}
        </div>

        {/* Settings Panel */}
        <div className="bg-vebuiln-white rounded-lg shadow-xl p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Camera Unit Cost Min/Max */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-semibold text-vebuiln-charcoal mb-2">
                  💻 Camera Unit Cost Range (¥)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Min</label>
                    <input
                      type="number"
                      value={pricing.cameraUnitMin}
                      onChange={(e) => handleInputChangeWithValidation('Camera Unit Min', e.target.value)}
                      onBlur={(e) => handleInputChange('cameraUnitMin', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-vebuiln-primary focus:border-transparent text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Max</label>
                    <input
                      type="number"
                      value={pricing.cameraUnitMax}
                      onChange={(e) => handleInputChangeWithValidation('Camera Unit Max', e.target.value)}
                      onBlur={(e) => handleInputChange('cameraUnitMax', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-vebuiln-primary focus:border-transparent text-sm font-semibold"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">Per camera device</p>
              </div>

              {/* Edge Device Cost Min/Max */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-semibold text-vebuiln-text mb-2">
                  🖥️ Edge Device (Jetson) Cost Range (¥)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Min</label>
                    <input
                      type="number"
                      value={pricing.edgeDeviceUnitMin}
                      onChange={(e) => handleInputChangeWithValidation('Edge Device Min', e.target.value)}
                      onBlur={(e) => handleInputChange('edgeDeviceUnitMin', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-vebuiln-corporate-blue focus:border-transparent text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Max</label>
                    <input
                      type="number"
                      value={pricing.edgeDeviceUnitMax}
                      onChange={(e) => handleInputChangeWithValidation('Edge Device Max', e.target.value)}
                      onBlur={(e) => handleInputChange('edgeDeviceUnitMax', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-vebuiln-primary focus:border-transparent text-sm font-semibold"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">Per Jetson device</p>
              </div>

              {/* AWS Cost */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-semibold text-vebuiln-text mb-2">
                  ☁️ AWS Cost per Store/Month (¥)
                </label>
                <input
                  type="number"
                  value={pricing.awsPerStore}
                  onChange={(e) => handleInputChangeWithValidation('AWS Cost', e.target.value)}
                  onBlur={(e) => handleInputChange('awsPerStore', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-vebuiln-primary focus:border-transparent text-lg font-semibold"
                />
                <p className="text-xs text-gray-600 mt-1">Monthly cloud cost</p>
              </div>

              {/* Maintenance Rate */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-semibold text-vebuiln-text mb-2">
                  🔧 Maintenance Rate (% per Year)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={pricing.maintenanceRate}
                  onChange={(e) => handleInputChangeWithValidation('Maintenance Rate', e.target.value)}
                  onBlur={(e) => handleInputChange('maintenanceRate', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-vebuiln-primary focus:border-transparent text-lg font-semibold"
                />
                <p className="text-xs text-gray-600 mt-1">% of hardware cost annually</p>
              </div>

              {/* Cameras per Store */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-semibold text-vebuiln-text mb-2">
                  📹 Cameras per Store
                </label>
                <input
                  type="number"
                  value={pricing.camerasPerStore}
                  onChange={(e) => handleInputChangeWithValidation('Cameras per Store', e.target.value)}
                  onBlur={(e) => handleInputChange('camerasPerStore', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-vebuiln-primary focus:border-transparent text-lg font-semibold"
                />
                <p className="text-xs text-gray-600 mt-1">Number of cameras</p>
              </div>

              {/* Edge Devices per Store Min/Max */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-semibold text-vebuiln-text mb-2">
                  🎛️ Edge Devices per Store Range
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Min</label>
                    <input
                      type="number"
                      value={pricing.edgeDevicesPerStoreMin}
                      onChange={(e) => handleInputChangeWithValidation('Edge Devices Min', e.target.value)}
                      onBlur={(e) => handleInputChange('edgeDevicesPerStoreMin', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-vebuiln-primary focus:border-transparent text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Max</label>
                    <input
                      type="number"
                      value={pricing.edgeDevicesPerStoreMax}
                      onChange={(e) => handleInputChangeWithValidation('Edge Devices Max', e.target.value)}
                      onBlur={(e) => handleInputChange('edgeDevicesPerStoreMax', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-vebuiln-primary focus:border-transparent text-sm font-semibold"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">Jetson devices per store</p>
              </div>

              {/* Phase-0 AWS */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-semibold text-vebuiln-text mb-2">
                  🧪 Phase-0 AWS Cost/Month (¥)
                </label>
                <input
                  type="number"
                  value={pricing.phase0AWS}
                  onChange={(e) => handleInputChangeWithValidation('Phase-0 AWS', e.target.value)}
                  onBlur={(e) => handleInputChange('phase0AWS', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-vebuiln-primary focus:border-transparent text-lg font-semibold"
                />
                <p className="text-xs text-gray-600 mt-1">Dev + Staging environment</p>
              </div>

              {/* Stores per Month */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-semibold text-vebuiln-text mb-2">
                  🏪 New Stores per Month (Phase-2+)
                </label>
                <input
                  type="number"
                  value={pricing.storesPerMonth}
                  onChange={(e) => handleInputChangeWithValidation('Stores per Month', e.target.value)}
                  onBlur={(e) => handleInputChange('storesPerMonth', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-vebuiln-primary focus:border-transparent text-lg font-semibold"
                />
                <p className="text-xs text-gray-600 mt-1">Growth rate from M2 onwards</p>
              </div>

              {/* Projection Months */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-semibold text-vebuiln-text mb-2">
                  📊 Projection Duration (Months)
                </label>
                <input
                  type="number"
                  value={projectionMonths}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val > 0) {
                      setProjectionMonths(val);
                    } else {
                      setError('Projection months must be a positive number');
                    }
                  }}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-vebuiln-primary focus:border-transparent text-lg font-semibold"
                />
                <p className="text-xs text-gray-600 mt-1">Total months to project</p>
              </div>
            </div>

            {/* Real-time Calculated Values */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg mt-4">
              <h3 className="font-semibold text-vebuiln-charcoal mb-3">📈 Calculated Per Store Values (Updates Live):</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-vebuiln-white p-3 rounded shadow-sm">
                  <div className="text-gray-600">Hardware Total</div>
                  <div className="font-bold text-vebuiln-primary">{formatRange(calculateCosts.perStore.hardwareCostMin, calculateCosts.perStore.hardwareCostMax)}</div>
                </div>
                <div className="bg-vebuiln-white p-3 rounded shadow-sm">
                  <div className="text-gray-600">AWS/Month</div>
                  <div className="font-bold text-green-600">{formatCurrency(calculateCosts.perStore.awsCost)}</div>
                </div>
                <div className="bg-vebuiln-white p-3 rounded shadow-sm">
                  <div className="text-gray-600">Maintenance/Month</div>
                  <div className="font-bold text-yellow-600">{formatRange(calculateCosts.perStore.maintenanceCostMin, calculateCosts.perStore.maintenanceCostMax)}</div>
                </div>
                <div className="bg-vebuiln-white p-3 rounded shadow-sm">
                  <div className="text-gray-600">Running Cost/Month</div>
                  <div className="font-bold text-purple-600">{formatRange(calculateCosts.perStore.totalMonthlyMin, calculateCosts.perStore.totalMonthlyMax)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;