export interface ValidationResponse {
  message: string;
  isValid: boolean;
}

export interface ValueResponse {
  url: string;
  method: string;
}

export interface ApiUrlFieldRef {
  getValue: () => ValueResponse;
  isValid: () => ValidationResponse;
}
