import React from 'react'

interface ModalSelectProps {
    title: string
    message: string
    onClose: () => void
    onAgreement: () => void
}
export function ModalSelect({title, message, onClose, onAgreement} : ModalSelectProps) {
    return (
        <>
            <div
                className="fixed bg-black/50 top-0 z-30 right-0 left-0 bottom-0"
                onClick={onClose}
            />
            <div
                className="w-[500px] p-5 z-30 rounded bg-white absolute top-1/3 left-1/2 -translate-x-1/2 px-8"
            >
                <h1 className="text-xl font-medium text-start mb-2">{title}</h1>
                <div className="flex flex-col">
                    <span className="my-3">{message}</span>
                    <div className="flex flex-row justify-end">
                        <div className="flex flex-row justify-end items-center bg-white my-2">
                            <button onClick={onClose} className="min-w-[50px] px-2 mx-2 h-7 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200">
                                Нет
                            </button>
                            <button onClick={onAgreement} className="min-w-[50px] text-xs h-7 font-medium px-2 py-1 rounded bg-blue-700 text-white hover:bg-blue-800">
                                Да
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}