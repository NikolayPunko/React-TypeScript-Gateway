const targetHeight = 29;

export const CustomStyle = {
    option: (base:any, state:any) => ({
        ...base,
        backgroundColor: state.isSelected ? "rgb(156 163 175)" : state.isFocused ? "rgb(29 78 216)" : "",
        color: state.isSelected ? "rgb(255 255 255)" : state.isFocused ? "rgb(255 255 255)" : "",
        height: "auto",
        // whiteSpace: "nowrap",
        fontSize: '10px', lineHeight: '12px'

    }),
    control: (base:any, state:any) => ({
        ...base,
        minHeight: 'initial',
        height: "auto",
        borderRadius: "4px",
        borderWidth: "1px",
        borderColor: "rgb(148 163 184)",
        // boxShadow: state.isFocused ?  "0px 0px 0px 1px rgb(29 78 216)" : "none",
        boxShadow: "none",
        outline: state.isFocused ? "auto":"0",
        outlineColor: "rgb(29 78 216)",


        ':hover': {
            // borderWidth: "2px",
            borderColor: "rgb(29 78 216)",
        },


    }),
    noOptionsMessage: (base:any, state:any) => ({
        ...base,
        height: "25px",
        lineHeight: '10px',
        fontSize: '12px',
    }),
    loadingMessage: (base:any, state:any) => ({
        ...base,
        height: "25px",
        lineHeight: '10px',
        fontSize: '12px',
    }),

    //уменьшение размеров
    valueContainer: (base: any) => ({
        ...base,
        height: `${targetHeight - 1 - 1}px`,
        padding: '0 8px',
    }),
    clearIndicator: (base: any) => ({
        ...base,
        padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),
    dropdownIndicator: (base: any) => ({
        ...base,
        padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),


}