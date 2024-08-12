import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Service } from './interfaces';

interface ServiceFormProps {
  onClose: () => void;
  onSave: (newService: Omit<Service, 'id'>) => void;
  selectedService: Service | null;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onClose, onSave, selectedService }) => {
  const [name, setName] = useState(selectedService ? selectedService.name : '');
  const [description, setDescription] = useState(selectedService ? selectedService.description : '');
  const [price, setPrice] = useState(selectedService ? selectedService.price : 0);

  useEffect(() => {
    if (selectedService) {
      setName(selectedService.name);
      setDescription(selectedService.description);
      setPrice(selectedService.price);
    }
  }, [selectedService]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ name, description, price });
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
        {selectedService ? 'Edit Service' : 'Add New Service'}
      </Typography>
      <TextField
        label="Service Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        variant="outlined"
        required
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          {selectedService ? 'Save Changes' : 'Add Service'}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceForm;
