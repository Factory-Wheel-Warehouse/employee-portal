import {
  Save,
  ExpandLess,
  ExpandMore,
  Cancel,
  Check,
} from '@mui/icons-material';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  Box,
  Collapse,
  Grid,
  TextField,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Alert,
} from '@mui/material';
import React, { useState } from 'react';
import _ from 'lodash';
import { addVendor, updateVendor } from '../../util/aws';
import { defaultVendor } from './defaultVendor';

const vendorKeys = [
  'vendor_name',
  'address',
  'inventory_file_config',
  'cost_map_config',
  'sku_map_config',
  'cost_adjustment_config',
  'classification_config',
  'inclusion_config',
];

const requiredKeys = ['vendor_name', 'address', 'inventory_file_config'];

const formatLabel = (key) => {
  const labelArray = key.split('_');
  return labelArray
    .map((element) => element[0].toUpperCase() + element.slice(1))
    .join(' ');
};

export default function VendorForm({ vendor, setFormData, setRefresh }) {
  const [editedVendor, setEditedVendor] = useState({
    ...defaultVendor,
    ...vendor,
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    hidden: true,
    severity: '',
    message: '',
  });
  const originalVendor = { ...defaultVendor, ...vendor };

  const onChangeHandler = (key, e) => {
    const { name, value } = e.target;
    if (key === name) {
      setEditedVendor({ ...editedVendor, [key]: value });
    } else {
      setEditedVendor({
        ...editedVendor,
        [key]: { ...editedVendor[key], [name]: value },
      });
    }
  };

  const sleep = async (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  const awsFunctionCall = (func, vendor) => {
    setLoading(true);
    func(vendor).then(() => {
      setRefresh(true);
      setLoading(false);
      setSuccess(true);
      setAlert({
        hidden: false,
        severity: 'success',
        message: 'Vendor data has been succesfully saved to database.',
      });
    });
    sleep(3000).then(() => setSuccess(false));
  };

  const onSaveHandler = (e) => {
    let vendorChanged = !_.isEqual(editedVendor, originalVendor);

    if (_.isEqual(defaultVendor, originalVendor)) {
      if (vendorChanged) {
        awsFunctionCall(addVendor, editedVendor);
      } else {
        setAlert({
          hidden: false,
          severity: 'warning',
          message:
            'No changes detected, vendor information not added to database.',
        });
      }
    } else {
      if (vendorChanged) {
        awsFunctionCall(updateVendor, editedVendor);
      } else {
        setAlert({
          hidden: false,
          severity: 'warning',
          message:
            'No changes detected, vendor information not updated in database.',
        });
      }
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        margin: '10%',
        maxHeight: '80vh',
        overflow: 'auto',
      }}
    >
      <CardHeader
        title="Vendor Form"
        titleTypographyProps={{ variant: 'h5' }}
        action={
          <>
            <Button
              color="error"
              startIcon={<Cancel />}
              onClick={(e) => setFormData(defaultVendor)}
            >
              Discard
            </Button>
            <Button
              startIcon={success ? <Check /> : <Save />}
              color={success ? 'success' : 'primary'}
              disabled={loading}
              onClick={onSaveHandler}
            >
              {success ? 'Success' : 'Save'}
            </Button>
          </>
        }
      />
      {alert.hidden ? null : (
        <Box m={2} marginTop={0}>
          <Alert
            action={
              <Button onClick={() => setAlert({ ...alert, hidden: true })}>
                OK
              </Button>
            }
            severity={alert.severity}
          >
            {alert.message}
          </Alert>
        </Box>
      )}
      <Divider />
      <CardContent>
        <List>
          {vendorKeys.map((key) => {
            return key === 'vendor_name' ? (
              <Box marginBottom={1.5}>
                <TextField
                  name={key}
                  key={key}
                  label={formatLabel(key)}
                  required
                  onChange={(e) => {
                    onChangeHandler(key, e);
                  }}
                  defaultValue={editedVendor['vendor_name']}
                />
              </Box>
            ) : (
              <ExpandableFormSection
                title={formatLabel(key)}
                formData={editedVendor[key]}
                required={requiredKeys.includes(key)}
                onChange={(e) => {
                  onChangeHandler(key, e);
                }}
              />
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}

const ExpandableFormSection = ({ title, required, formData, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const onClickHandler = (e) => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItemButton onClick={onClickHandler}>
        <ListItemText>
          <Box display="inline-flex">
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h6" marginLeft={0.5} color="red">
              {required ? '*' : null}
            </Typography>
          </Box>
        </ListItemText>
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {expanded ? <Divider /> : null}
      <Collapse in={expanded}>
        <Grid container spacing={2} marginTop={0.5} marginBottom={1.5}>
          {Object.keys(formData).map((key) => {
            return (
              <Grid item xs={6}>
                <TextField
                  name={key}
                  label={formatLabel(key)}
                  defaultValue={formData[key]}
                  required
                  fullWidth
                  onChange={onChange}
                />
              </Grid>
            );
          })}
        </Grid>
      </Collapse>
    </>
  );
};
