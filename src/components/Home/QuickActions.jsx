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
} from '@mui/material';
import { Check } from '@mui/icons-material';

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

  const sendRequest = (e) => {
    fetch(href, { mode: 'no-cors' })
      .then(() => {
        setSuccess(true);
        sleep(3000).then(() => setSuccess(false));
      })
      .catch((e) => console.log(e));
  };

  return (
    <ListItemButton key={key} onClick={sendRequest}>
      {success ? (
        <ListItemIcon>
          <Check />
        </ListItemIcon>
      ) : null}
      <ListItemText primary={success ? 'Success' : title} />
    </ListItemButton>
  );
};
