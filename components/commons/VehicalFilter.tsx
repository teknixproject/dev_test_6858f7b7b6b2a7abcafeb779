/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { MouseEventHandler, useState } from 'react';
import _ from 'lodash';

interface OnClickProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  data?: any;
  items?: any[];
  onChangeStatus?: MouseEventHandler<HTMLSelectElement> | undefined;
  onChangeVehicleType?: MouseEventHandler<HTMLSelectElement> | undefined;
}

const VehicleFilters: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onChangeStatus,
  onChangeVehicleType,
  ...props
}) => {
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedVehicleType, setSelectedVehicleType] = useState('All Types');

  const statusOptions = [
    'All Status',
    'Active',
    'Inactive',
    'Pending',
    'Maintenance'
  ];

  const vehicleTypeOptions = [
    'All Types',
    'Car',
    'Truck',
    'Van',
    'Motorcycle',
    'Bus'
  ];

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
    onChangeStatus?.(event as any);
  };

  const handleVehicleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVehicleType(event.target.value);
    onChangeVehicleType?.(event as any);
  };

  return (
    <div id={id} style={style} className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${className ?? ''}`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-700"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Type
          </label>
          <div className="relative">
            <select
              value={selectedVehicleType}
              onChange={handleVehicleTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-700"
            >
              {vehicleTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilters;