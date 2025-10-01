import React, { createContext, useContext, useState, useMemo } from 'react';

const CalculatorContext = createContext();

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};

export const CalculatorProvider = ({ children }) => {
  // Base pricing inputs with real-time updates
  const [pricing, setPricing] = useState({
    cameraUnitMin: 30000,
    cameraUnitMax: 60000,
    edgeDeviceUnitMin: 200000,
    edgeDeviceUnitMax: 300000,
    awsPerStore: 225000,
    maintenanceRate: 8, // percentage
    camerasPerStore: 20,
    edgeDevicesPerStoreMin: 2,
    edgeDevicesPerStoreMax: 5,
    posPerStore: 10,
    phase0AWS: 85000,
    storesPerMonth: 2
  });

  const [projectionMonths, setProjectionMonths] = useState(75);
  const [isCalculating, setIsCalculating] = useState(false);

  // Real-time calculation of costs
  const calculateCosts = useMemo(() => {
    const phase0 = {
      cameras: 2,
      edgeDevices: 1,
      cameraCostMin: 2 * pricing.cameraUnitMin,
      cameraCostMax: 2 * pricing.cameraUnitMax,
      edgeCostMin: 1 * pricing.edgeDeviceUnitMin,
      edgeCostMax: 1 * pricing.edgeDeviceUnitMax,
      awsCost: pricing.phase0AWS,
      hardwareCostMin: (2 * pricing.cameraUnitMin) + (1 * pricing.edgeDeviceUnitMin),
      hardwareCostMax: (2 * pricing.cameraUnitMax) + (1 * pricing.edgeDeviceUnitMax),
    };
    phase0.maintenanceCostMin = (phase0.hardwareCostMin * (pricing.maintenanceRate / 100)) / 12;
    phase0.maintenanceCostMax = (phase0.hardwareCostMax * (pricing.maintenanceRate / 100)) / 12;
    phase0.totalMonthlyMin = phase0.awsCost + phase0.maintenanceCostMin;
    phase0.totalMonthlyMax = phase0.awsCost + phase0.maintenanceCostMax;

    const perStore = {
      cameraCostMin: pricing.camerasPerStore * pricing.cameraUnitMin,
      cameraCostMax: pricing.camerasPerStore * pricing.cameraUnitMax,
      edgeCostMin: pricing.edgeDevicesPerStoreMin * pricing.edgeDeviceUnitMin,
      edgeCostMax: pricing.edgeDevicesPerStoreMax * pricing.edgeDeviceUnitMax,
      awsCost: pricing.awsPerStore,
    };
    perStore.hardwareCostMin = perStore.cameraCostMin + perStore.edgeCostMin;
    perStore.hardwareCostMax = perStore.cameraCostMax + perStore.edgeCostMax;
    perStore.maintenanceCostMin = (perStore.hardwareCostMin * (pricing.maintenanceRate / 100)) / 12;
    perStore.maintenanceCostMax = (perStore.hardwareCostMax * (pricing.maintenanceRate / 100)) / 12;
    perStore.totalMonthlyMin = perStore.awsCost + perStore.maintenanceCostMin;
    perStore.totalMonthlyMax = perStore.awsCost + perStore.maintenanceCostMax;

    return { phase0, perStore };
  }, [pricing]);

  // Generate month-by-month projection with dynamic updates
  const projection = useMemo(() => {
    const data = [];

    // Phase-0
    data.push({
      month: 0,
      phase: 'Phase-0',
      stores: 0,
      newStores: 0,
      hardwareCostMin: calculateCosts.phase0.hardwareCostMin,
      hardwareCostMax: calculateCosts.phase0.hardwareCostMax,
      awsCost: calculateCosts.phase0.awsCost,
      maintenanceCostMin: calculateCosts.phase0.maintenanceCostMin,
      maintenanceCostMax: calculateCosts.phase0.maintenanceCostMax,
      monthlyTotalMin: calculateCosts.phase0.totalMonthlyMin,
      monthlyTotalMax: calculateCosts.phase0.totalMonthlyMax,
      cumulativeCostMin: calculateCosts.phase0.totalMonthlyMin,
      cumulativeCostMax: calculateCosts.phase0.totalMonthlyMax
    });

    let cumulativeCostMin = calculateCosts.phase0.totalMonthlyMin;
    let cumulativeCostMax = calculateCosts.phase0.totalMonthlyMax;
    let totalStores = 0;

    for (let month = 1; month <= projectionMonths; month++) {
      let newStores = 0;
      let phase = '';

      if (month === 1) {
        newStores = 1;
        phase = 'Phase-1';
      } else if (month > 1) {
        newStores = pricing.storesPerMonth;
        phase = 'Phase-2+';
      }

      totalStores += newStores;

      const monthlyHardwareCapexMin = newStores * calculateCosts.perStore.hardwareCostMin;
      const monthlyHardwareCapexMax = newStores * calculateCosts.perStore.hardwareCostMax;
      const monthlyAwsCost = totalStores * calculateCosts.perStore.awsCost;
      const monthlyMaintenanceMin = totalStores * calculateCosts.perStore.maintenanceCostMin;
      const monthlyMaintenanceMax = totalStores * calculateCosts.perStore.maintenanceCostMax;
      const monthlyTotalMin = monthlyAwsCost + monthlyMaintenanceMin;
      const monthlyTotalMax = monthlyAwsCost + monthlyMaintenanceMax;

      cumulativeCostMin += monthlyTotalMin + monthlyHardwareCapexMin;
      cumulativeCostMax += monthlyTotalMax + monthlyHardwareCapexMax;

      data.push({
        month,
        phase,
        stores: totalStores,
        newStores,
        hardwareCostMin: monthlyHardwareCapexMin,
        hardwareCostMax: monthlyHardwareCapexMax,
        awsCost: monthlyAwsCost,
        maintenanceCostMin: monthlyMaintenanceMin,
        maintenanceCostMax: monthlyMaintenanceMax,
        monthlyTotalMin,
        monthlyTotalMax,
        monthlyTotalWithCapexMin: monthlyTotalMin + monthlyHardwareCapexMin,
        monthlyTotalWithCapexMax: monthlyTotalMax + monthlyHardwareCapexMax,
        cumulativeCostMin,
        cumulativeCostMax
      });
    }

    return data;
  }, [calculateCosts, projectionMonths, pricing.storesPerMonth]);

  const formatCurrency = (value) => {
    return `¥${Math.round(value).toLocaleString('ja-JP')}`;
  };

  const formatRange = (min, max) => {
    return `${formatCurrency(min)} - ${formatCurrency(max)}`;
  };

  // Handle input changes with immediate updates
  const handleInputChange = (field, value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setPricing(prev => ({
        ...prev,
        [field]: numValue
      }));
    } else if (value === '' || value === '0') {
      setPricing(prev => ({
        ...prev,
        [field]: 0
      }));
    }
  };

  const resetToDefaults = () => {
    setPricing({
      cameraUnitMin: 30000,
      cameraUnitMax: 60000,
      edgeDeviceUnitMin: 200000,
      edgeDeviceUnitMax: 300000,
      awsPerStore: 225000,
      maintenanceRate: 8,
      camerasPerStore: 20,
      edgeDevicesPerStoreMin: 2,
      edgeDevicesPerStoreMax: 5,
      posPerStore: 10,
      phase0AWS: 85000,
      storesPerMonth: 2
    });
    setProjectionMonths(75);
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setForceRecalc(prev => prev + 1);
      setIsCalculating(false);
    }, 100); // Simulate calculation time
  };

  // Key milestones
  const milestones = useMemo(() => {
    return [
      projection.find(p => p.month === 1),
      projection.find(p => p.month === 6),
      projection.find(p => p.month === 12),
      projection.find(p => p.month === 24),
      projection.find(p => p.month === 60),
      projection[projection.length - 1]
    ].filter(Boolean);
  }, [projection]);

  const value = {
    pricing,
    setPricing,
    projectionMonths,
    setProjectionMonths,
    calculateCosts,
    projection,
    formatCurrency,
    formatRange,
    handleInputChange,
    resetToDefaults,
    handleCalculate,
    milestones,
    isCalculating
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};