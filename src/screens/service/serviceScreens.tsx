import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Service } from './interfaces';
import ServiceForm from './serviceForm';
import { getData, sendData, editData } from '../../config/firebaseMethods';

const ServiceScreen: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServiceData();
  }, []);

  const fetchServiceData = async () => {
    try {
      const serviceData: any = await getData('services');
      setServices(serviceData);
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  const handleAddServiceClick = () => {
    setShowForm(true);
    setSelectedService(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveService = async (newService: Omit<Service, 'id'>) => {
    try {
      if (selectedService) {
        await editData('services', selectedService.id, { id: selectedService.id, ...newService });
      } else {
        await sendData('services', newService);
      }
      fetchServiceData();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleEditClick = (service: Service) => {
    setSelectedService(service);
    setShowForm(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Service Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'price', headerName: 'Price', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" color="primary" onClick={() => handleEditClick(params.row as Service)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {!showForm && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#006494' }}>Service Management</Typography>
          <Button variant="contained" color="primary" onClick={handleAddServiceClick}>
            Add Service
          </Button>
        </Box>
      )}
      {showForm && <ServiceForm onClose={handleCloseForm} onSave={handleSaveService} selectedService={selectedService} />}
      {!showForm && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={services}
            columns={columns}
            pageSizeOptions={[5, 10, 15]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};

export default ServiceScreen;
