import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";

export default class Store {

    user = {} as IUser;
    isAuth = false;
    isAuthInProgress = false;

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean){
        this.isAuth = bool;
    }

    setUser(user: IUser){
        this.user = user;
    }

    async login(username:string, password:string){
        this.isAuthInProgress = true;
        try {
            const response = await AuthService.login(username,password);
            // console.log(response)
            sessionStorage.setItem('token', response.data.uuid);
            await this.checkAuth()
        } catch (e:any){
            console.log(e.response?.data?.message)
        } finally {
            this.isAuthInProgress = false;
        }
    }

    async logout(){
        try {
            // const response = await AuthService.logout(); //не реализовано на сервере
            sessionStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e:any){
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth(){
        this.isAuthInProgress = true;
        try {
            const response = await AuthService.getAuthorizedUserData(); //временно, после доделать запрос на refresh и валидность токена
            // console.log(response)
            this.setAuth(true);
            this.setUser(response.data as IUser);
        } catch (e:any){
            console.log(e.response?.data?.message)
        } finally {
            this.isAuthInProgress = false;
        }
    }

    async updateAuth(){
        try {
            const response = await AuthService.getAuthorizedUserData(); //временно, после доделать запрос на refresh и валидность токена
            // console.log(response)
            this.setAuth(true);
            this.setUser(response.data as IUser);
        } catch (e:any){
            console.log(e.response?.data?.message)
        }
    }

}