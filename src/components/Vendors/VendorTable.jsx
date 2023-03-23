import React, { useState } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Tooltip,
  CircularProgress,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Add, Delete, Edit, Refresh } from '@mui/icons-material';
import { deleteItem } from '../../util/aws';

export default function VendorTable({
  vendors,
  setFormData,
  setRefresh,
  authorized,
  setAuthorized,
}) {
  const [deleteDisabled, setDeleteDisabled] = useState(true);

  const editClickHandler = (vendor) => {
    setFormData({ visible: true, vendor: { ...vendor } });
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vendor</TableCell>
            <TableCell align="right">Path</TableCell>
            <TableCell align="center">Maps</TableCell>
            <TableCell align="center" p={1}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors.length > 0 ? (
            vendors.map((vendor) => (
              <TableRow hover key={vendor['vendor_name']}>
                <TableCell>{vendor['vendor_name']}</TableCell>
                <TableCell align="right">
                  {vendor.inventory_file_config?.file_path !== undefined
                    ? vendor.inventory_file_config?.file_path
                    : vendor.inventory_file_config?.dir_path}
                </TableCell>
                <TableCell align="center">
                  {['sku_map_config', 'cost_map_config']
                    .map((el) => (vendor[el] !== undefined ? 1 : 0))
                    .reduce((sum, cur) => sum + cur, 0)}
                </TableCell>
                <TableCell align="center" padding="checkbox">
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => editClickHandler(vendor)}
                      aria-label="edit"
                      size="small"
                    >
                      <Edit fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={deleteDisabled ? 'Disabled' : 'Delete'}>
                    <span>
                      <IconButton
                        disabled={deleteDisabled}
                        onClick={() => {
                          deleteItem(vendor.vendor_name);
                          setRefresh(true);
                        }}
                        aria-label="delete"
                        size="small"
                        color="error"
                      >
                        <Delete fontSize="inherit" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <Box m={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box sx={{ marginTop: 1, marginBottom: 1 }}>
        <Button
          startIcon={<Refresh />}
          onClick={(e) => setRefresh(true)}
          sx={{ float: 'left' }}
          variant="outlined"
        >
          Refresh
        </Button>
        <FormControlLabel
          sx={{ marginLeft: 1 }}
          control={
            <Switch
              color="error"
              onClick={() => setDeleteDisabled(!deleteDisabled)}
            />
          }
          label={`Delete ${deleteDisabled ? 'Disabled' : 'Enabled'}`}
        />
        <Button
          startIcon={<Add />}
          onClick={(e) => {
            setFormData((prev) => ({ ...prev, visible: true }));
          }}
          sx={{ float: 'right' }}
          variant="outlined"
        >
          New
        </Button>
      </Box>
    </>
  );
}
