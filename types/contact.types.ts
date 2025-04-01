export interface Contact {
  name: string;
  email: string;
  mobile: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
  key: string
}
export interface CreateContact {
  name: string;
  email: string;
  mobile: string;
  message: string;
}
export interface CreateContactResponse {
  message: string;
  success: boolean;
}
