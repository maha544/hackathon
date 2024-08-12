import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { ServiceRequest, Service } from './interfaces';

interface ServiceRequestFormProps {
  services: Service[];
  onClose: () => void;
  onSave: (newRequest: Omit<ServiceRequest, 'id'>) => void;
  selectedRequest: ServiceRequest | null;
}

const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({ services, onClose, onSave, selectedRequest }) => {
  const [serviceId, setServiceId] = useState(selectedRequest ? selectedRequest.serviceId : '');
  const [customerName, setCustomerName] = useState(selectedRequest ? selectedRequest.customerName : '');
  const [requestDate, setRequestDate] = useState(selectedRequest ? selectedRequest.requestDate : '');
  const [status, setStatus] = useState(selectedRequest ? selectedRequest.status : 'Pending');

  useEffect(() => {
    if (selectedRequest) {
      setServiceId(selectedRequest.serviceId);
      setCustomerName(selectedRequest.customerName);
      setRequestDate(selectedRequest.requestDate);
      setStatus(selectedRequest.status);
    }
  }, [selectedRequest]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ serviceId, customerName, requestDate, status });
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 4,
        border: '1px solid #ccc',
        borderRadius: 4,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h6" sx={{ color: '#006494' }}>
        {selectedRequest ? 'Edit Service Request' : 'Add New Service Request'}
      </Typography>
      <FormControl variant="outlined" required>
        <InputLabel>Service</InputLabel>
        <Select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value as string)}
          label="Service"
        >
          {services.map(service => (
            <MenuItem key={service.id} value={service.id}>
              {service.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Request Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={requestDate}
        onChange={(e) => setRequestDate(e.target.value)}
        variant="outlined"
        required
      />
      <FormControl variant="outlined" required>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as string)}
          label="Status"
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          {selectedRequest ? 'Save Changes' : 'Add Request'}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceRequestForm;
