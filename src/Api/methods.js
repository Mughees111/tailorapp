import { postRequest } from "./apiCalls";


export const loginApi = (payload) => postRequest(payload, 'login');
export const signupApi = (payload) => postRequest(payload, 'signup');
export const addCustomerApi = (payload) => postRequest(payload, 'addCustomer');
export const getTailorCustomersApi = (payload) => postRequest(payload, 'getTailorCustomers');
export const getCustomerDetailsApi = (payload) => postRequest(payload, 'getCustomerDetails');
export const addOrderApi = (payload, contentType = null) => postRequest(payload, 'addOrder', contentType);