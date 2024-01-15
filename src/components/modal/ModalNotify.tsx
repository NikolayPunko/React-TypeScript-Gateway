import React from 'react'

interface ModalProps {
    // children: React.ReactNode
    title: string
    message: string
    onClose: () => void
    test?: string
}

export function ModalNotify({title, message, onClose} : ModalProps) {
    return (
        <>
            <div
                className="fixed bg-black/50 top-0 z-30 right-0 left-0 bottom-0"
                onClick={onClose}
            />
            <div
                className="w-[500px] p-5 z-30  rounded bg-white absolute top-1/3 left-1/2 -translate-x-1/2 px-8"
            >
                <h1 className="text-xl font-medium text-start mb-2">{title}</h1>
                <div className="flex flex-col">
                    <span className="my-3">{message}</span>
                    <button onClick={onClose} className="w-14 px-2 h-7 self-end  my-2 rounded text-xs font-medium shadow-sm border  hover:bg-blue-800 text-white bg-blue-700">
                        ОК
                    </button>
                </div>

            </div>
        </>
    )
}
