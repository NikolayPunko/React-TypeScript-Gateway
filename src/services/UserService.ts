import {AxiosResponse} from "axios";
import {PricatsResponse} from "../models/response/PricatsResponse";
import $api, {API_URL} from "../http";
import {ChangePasswordRequest} from "../models/request/ChangePasswordRequest";
import {IUser} from "../models/IUser";

export default class UserService {

    static async updatePassword(passwordObj: ChangePasswordRequest):Promise<AxiosResponse<PricatsResponse[]>> {
        return $api.put<PricatsResponse[]>(`${API_URL}/api/user/changePassword`,
            passwordObj);
    }

    static async editProfile(profile: IUser):Promise<AxiosResponse<PricatsResponse[]>> {
        return $api.put<PricatsResponse[]>(`${API_URL}/api/user/profile/edit`,
            {
                "username": profile.username,
                "email": profile.email
            });
    }
}