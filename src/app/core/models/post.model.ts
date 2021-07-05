import { IUser } from './auth-data.model';

export interface IPost {
  id: string;
  title: string;
  content: string;
  imagePath: string;
  creator?: IUser;
}
