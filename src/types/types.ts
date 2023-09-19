export interface TextInputInterface {
  label: string;
  inputType: string;
  placeholder: string;
  value: string | number;
  changeUserData: (label: string, value: string) => void;
  errorMessage: string;
}

export interface TextareaInputInterface {
  label: string;
  placeholder: string;
  value: string;
  changeUserData: (label: string, value: string) => void;
  errorMessage: string;
}

export interface OptionInterface {
  id: string;
  name: string;
}

export interface SelectInputInterface {
  label: string;
  options: OptionInterface[];
  value: string;
  changeUserData: (label: string, value: string) => void;
  errorMessage: string;
}

export interface UserInterface {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  idType: string;
  idValue: string;
  nationality: string;
  email: string;
  phoneNumber: string;
  company: any;
}

export interface SearchInputInterface {
  setSearchResults: (data: []) => void;
}

export interface SearchResultsListInterface {
  setUser: (data: any) => void;
  searchResults: any[];
  setSearchResults: (data: any) => void;
  setSelectedUserId: (data: any) => void;
}
