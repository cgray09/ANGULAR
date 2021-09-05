export class User {
  _id?: string;
  email: any; // string;
  password: any; // string;
  name?: string;
}

export interface LoginRsp {
  success: boolean;
  token: string;
}
export interface SignupRsp {
  success: boolean;
  message: string;
}

export interface LogoutRsp {
  success: true;
}
