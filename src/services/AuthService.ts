import $api, {API_URL} from "../http";
import {AxiosResponse} from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";
import {IUser} from "../models/IUser";

export default class AuthService {
    static async login(username: string, password: string):Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`${API_URL}/auth/authenticate`, {username, password})
    }

    static async getAuthorizedUserData():Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`${API_URL}/user/profile`);
    }

}