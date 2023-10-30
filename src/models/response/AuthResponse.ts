import {IUser} from "../IUser";

export interface AuthResponse {
    uuid: string;
    user?: IUser
}