import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const REGION = 'us-east-1';

const DYNAMODB = new DynamoDB({
  region: REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  },
});

const TABLE_NAME = 'internal_automation_vendor_config';

export const updateVendor = async (originalVendor, editedVendor) => {
  await DYNAMODB.deleteItem({
    TableName: TABLE_NAME,
    Key: marshall({ vendor_name: originalVendor.vendor_name }),
  });
  await addVendor(editedVendor);
};

export const addVendor = async (vendor) => {
  await DYNAMODB.putItem({
    TableName: TABLE_NAME,
    Item: marshall(vendor),
  });
};

export const deleteItem = async (vendor_name) => {
  await DYNAMODB.deleteItem({
    TableName: TABLE_NAME,
    Key: marshall({ vendor_name: vendor_name }),
  });
};

export const getVendors = async () => {
  return (
    await DYNAMODB.scan({
      TableName: TABLE_NAME,
    })
  ).Items.map((element) => unmarshall(element));
};
