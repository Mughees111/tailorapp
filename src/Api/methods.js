import { postRequest } from "./apiCalls";


export const loginApi = (payload) => postRequest(payload,'login');