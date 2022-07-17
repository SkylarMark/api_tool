import { Button, FormGroup, TextField } from '@mui/material';
import { MultiTextFieldTypeEnum } from 'enums';
import React, { ChangeEvent, ReactElement } from 'react';
import { removeHeader, removeParameter, useAppDispatch } from 'services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface KeyValuePairInputFieldProps {
  objectKey: string;
  value: string;
  onKeyChange: (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
    type: number,
  ) => void;
  onValueChange: (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
    type: MultiTextFieldTypeEnum,
  ) => void;
  index: number;
  type: MultiTextFieldTypeEnum;
}

/**
 * @return {ReactElement}
 */
export function KeyValuePairInputField({
  objectKey,
  value,
  onKeyChange,
  onValueChange,
  index,
  type,
}: KeyValuePairInputFieldProps): ReactElement {
  const dispatch = useAppDispatch();

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
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onKeyChange(e, index, type)
        }
      />
      <TextField
        key={type === 0 ? `parameterValue${index}` : `headerValue${index}`}
        size="small"
        fullWidth
        InputProps={{
          sx: { borderRadius: '0px' },
        }}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onValueChange(e, index, type)
        }
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
