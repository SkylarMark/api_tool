/* eslint-disable react/no-multi-comp */
import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormGroup,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import { URL_REGEX, API_METHODS } from 'constant';
import { ApiUrlFieldRef, ValidationResponse, ValueResponse } from 'interfaces';
import { setMethod, setUrl, useAppDispatch, useAppSelector } from 'services';

interface ApiUrlFieldProps {
  onClick: () => void;
}

/**
 * API URL Field Component
 * @return {ReactElement}
 */
export const ApiUrlFieldWithRef = forwardRef(
  (
    { onClick }: ApiUrlFieldProps,
    ref: ForwardedRef<ApiUrlFieldRef>,
  ): ReactElement => {
    const { url, method } = useAppSelector((state) => state.request);
    const dispatch = useAppDispatch();

    const [validate, setValidate] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    /**
     * Validate URL
     * @param {string} validationValue
     * @return {ValidationResponse}
     */
    function validateURL(validationValue: string): ValidationResponse {
      if (URL_REGEX.test(validationValue)) {
        return { isValid: true, message: '' };
      }

      return { isValid: false, message: 'Provided value is not a valid URL' };
    }

    /**
     * Handle Change Event
     * @param {ChangeEvent<HTMLInputElement>} event
     * @return {void}
     */
    function handleUrlChange(event: ChangeEvent<HTMLInputElement>): void {
      setValidate(true);
      dispatch(setUrl(event.target.value));
    }

    /**
     * Handle Method Change Event
     * @param {ChangeEvent<HTMLInputElement>} event
     * @return {void}
     */
    function handleMethodChange(event: SelectChangeEvent<string>): void {
      dispatch(setMethod(event.target.value));
    }

    useImperativeHandle(ref, () => ({
      isValid: (): ValidationResponse => {
        const response = validateURL(url);
        return {
          isValid: response.isValid,
          message: response.message,
        };
      },
      getValue: (): ValueResponse => ({
        url,
        method,
      }),
    }));

    useEffect(() => {
      if (validate) setError(validateURL(url).message);
    }, [url, validate]);

    return (
      <FormGroup style={{ flexWrap: 'nowrap', flexDirection: 'row' }}>
        <Select
          fullWidth
          size="small"
          style={{
            maxWidth: '200px',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
          }}
          value={method}
          onChange={(e) => handleMethodChange(e)}
        >
          {API_METHODS.map((e) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
        <TextField
          fullWidth
          size="small"
          id="standard-name"
          placeholder="Enter Request URL"
          onChange={(e) => handleUrlChange(e as ChangeEvent<HTMLInputElement>)}
          error={Boolean(error)}
          helperText={error}
          InputProps={{
            style: {
              borderRadius: '0px',
            },
          }}
        />
        <Button
          fullWidth
          onClick={onClick}
          variant="contained"
          size="small"
          color="primary"
          style={{
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
            maxWidth: '250px',
          }}
        >
          Click to Send Requst
        </Button>
      </FormGroup>
    );
  },
);
