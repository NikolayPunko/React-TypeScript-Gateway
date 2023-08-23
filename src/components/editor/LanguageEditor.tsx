import React, {useEffect, useRef, useState} from "react";

import "ace-builds";
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";

import "ace-builds/src-noconflict/mode-jsx";

import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/mode-xml";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-monokai";
// import "ace-builds/src-noconflict/theme-wilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-terminal";


import {CustomStyle} from "../../data/styleForSelect";
import Select from "react-select";


interface ProductsEditorJSONProps {
    originalData: any
    mode: string
    sendChanges: (e:any) => void
}

export function LanguageEditor(props: ProductsEditorJSONProps) {


    const [modifiedData, setModifiedData] = useState(props.originalData);


    // const [isSyntaxError, setIsSyntaxError] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const aceEditor: any = useRef(null)

    const styleError = errorMsg === "No syntax errors." ? "text-green-500 px-2" : "text-red-600 px-2"


    const optionsThemesForEditor = [
        {value: 'tomorrow', label: 'Тема №1'},
        {value: 'github', label: 'Тема №2'},
        {value: 'monokai', label: 'Тема №3'},
        {value: 'twilight', label: 'Тема №4'},
        {value: 'xcode', label: 'Тема №5'},
        {value: 'terminal', label: 'Тема №6'},
    ]

    const optionsSizesForEditor = [
        {value: 10, label: '10'},
        {value: 12, label: '12'},
        {value: 14, label: '14'},
        {value: 16, label: '16'},
        {value: 18, label: '18'},
        {value: 20, label: '20'}
    ]

    const [themeEditor, setThemeEditor] = useState<any>(optionsThemesForEditor[0]);
    const [sizeTextEditor, setSizeTextEditor] = useState<any>(optionsSizesForEditor[2]);
    const [isAutocomplete, setIsAutocomplete] = useState<boolean>(true);
    const [isReadOnly, setIsReadOnly] = useState<boolean>(false);

    function resetChanges() {
        setModifiedData(props.originalData);
    }

    function onChange(newValue) {
        setModifiedData(newValue);
    }

    function onValidate(e) {
        // console.log("Validate!", e);
    }

    function submitChanges() {
        // console.log("submitChanges!")
        props.sendChanges(modifiedData)
    }


    useEffect(() => {
        if (aceEditor.current.editor.getSession().getAnnotations().length > 0) {
            setErrorMsg(aceEditor.current.editor.getSession().getAnnotations()[0].text)
        } else {
            setErrorMsg("No syntax errors.")
        }
    }, [modifiedData]);


    return (
        <>

            <div className="flex flex-row" style={{height: 'calc( 100vh - 56px )'}}>
                <div className="flex flex-col py-2 items-center h-full  w-56">
                    <button
                        className="w-4/5 px-2 h-7  my-2 rounded text-xs font-medium shadow-sm border  hover:bg-blue-900 text-white bg-blue-800"
                        onClick={() => submitChanges()}>
                        Применить изменения
                    </button>
                    <button
                        className="w-4/5 px-2 h-7 my-2 rounded text-xs font-medium shadow-sm border border-slate-400 hover:bg-gray-200 "
                        onClick={() => resetChanges()}>
                        Сбросить изменения
                    </button>

                    <span className="border-t w-full my-2"/>

                    <div className="w-4/5 flex flex-col ">

                        <span className="text-sm font-medium my-1">Настройки редактора</span>

                        <div className="flex flex-col mt-2">
                            <span className="text-xs font-medium py-1">Тема</span>
                            <Select className="text-xs font-medium"
                                    value={themeEditor}
                                    onChange={(e) => setThemeEditor(e)}
                                    styles={CustomStyle}
                                    options={optionsThemesForEditor}
                                    isSearchable={false}
                            />
                        </div>

                        <div className="flex flex-row justify-between mt-4">
                            <span className="text-xs font-medium py-1">Размер текста</span>
                            <Select className="text-xs font-medium"
                                    value={sizeTextEditor}
                                    onChange={(e) => setSizeTextEditor(e)}
                                    styles={CustomStyle}
                                    options={optionsSizesForEditor}
                                    isSearchable={false}
                            />
                        </div>

                        <div className="flex flex-row justify-between mt-3 ">
                            <span className="text-xs font-medium py-1">Автозаполнение</span>
                            <input className="border rounded border-slate-400 px-2 text-xs font-medium
                                       h-[28px] w-[16px] outline-blue-700 focus-visible:outline-1 hover:border-blue-700 "
                                   type="checkbox"
                                   defaultChecked={isAutocomplete}
                                   onChange={() => {
                                       setIsAutocomplete(!isAutocomplete)
                                   }}
                            />
                        </div>

                        <div className="flex flex-row justify-between mt-3 ">
                            <span className="text-xs font-medium py-1">Только чтение</span>
                            <input className="border rounded border-slate-400 px-2 text-xs font-medium
                                       h-[28px] w-[16px] outline-blue-700 focus-visible:outline-1 hover:border-blue-700 "
                                   type="checkbox"
                                   defaultChecked={isReadOnly}
                                   onChange={() => {
                                       setIsReadOnly(!isReadOnly)
                                   }}
                            />
                        </div>


                    </div>


                </div>


                <div className="w-full">

                    <div className="absolute right-2 z-20 ">
                        <span className={styleError}>{errorMsg}</span>
                    </div>

                    <AceEditor
                        ref={aceEditor}
                        width={"100%"}
                        height={"100%"}
                        value={modifiedData}
                        readOnly={isReadOnly}
                        mode={props.mode}
                        theme={themeEditor.value}
                        onChange={onChange}
                        onValidate={onValidate}
                        name="editor"
                        editorProps={{$blockScrolling: true}}
                        setOptions={{
                            // useWorker: false,
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: isAutocomplete,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 4,
                        }}
                        fontSize={sizeTextEditor.value - 0}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        debounceChangePeriod={500}
                        // wrapEnabled={true}
                    />
                </div>


            </div>
        </>
    )
}