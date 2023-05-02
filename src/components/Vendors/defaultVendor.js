export const defaultVendor = {
  vendor_name: null,
  address: {
    name: null,
    street1: null,
    city: null,
    state: null,
    zipcode: null,
    country: null,
  },
  inventory_file_config: {
    file_path: null,
    dir_path: null,
    part_number_column: null,
    quantity_column: null,
    cost_column: null,
  },
  cost_map_config: {
    file_path: null,
    dir_path: null,
    part_number_column: null,
    cost_column: null,
  },
  sku_map_config: {
    file_path: null,
    dir_path: null,
    inhouse_part_number_column: null,
    vendor_part_number_column: null,
  },
  cost_adjustment_config: {
    steel_adjustment: null,
    alloy_adjustment: null,
    general_adjustment: null,
  },
  classification_config: {
    classification_condition_column: null,
    core_condition: null,
    finish_condition: null,
  },
  inclusion_config: {
    inclusion_condition: null,
    exclusion_condition: null,
    inclusion_condition_column: null,
  },
};
