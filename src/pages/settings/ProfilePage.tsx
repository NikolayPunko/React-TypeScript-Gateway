import React, {useContext, useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {Navigation} from "../../components/Navigation";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {IUser} from "../../models/IUser";
import {ModalFormUploadFile} from "../../components/pricats/ModalFormUploadFile";
import {PasswordChange} from "../../components/settings/profile/PasswordChange";

function ProfilePage() {

    const {store} = useContext(Context);
    const navigate = useNavigate();

    const [profile, setProfile] = useState<IUser | any>({})
    const [isModalPassword, setIsModalPassword] = useState<boolean>(false);

    useEffect(() => {
      setProfile(store?.user);
    }, []);

    function showModalPassword(){
        setIsModalPassword(!isModalPassword)
    }

    const styleInput = "border rounded border-slate-400 px-2 text-sm h-[28px] w-96 outline-blue-700 focus-visible:outline-1  hover:border-blue-700 disabled:bg-gray-100 disabled:text-gray-500"
    const styleLabelInput = "text-xs font-medium"


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
                            onClick={() => {
                                console.log(profile)
                            }}>Сохранить
                        </button>
                    </div>
                </div>

                <div className="px-32 py-10">
                    <div className="flex flex-row justify-start gap-x-5">
                        <div className="flex flex-col">
                            <span className={styleLabelInput}>GLN</span>
                            <input
                                className={styleInput}
                                disabled={true}
                                value={profile?.gln || ''}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-start gap-x-5 pt-4">
                        <div className="flex flex-col">
                            <span className={styleLabelInput}>Логин <span className="text-red-500 font-bold">*</span></span>
                            <input
                                className={styleInput}
                                onChange={event => setProfile({...profile, username: event.target.value})}
                                value={profile?.username || ''}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-start gap-x-5 pt-4">
                        <div className="flex flex-col">
                            <span className={styleLabelInput}>Email</span>
                            <input
                                className={styleInput}
                                onChange={event => setProfile({...profile, email: event.target.value})}
                                value={profile?.email || ''}
                            />
                        </div>
                    </div>
                </div>

                {isModalPassword && <PasswordChange onClose={showModalPassword}></PasswordChange>}

            </div>
        </>
    )
}

export default observer(ProfilePage)