export interface IUser {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role:string;
  shop_name?: string;
  shop_id?: string;
}

export type IUserPreview = Pick<
  IUser,
  '_id' | 'email' | 'firstName' | 'lastName' | 'role' | 'shop_name' | 'shop_id'
>;

export interface IUserSession {
  id: string;
}
