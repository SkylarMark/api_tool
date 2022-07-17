import { Button, FormGroup, TextField } from '@mui/material';
import { MultiTextFieldTypeEnum } from 'enums';
import React, { ChangeEvent, ReactElement } from 'react';
import {
  removeHeader,
  removeParameter,
  setHeaders,
  setParameters,
  useAppDispatch,
  useAppSelector,
} from 'services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface KeyValuePairInputFieldProps {
  index: number;
  type: MultiTextFieldTypeEnum;
}

/**
 * @return {ReactElement}
 */
export function KeyValuePairInputField({
  index,
  type,
}: KeyValuePairInputFieldProps): ReactElement {
  const dispatch = useAppDispatch();
  const parameters = useAppSelector((state) => state.request.parameters);
  const headers = useAppSelector((state) => state.request.headers);

  const onKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (type === MultiTextFieldTypeEnum.PARAMETER) {
      dispatch(
        setParameters({
          value: event.target.value,
          index,
          type: MultiTextFieldTypeEnum.KEY,
        }),
      );
      return;
    }

    dispatch(
      setHeaders({
        value: event.target.value,
        index,
        type: MultiTextFieldTypeEnum.KEY,
      }),
    );
  };

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (type === MultiTextFieldTypeEnum.PARAMETER) {
      dispatch(
        setParameters({
          value: event.target.value,
          index,
          type: MultiTextFieldTypeEnum.VALUE,
        }),
      );
      return;
    }

    dispatch(
      setHeaders({
        value: event.target.value,
        index,
        type: MultiTextFieldTypeEnum.VALUE,
      }),
    );
  };

  const removeTextField = () => {
    switch (type) {
      case MultiTextFieldTypeEnum.HEADER:
        dispatch(removeHeader(index));
        break;
      case MultiTextFieldTypeEnum.PARAMETER:
        dispatch(removeParameter(index));
        break;
      default:
        break;
    }
  };

  const mainArray =
    type === MultiTextFieldTypeEnum.HEADER ? headers : parameters;

  const { objectKey, value } = mainArray[index];

  return (
    <FormGroup sx={{ flexDirection: 'row', flexWrap: 'nowrap', my: 1 }}>
      <TextField
        key={type === 0 ? `parameterKey${index}` : `headerKey${index}`}
        size="small"
        fullWidth
        InputProps={{
          sx: { borderRadius: '0px' },
        }}
        value={objectKey}
        onChange={onKeyChange}
      />
      <TextField
        key={type === 0 ? `parameterValue${index}` : `headerValue${index}`}
        size="small"
        fullWidth
        InputProps={{
          sx: { borderRadius: '0px' },
        }}
        value={value}
        onChange={onValueChange}
      />
      <Button
        onClick={removeTextField}
        variant="contained"
        size="small"
        sx={{ borderRadius: '0px' }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </FormGroup>
  );
}
