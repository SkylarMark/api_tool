// Disabled for the Entire file due to no pram reassing but its required in
// Redux
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AxiosResponseHeaders } from 'axios';
import { API_METHODS } from 'constant';
import { MultiTextFieldTypeEnum } from 'enums';

export interface StringObject {
  objectKey: string;
  value: string;
}

export interface StringObjectPayload {
  value: string;
  index: number;
  type: MultiTextFieldTypeEnum;
}

export interface ApiResponse {
  responseTime: number;
  statusCode: number;
  headers: AxiosResponseHeaders;
  data: unknown;
}

export interface RequestState {
  url: string;
  method: string;
  requestBody: string;
  authorization: string;
  headers: StringObject[];
  parameters: StringObject[];
  response: ApiResponse;
  isProcessing: boolean;
}

const initialState: RequestState = {
  url: '',
  method: API_METHODS[0],
  requestBody: '',
  authorization: '',
  headers: [{ objectKey: '', value: '' }],
  parameters: [{ objectKey: '', value: '' }],
  response: {} as ApiResponse,
  isProcessing: false,
};

const RequestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    reset: () => initialState,
    setUrl: (state: RequestState, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setMethod: (state: RequestState, action: PayloadAction<string>) => {
      state.method = action.payload;
    },
    setRequestBody: (state: RequestState, action: PayloadAction<string>) => {
      state.requestBody = action.payload;
    },
    setAuthorization: (state: RequestState, action: PayloadAction<string>) => {
      state.authorization = action.payload;
    },
    setProcessing: (state: RequestState, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setHeaders: (
      state: RequestState,
      action: PayloadAction<StringObjectPayload>,
    ) => {
      const { value, index, type } = action.payload;
      if (type === MultiTextFieldTypeEnum.KEY) {
        state.headers[index].objectKey = value;
      } else {
        state.headers[index].value = value;
      }
    },
    addHeaders: (state: RequestState) => {
      const newObj = initialState.headers[0];
      state.headers = [...state.headers, { ...newObj }];
    },
    removeHeader: (state: RequestState, action: PayloadAction<number>) => {
      const newState = state.headers;
      newState.splice(action.payload, 1);
      state.headers = [...newState];
    },
    setParameters: (
      state: RequestState,
      action: PayloadAction<StringObjectPayload>,
    ) => {
      const { value, index, type } = action.payload;
      if (type === MultiTextFieldTypeEnum.KEY) {
        state.parameters[index].objectKey = value;
      } else {
        state.parameters[index].value = value;
      }
    },
    addParameters: (state: RequestState) => {
      const newObj = initialState.parameters[0];
      state.parameters = [...state.parameters, { ...newObj }];
    },
    removeParameter: (state: RequestState, action: PayloadAction<number>) => {
      const newState = state.parameters;
      newState.splice(action.payload, 1);
      state.parameters = [...newState];
    },
    setResponse: (state: RequestState, action: PayloadAction<ApiResponse>) => {
      state.response = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  reset,
  setUrl,
  setRequestBody,
  setMethod,
  setAuthorization,
  setHeaders,
  addHeaders,
  removeHeader,
  setParameters,
  addParameters,
  removeParameter,
  setResponse,
  setProcessing,
} = RequestSlice.actions;

export const RequestReducer = RequestSlice.reducer;
