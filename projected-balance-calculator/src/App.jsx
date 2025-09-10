import React, { useState, useMemo } from 'react';
import './App.css'; // optional if you have custom styles

const App = () => {
  const [startingBalance, setStartingBalance] = useState(5000);
  const [months, setMonths] = useState(6);
  const [growth, setGrowth] = useState(35);

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const calculateProjectedData = (start, m, g) => {
    let currentBalance = start;
    for (let i = 1; i <= m; i++) {
      currentBalance *= 1 + g / 100;
    }
    return currentBalance;
  };

  const projectedFinalBalance = useMemo(
    () => calculateProjectedData(startingBalance, months, growth),
    [startingBalance, months, growth]
  );

  const illustrativeProfit = projectedFinalBalance - startingBalance;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-100 min-h-screen font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Projected Balance Calculator
        </h1>

        {/* Inputs Section */}
        <div className="space-y-6">
          {/* Starting Balance */}
          <div className="input-group">
            <label htmlFor="starting-balance" className="block text-sm font-medium text-gray-700 mb-2">
              Starting Balance
            </label>
            <input
              id="starting-balance"
              type="range"
              min="100"
              max="100000"
              value={startingBalance}
              onChange={(e) => setStartingBalance(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-gray-600 text-xs mt-1">
              <span>$100</span>
              <span>{formatCurrency(startingBalance)}</span>
              <span>$100,000</span>
            </div>
          </div>

          {/* Months */}
          <div className="input-group">
            <label htmlFor="months" className="block text-sm font-medium text-gray-700 mb-2">
              Months
            </label>
            <input
              id="months"
              type="range"
              min="1"
              max="12"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-gray-600 text-xs mt-1">
              <span>1</span>
              <span>{months}</span>
              <span>12</span>
            </div>
          </div>

          {/* Growth */}
          <div className="input-group">
            <label htmlFor="growth" className="block text-sm font-medium text-gray-700 mb-2">
              Avg Monthly Growth
            </label>
            <input
              id="growth"
              type="range"
              min="5"
              max="50"
              value={growth}
              onChange={(e) => setGrowth(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-gray-600 text-xs mt-1">
              <span>5%</span>
              <span>{growth}%</span>
              <span>50%</span>
            </div>
          </div>
        </div>

        {/* Projected Result */}
        <div className="mt-8 p-4 bg-teal-50 rounded-xl text-center">
          <p className="text-lg font-medium text-teal-800">
            With {formatCurrency(startingBalance)} over {months} months at {growth}%/mo, your illustrative profit could be {formatCurrency(illustrativeProfit)}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;