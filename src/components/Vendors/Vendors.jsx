import React, { useEffect, useState } from 'react';
import VendorTable from './VendorTable';
import { Box, Card, Modal } from '@mui/material';
import VendorForm from './VendorForm';
import { getVendors } from '../../util/aws';

const defaultFormData = {
  visible: false,
  vendor: null,
};

export default function Vendors() {
  const [formData, setFormData] = useState(defaultFormData);
  const [vendors, setVendors] = useState([]);
  const [refresh, setRefresh] = useState([]);

  const retrieveVendors = () => {
    getVendors().then((vendors) => {
      setVendors(vendors);
      setRefresh(false);
    });
  };

  useEffect(() => {
    retrieveVendors();
  }, [refresh]);

  return (
    <Card variant="outlined">
      <Box m={1}>
        {
          <VendorTable
            setRefresh={setRefresh}
            setFormData={setFormData}
            vendors={vendors}
          />
        }
      </Box>
      <Modal
        open={formData.visible}
        onClose={() => {
          setFormData(defaultFormData);
        }}
      >
        <>
          <VendorForm
            setRefresh={setRefresh}
            vendor={formData.vendor}
            setFormData={setFormData}
          />
        </>
      </Modal>
    </Card>
  );
}
