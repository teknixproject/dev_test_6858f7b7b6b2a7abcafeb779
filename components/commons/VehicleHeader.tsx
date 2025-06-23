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
  onClickRefresh?: MouseEventHandler<HTMLElement> | undefined;
  onClickVehicle?: MouseEventHandler<HTMLElement> | undefined;
  onClickAdd?: MouseEventHandler<HTMLElement> | undefined;
  onClickEdit?: MouseEventHandler<HTMLElement> | undefined;
  onClickDelete?: MouseEventHandler<HTMLElement> | undefined;
}

const VehicleCard: React.FC<{
  vehicle: any;
  onClickEdit?: MouseEventHandler<HTMLElement>;
  onClickDelete?: MouseEventHandler<HTMLElement>;
  onClickView?: MouseEventHandler<HTMLElement>;
}> = ({ vehicle, onClickEdit, onClickDelete, onClickView }) => {
  const safeVehicle = vehicle ?? {};
  const make = _.get(safeVehicle, 'make', 'Unknown Make');
  const model = _.get(safeVehicle, 'model', 'Unknown Model');
  const year = _.get(safeVehicle, 'year', 'N/A');
  const license = _.get(safeVehicle, 'license', 'N/A');
  const status = _.get(safeVehicle, 'status', 'active');
  const mileage = _.get(safeVehicle, 'mileage', 0);

  const statusColor = status === 'active' ? 'bg-green-100 text-green-800' : 
                     status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                     'bg-red-100 text-red-800';

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{year} {make} {model}</h3>
          <p className="text-sm text-gray-600">License: {license}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Mileage</p>
          <p className="text-lg font-medium">{mileage?.toLocaleString() ?? '0'} miles</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p className="text-lg font-medium">{_.get(safeVehicle, 'type', 'Vehicle')}</p>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onClickView}
          className="flex-1 bg-blue-50 text-blue-600 border border-blue-200 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          View
        </button>
        <button
          onClick={onClickEdit}
          className="flex-1 bg-gray-50 text-gray-600 border border-gray-200 px-3 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onClickDelete}
          className="flex-1 bg-red-50 text-red-600 border border-red-200 px-3 py-2 rounded text-sm font-medium hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const VehicleHeader: React.FC<{
  totalVehicles: number;
  currentPage: number;
  totalPages: number;
  onClickRefresh?: MouseEventHandler<HTMLElement>;
  onClickAdd?: MouseEventHandler<HTMLElement>;
}> = ({ totalVehicles, currentPage, totalPages, onClickRefresh, onClickAdd }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vehicle Management</h1>
        <p className="text-gray-600">Showing {totalVehicles} vehicles • Page {currentPage} of {totalPages}</p>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={onClickAdd}
          className="bg-gray-100 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Add Vehicle
        </button>
        <button
          onClick={onClickRefresh}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>
    </div>
  );
};

const VehicleFilters: React.FC<{
  onFilterChange?: (filters: any) => void;
}> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    search: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            placeholder="Make, model, license..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="truck">Truck</option>
            <option value="van">Van</option>
            <option value="car">Car</option>
            <option value="suv">SUV</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={() => {
              setFilters({ status: '', type: '', search: '' });
              onFilterChange?.({ status: '', type: '', search: '' });
            }}
            className="w-full bg-gray-100 text-gray-700 border border-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

const VehicleManagement: React.FC<OnClickProps> = ({
  id,
  style,
  className,
  data,
  items,
  onClickRefresh,
  onClickAdd,
  onClickEdit,
  onClickDelete,
  ...props
}) => {
  const safeData = data ?? {};
  const safeItems = _.isArray(items) ? items : [];
  const currentPage = _.get(safeData, 'currentPage', 1);
  const totalPages = _.get(safeData, 'totalPages', 1);

  // Sample data if none provided
  const defaultVehicles = [
    { id: 1, make: 'Ford', model: 'Transit', year: 2022, license: 'ABC-123', status: 'active', mileage: 25000, type: 'van' },
    { id: 2, make: 'Chevrolet', model: 'Silverado', year: 2021, license: 'DEF-456', status: 'maintenance', mileage: 45000, type: 'truck' },
    { id: 3, make: 'Toyota', model: 'Camry', year: 2023, license: 'GHI-789', status: 'active', mileage: 15000, type: 'car' },
    { id: 4, make: 'Honda', model: 'CR-V', year: 2022, license: 'JKL-012', status: 'active', mileage: 35000, type: 'suv' },
    { id: 5, make: 'Ford', model: 'E-Series', year: 2020, license: 'MNO-345', status: 'inactive', mileage: 75000, type: 'van' },
    { id: 6, make: 'RAM', model: '1500', year: 2023, license: 'PQR-678', status: 'active', mileage: 12000, type: 'truck' },
    { id: 7, make: 'Nissan', model: 'Altima', year: 2021, license: 'STU-901', status: 'active', mileage: 40000, type: 'car' },
    { id: 8, make: 'Jeep', model: 'Grand Cherokee', year: 2022, license: 'VWX-234', status: 'maintenance', mileage: 28000, type: 'suv' },
    { id: 9, make: 'Mercedes', model: 'Sprinter', year: 2023, license: 'YZA-567', status: 'active', mileage: 18000, type: 'van' }
  ];

  const vehicles = safeItems.length > 0 ? safeItems : defaultVehicles;

  const handleVehicleEdit = (vehicle: any) => (event: React.MouseEvent) => {
    onClickEdit?.(event);
  };

  const handleVehicleDelete = (vehicle: any) => (event: React.MouseEvent) => {
    onClickDelete?.(event);
  };

  const handleVehicleView = (vehicle: any) => (event: React.MouseEvent) => {
    props.onClickVehicle?.(event);
  };

  return (
    <div id={id} style={style} className={`min-h-screen bg-gray-50 ${className ?? ''}`}>
      <div className="container mx-auto px-4 py-8">
        <VehicleHeader
          totalVehicles={vehicles.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onClickRefresh={onClickRefresh}
          onClickAdd={onClickAdd}
        />
        
        <VehicleFilters
          onFilterChange={(filters) => console.log('Filters:', filters)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={_.get(vehicle, 'id', index)}
              vehicle={vehicle}
              onClickEdit={handleVehicleEdit(vehicle)}
              onClickDelete={handleVehicleDelete(vehicle)}
              onClickView={handleVehicleView(vehicle)}
            />
          ))}
        </div>

        {vehicles.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No vehicles found</h3>
            <p className="text-gray-500">Get started by adding your first vehicle.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleManagement;