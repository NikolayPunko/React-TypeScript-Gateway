import React, {useContext, useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {Navigation} from "../../components/Navigation";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {IUser} from "../../models/IUser";
import {PasswordChange} from "../../components/settings/profile/PasswordChange";
import {ModalNotify} from "../../components/modal/ModalNotify";
import UserService from "../../services/UserService";
import {AxiosError} from "axios";
import ParseDate from "../../utils/ParseDate";
import {styleInput, styleLabelInput} from "../../data/styles";
import {ModalSelect} from "../../components/modal/ModalSelect";

function ProfilePage() {

    const {store} = useContext(Context);
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const [profile, setProfile] = useState<IUser | any>({})
    const [isModalPassword, setIsModalPassword] = useState<boolean>(false);

    const [isModalResultEditProfile, setIsModalResultEditProfile] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    const [isModalSaveChanges, setIsModalSaveChanges] = useState<boolean>(false);

    const [isUpdatedProfile, setIsUpdatedProfile] = useState(false);



    useEffect(() => {
        store.updateAuth().then(() => setProfile(store?.user)); //обновить данные профиля при загрузке страницы
      // setProfile(store?.user);
    }, []);

    useEffect(() => {
        if(isUpdatedProfile){
           store.updateAuth().then(() => setProfile(store?.user));
        }
        setIsUpdatedProfile(false);
    }, [isUpdatedProfile]);

    async function editProfile(){
        try {
            const response = await UserService.editProfile(profile);
            setModalMsg("Данные профиля успешно изменены. Возможно потребуется повторная аутентификация.");
            setError('')
        } catch (e: AxiosError | any) {
            setModalMsg("Ошибка! Отредактируйте данные и попробуйте еще раз.")
            setError(e.response.data.message)
        } finally {
            setIsModalResultEditProfile(true)
        }
    }

    function showModalPassword(){
        setIsModalPassword(!isModalPassword)
    }

    function showModalSaveChanges(){
        setIsModalSaveChanges(!isModalSaveChanges)
    }

    function closeModalResultEditProfile(){
        setIsModalResultEditProfile(!isModalResultEditProfile)
        if(error == '') {
            if(store.user.username !== profile.username){
                store.logout();
            }
            setIsUpdatedProfile(true)
        }
    }


    return (
        <>
            <Navigation/>

            <div className="flex flex-col">
                <div className="bg-gray-100 h-14 flex flex-row items-center justify-between border-b-2 px-5">
                    <div>
                        <span className="font-semibold text-xl">Мой профиль</span>
                    </div>
                    <div className="flex flex-row items-center gap-x-3">
                        <button
                            className="px-2 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 "
                            onClick={showModalPassword}>Изменить пароль
                        </button>
                        <button
                            className="px-2 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 bg-blue-700 text-white hover:bg-blue-800"
                            onClick={() => showModalSaveChanges()}>Сохранить
                        </button>
                    </div>
                </div>

                <div className="px-32 py-10">
                    <div className="flex flex-row justify-start gap-x-5">
                        <div className="flex flex-col">
                            <span className={styleLabelInput}>GLN</span>
                            <input
                                className={styleInput + "w-72"}
                                disabled={true}
                                value={profile?.gln || ''}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className={styleLabelInput}>Логин <span className="text-red-500 font-bold">*</span></span>
                            <input
                                className={styleInput + "w-72"}
                                onChange={event => setProfile({...profile, username: event.target.value})}
                                value={profile?.username || ''}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-start gap-x-5 pt-4">
                        <div className="flex flex-col">
                            <span className={styleLabelInput}>Фамилия <span className="text-red-500 font-bold">*</span></span>
                            <input
                                className={styleInput + "w-72"}
                                onChange={event => setProfile({...profile, lastName: event.target.value})}
                                value={profile?.lastName || ''}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className={styleLabelInput}>Имя <span className="text-red-500 font-bold">*</span></span>
                            <input
                                className={styleInput + "w-72"}
                                onChange={event => setProfile({...profile, firstName: event.target.value})}
                                value={profile?.firstName || ''}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className={styleLabelInput}>Отчество</span>
                            <input
                                className={styleInput + "w-72"}
                                onChange={event => setProfile({...profile, middleName: event.target.value})}
                                value={profile?.middleName || ''}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-start gap-x-5 pt-4">
                        <div className="flex flex-col">
                            <span className={styleLabelInput}>Email <span className="text-red-500 font-bold">*</span></span>
                            <input
                                className={styleInput + "w-72"}
                                onChange={event => setProfile({...profile, email: event.target.value})}
                                value={profile?.email || ''}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className={styleLabelInput}>Телефон</span>
                            <input
                                className={styleInput + "w-72"}
                                onChange={event => setProfile({...profile, phone: event.target.value})}
                                value={profile?.phone || ''}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-start gap-x-5 pt-4">
                        <div className="flex flex-col">
                            <span className={styleLabelInput}>Дата обновления профиля</span>
                            <input
                                className={styleInput + "w-72"}
                                disabled={true}
                                value={ParseDate.ParseStringDateToFormatYYYY_MM_dd_HH_mm_ss(profile?.profileUpdate) || ''}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className={styleLabelInput}>Дата последней авторизации</span>
                            <input
                                className={styleInput + "w-72"}
                                disabled={true}
                                value={ParseDate.ParseStringDateToFormatYYYY_MM_dd_HH_mm_ss(profile?.lastLogin) || ''}
                            />
                        </div>
                    </div>
                </div>

                {isModalPassword && <PasswordChange onClose={showModalPassword}></PasswordChange>}

                {isModalResultEditProfile && <ModalNotify title={"Результат операции"} message={modalMsg} onClose={closeModalResultEditProfile}/>}

                {isModalSaveChanges && <ModalSelect title={"Редактирование профиля"} message={"Вы уверены что хотите изменить данные профиля?"} onClose={showModalSaveChanges} onAgreement={() => {editProfile().finally(showModalSaveChanges)}}/>}
            </div>
        </>
    )
}

export default observer(ProfilePage)