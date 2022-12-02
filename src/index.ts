import axios from 'axios';
import { responsePayload } from './types';

/**
 * Send status responses to cloudformation
 */
export const cfnResponse = async ({
  event,
  context,
  responseStatus,
  responseData,
  physicalResourceId,
  error,
}: responsePayload) => {
  const responseBody = JSON.stringify({
    Status: responseStatus,
    Reason: `${error}...See the details in CloudWatch Log Stream: ${context.logStreamName}`,
    PhysicalResourceId: physicalResourceId || context.logStreamName,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: responseData,
  });

  console.log('Response body:', responseBody);

  const endpoint = event.ResponseURL;
  const config = {
    headers: {
      'content-type': '',
      'content-length': responseBody.length,
    },
  };

  try {
    const response = await axios.put(endpoint, responseBody, config);
    const { status } = response;
    console.log('Status:', status);
  } catch (error) {
    console.log('Request failed.. ', error);
  }

  return;
};
