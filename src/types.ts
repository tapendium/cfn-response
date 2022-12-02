import { CloudFormationCustomResourceEvent, Context } from 'aws-lambda';

export interface responsePayload {
  event: CloudFormationCustomResourceEvent;
  context: Context;
  responseStatus: Status;
  responseData: any;
  physicalResourceId?: string;
  error?: any;
}

type Status = 'SUCCESS' | 'FAILED';
