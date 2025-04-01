export interface Quotation {
  name: string;
  email: string;
  mobile: string;
  service: string;
  projectInfo?: string;
  company?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
  key: string
}

export interface CreateQuotation {
  name: string;
  email: string;
  mobile: string;
  projectInfo: string;
  company: string;
  service: string;
}
export interface CreateQuotationResponse {
  message: string;
  success: boolean;
}
