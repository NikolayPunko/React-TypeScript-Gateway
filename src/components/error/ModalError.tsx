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
                className="fixed bg-black/50 top-0 z-30 right-0 left-0 bottom-0"
                // onClick={onClose}
            />
            <div
                className="w-[500px] p-5 z-30  rounded bg-white absolute top-1/3 left-1/2 -translate-x-1/2"
            >
                <h1 className="text-2xl text-center mb-2">{title}</h1>

                {/*{children}*/}
                Ведутся технические работы, попробуйте повторить попытку позже :(
            </div>
        </>
    )
}