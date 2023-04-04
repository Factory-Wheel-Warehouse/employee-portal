import React, { useState } from 'react';
import sleep from '../../util/sleep';
import {
  Card,
  CardHeader,
  CardContent,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Check, Error, Layers } from '@mui/icons-material';

const baseUrl = 'https://corebuyer.herokuapp.com/';

const actionButtons = {
  importOrders: {
    href: `${baseUrl}/import-orders`,
    title: 'Import pending orders from Magento',
  },
  uploadTracking: {
    href: `${baseUrl}/upload-tracking`,
    title: 'Send available tracking information',
  },
  inventoryUpload: {
    href: `${baseUrl}/inventory-upload`,
    title: 'Upload combined inventory to FTP',
  },
  warehouseInventoryUpload: {
    href: `${baseUrl}/warehouse-inventory-upload`,
    title: 'Upload warehouse inventory to FTP',
  },
};

export default function QuickActions() {
  return (
    <Card variant="outlined">
      <CardHeader
        title="Quick Actions"
        subheader="Manual triggers for common processes"
      />
      <Divider />
      <CardContent>
        {Object.keys(actionButtons).map((key) => (
          <ActionButton
            href={actionButtons[key].href}
            title={actionButtons[key].title}
            key={key}
          />
        ))}
      </CardContent>
    </Card>
  );
}

const ActionButton = ({ href, title, key }) => {
  const [success, setSuccess] = useState(false);
  const [icon, setIcon] = useState(<Layers />);

  const sendRequest = (e) => {
    setIcon(<CircularProgress size={24} />);
    fetch('', { mode: 'no-cors' })
      .then(() => {
        setIcon(<Check color="success" />);
        setSuccess(true);
        sleep(3000).then(() => {
          setSuccess(false);
          setIcon(<Layers />);
        });
      })
      .catch((e) => {
        setIcon(<Error />);
        sleep(3000).then(() => setIcon(<Layers />));
      });
  };

  return (
    <ListItemButton key={key} onClick={sendRequest}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={success ? 'Success' : title} />
    </ListItemButton>
  );
};
