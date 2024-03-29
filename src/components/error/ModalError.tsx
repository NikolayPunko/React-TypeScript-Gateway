import React from 'react'

interface ModalErrorProps {
    // children: React.ReactNode
    title: string
    // onClose: () => void
}

export function ModalError({title} : ModalErrorProps) {
    return (
        <>
            <div
                className="fixed z-40 bg-white top-0 right-0 left-0 bottom-0"
                // onClick={onClose}
            >
            <div
                className="fixed bg-black/50 top-0 z-30 right-0 left-0 bottom-0"
                // onClick={onClose}
            />
            <div
                className="w-[500px] p-5 z-50  rounded bg-white absolute top-1/3 left-1/2 -translate-x-1/2"
            >
                <h1 className="text-xl text-center mb-2">{title}</h1>

                {/*{children}*/}
                Ошибка запроса, попробуйте повторить попытку позже.
            </div>
            </div>
        </>
    )
}