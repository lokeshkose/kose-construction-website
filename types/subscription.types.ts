export interface Subscription {
  status: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
  key: string
}
export interface CreateSubscription {
  email: string;
  status: string;
}
export interface CreateSubscriptionResponse {
  message: string;
  success: boolean;
}

