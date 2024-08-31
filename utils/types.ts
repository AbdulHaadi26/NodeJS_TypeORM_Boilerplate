export type JWTPayloadType = {
  id: number;
  tenantId: string;
};

export type SQSParamType = {
  id: number;
  tenantId: string;
};

export type SQSRecordTyoe = {
  body: string;
  messageAttributes: {
    refId: {
      stringValue: string;
    };
    tenantId: {
      stringValue: string;
    };
  };
};
