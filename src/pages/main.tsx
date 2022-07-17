/* eslint-disable react/no-array-index-key */
import React, {
  ChangeEvent,
  ReactElement,
  SyntheticEvent,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Tabs,
  Tab,
  Backdrop,
  CircularProgress,
  Typography,
  TextField,
  FormGroup,
  Button,
} from '@mui/material';
import {
  KeyValuePairInputField,
  ApiUrlFieldWithRef,
  Spacing,
  TabPanel,
} from 'components';
import { ApiHelper, PropsHelper } from 'helpers';
import { ApiUrlFieldRef } from 'interfaces';
import {
  addHeaders,
  addParameters,
  setAuthorization,
  // setHeaders,
  // setParameters,
  setProcessing,
  setRequestBody,
  setResponse,
  StringObject,
  useAppDispatch,
  useAppSelector,
} from 'services';
import { RequestMenu } from 'constant';
import { AxiosError } from 'axios';
import { editor } from 'monaco-editor';
import { MonacoEditor } from 'components/MonacoEditor/MonacoEditor';
import { ApiMethodsEnum, MultiTextFieldTypeEnum } from 'enums';

const { a11yProps } = PropsHelper;

/**
 *
 * @return {ReactElement}
 */
export function MainPage(): ReactElement {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const reuqestData = useAppSelector((state) => state.request);
  const {
    parameters,
    headers,
    isProcessing,
    response,
    requestBody,
    authorization,
  } = reuqestData;
  const ref = useRef<ApiUrlFieldRef>(null);
  const requestRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const responseRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const sendApiRequest = async () => {
    if (!ref.current?.isValid().isValid) {
      // TODO Show Snackbar
      return;
    }

    dispatch(setProcessing(true));

    const data = ref.current?.getValue();

    let generatedHeaders = {};
    let generatedParameters = {};

    if (headers.length > 0) {
      for (let i = 0; i < headers.length; i += 1) {
        const { objectKey, value } = headers[i];
        generatedHeaders = { [objectKey]: value, ...generatedHeaders };
      }
    }

    if (parameters.length > 0 && data.method !== ApiMethodsEnum.GET) {
      for (let i = 0; i < parameters.length; i += 1) {
        const { objectKey, value } = parameters[i];
        generatedParameters = { [objectKey]: value, ...generatedParameters };
      }
    }

    if (authorization) {
      generatedHeaders = {
        Authorization: authorization,
        ...generatedHeaders,
      };
    }

    let res;
    let afterResponse = null;
    const now = Date.now();
    try {
      res = await ApiHelper.sendRequest({
        url: data.url,
        method: data.method,
        params:
          data.method !== ApiMethodsEnum.GET ? generatedParameters : undefined,
        headers: generatedHeaders,
        data: requestBody,
      });
      afterResponse = Date.now();
    } catch (e: unknown) {
      const error = e as AxiosError;
      console.log(e);

      afterResponse = Date.now();
      dispatch(
        setResponse({
          headers: error.response?.headers || {},
          data: error.response?.data,
          responseTime: afterResponse - now,
          statusCode: error.response?.status || 500,
        }),
      );
      dispatch(setProcessing(false));
      return;
    }
    dispatch(
      setResponse({
        headers: res.headers,
        data: res.data,
        responseTime: afterResponse - now,
        statusCode: res.status,
      }),
    );
    dispatch(setProcessing(false));
  };

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleRequestBodyChange = (value: string | undefined) => {
    if (!value) return;

    dispatch(setRequestBody(value));
  };

  const addTextField = (type: MultiTextFieldTypeEnum) => {
    switch (type) {
      case MultiTextFieldTypeEnum.HEADER:
        dispatch(addHeaders());
        break;
      case MultiTextFieldTypeEnum.PARAMETER:
        dispatch(addParameters());
        break;
      default:
        break;
    }
  };

  const onAuthorizationChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuthorization(event.target.value));
  };

  return (
    <Box style={{ padding: '24px', height: '60vh' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isProcessing}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="inherit" />
          <Spacing spacing={3} />
          <Typography variant="h5"> Waiting for Response </Typography>
        </Box>
      </Backdrop>
      <ApiUrlFieldWithRef onClick={sendApiRequest} ref={ref} />
      <Spacing spacing={3} variant="vertical" />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="Request Tab"
          >
            {RequestMenu.map((name, index) => (
              <Tab
                key={`requestMenu-${name}`}
                label={name}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
        <TabPanel value={activeTab} index={0}>
          <Button
            onClick={() => addTextField(MultiTextFieldTypeEnum.PARAMETER)}
          >
            Add Parameter
          </Button>
          <Spacing spacing={2} variant="top" />
          {parameters.map((_obj: StringObject, index: number) => (
            <KeyValuePairInputField
              key="parameters-form"
              index={index}
              type={MultiTextFieldTypeEnum.PARAMETER}
            />
          ))}
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <Button onClick={() => addTextField(MultiTextFieldTypeEnum.HEADER)}>
            Add Header
          </Button>
          <Spacing spacing={2} variant="top" />
          {headers.map((_obj: StringObject, index: number) => (
            <KeyValuePairInputField
              index={index}
              key="header-form"
              type={MultiTextFieldTypeEnum.HEADER}
            />
          ))}
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <Box sx={{ height: '150px' }}>
            <MonacoEditor
              value={requestBody}
              editorRef={requestRef}
              onChange={handleRequestBodyChange}
            />
          </Box>
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <FormGroup
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography>Authorization</Typography>
            <Spacing spacing={2} variant="horizontal" />
            <TextField
              fullWidth
              value={authorization}
              size="small"
              onChange={onAuthorizationChange}
            />
          </FormGroup>
        </TabPanel>
      </Box>
      <Spacing spacing={5} variant="vertical" />
      <Box sx={{ backgroundColor: 'secondary', height: '50vh' }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'left',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1">
            {`Time : ${response.responseTime || -1} ms`}
          </Typography>
          <Spacing spacing={2} variant="horizontal" />
          <Typography variant="body1">
            {`Status: ${response.statusCode || 0 - 1}`}
          </Typography>
        </Box>
        <Spacing spacing={2} variant="vertical" />
        <MonacoEditor
          value={response.data as string}
          editorRef={responseRef}
          readonly
        />
      </Box>
    </Box>
  );
}
