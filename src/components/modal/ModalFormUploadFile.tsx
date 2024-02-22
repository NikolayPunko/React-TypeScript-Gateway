import React, {useState} from 'react'
import PricatService from "../../services/PricatService";
import {AxiosError} from "axios";

interface ModalFormUploadFileProps {
    onClose: () => void
    importFile: (e: any) => void
}
export function ModalFormUploadFile({onClose, importFile} : ModalFormUploadFileProps){

    const[file,setFile] = useState<any|null>(null);

    async function uploadFile(){
        if(file){
            importFile(file)
        }
    }

    const handleChangeFile = (event: any) => {
        if (!event.target.files)
           return;
        setFile(event.target.files[0]);
    };

    return (
        <>
            <div
                className="fixed bg-black/50 top-0 z-30 right-0 left-0 bottom-0"
                onClick={onClose}
            />

            <div className="w-[500px] p-5 z-30  rounded bg-white absolute top-1/3 left-1/2 -translate-x-1/2 px-8">
                <span className="font-bold  text-lg">Выберите файл для импорта</span>
                <div className="flex flex-col py-1">
                    <span className="text-sm">.xml</span>
                    <input
                        className="border rounded border-slate-400 px-2 text-sm h-[43px] outline-blue-700 focus-visible:outline-1 py-2  hover:border-blue-700 "
                        placeholder="Введите логин" type="file"
                        onChange={event => handleChangeFile(event)}
                        // value={file}
                    />
                </div>
                <div className="flex flex-row justify-end items-center bg-white my-2">
                    <button onClick={onClose} className="px-2 mx-2 h-7  rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200">
                        Закрыть
                    </button>
                    <button onClick={uploadFile} className="text-xs h-7 font-medium px-2 py-1 rounded bg-blue-700 text-white hover:bg-blue-800">
                        Импортировать
                    </button>
                </div>
            </div>
        </>
    )
}