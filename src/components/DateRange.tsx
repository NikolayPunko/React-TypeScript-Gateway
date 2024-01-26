import React, {Ref, useEffect, useImperativeHandle, useState} from 'react';
import {createStaticRanges, DateRangePicker, defaultInputRanges, defaultStaticRanges} from 'react-date-range';
import {default as ru} from 'date-fns/locale/ru';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import {
    addDays,
    endOfDay,
    startOfDay,
    startOfYear,
    startOfMonth,
    endOfMonth,
    endOfYear,
    addMonths,
    addYears,
    startOfWeek,
    endOfWeek,
    isSameDay,
    differenceInCalendarDays
} from "date-fns";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;


const defineds = {
    startOfWeek: startOfWeek(new Date()),
    endOfWeek: endOfWeek(new Date()),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
    startOfToday: startOfDay(new Date()),
    startOfLastSevenDay: startOfDay(addDays(new Date(), -7)),
    startOfLastThirtyDay: startOfDay(addDays(new Date(), -30)),
    startOfLastNintyDay: startOfDay(addDays(new Date(), -90)),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
    startOfYear: startOfYear(new Date()),
    endOfYear: endOfYear(new Date()),
    startOflastYear: startOfYear(addYears(new Date(), -1)),
    endOflastYear: endOfYear(addYears(new Date(), -1)),
    startOfAllPeriod: startOfYear(addYears(new Date(), -50)),
    endOfAllPeriod: endOfYear(addYears(new Date(), +50))
};

const sideBarOptions = () => {
    const customDateObjects = [
        {
            label: "Сегодня",
            range: () => ({
                startDate: defineds.startOfToday,
                endDate: defineds.endOfToday
            })
        },
        {
            label: "Вчера",
            range: () => ({
                startDate: defineds.startOfYesterday,
                endDate: defineds.endOfYesterday
            })
        },
        {
            label: "Эта неделя",
            range: () => ({
                startDate: defineds.startOfWeek,
                endDate: defineds.endOfWeek
            })
        },
        {
            label: "Прошлая неделя",
            range: () => ({
                startDate: defineds.startOfLastWeek,
                endDate: defineds.endOfLastWeek
            })
        },
        {
            label: "Этот месяц",
            range: () => ({
                startDate: defineds.startOfMonth,
                endDate: defineds.endOfMonth
            })
        },
        {
            label: "Прошлый месяц",
            range: () => ({
                startDate: defineds.startOfLastMonth,
                endDate: defineds.endOfLastMonth
            })
        },
        {
            label: "Этот год",
            range: () => ({
                startDate: defineds.startOfYear,
                endDate: defineds.endOfYear
            })
        },
        {
            label: "Прошлый год",
            range: () => ({
                startDate: defineds.startOflastYear,
                endDate: defineds.endOflastYear
            })
        },
        {
            label: "Весь период",
            range: () => ({
                startDate: defineds.startOfAllPeriod,
                endDate: defineds.endOfAllPeriod
            })
        }
    ];

    return customDateObjects;
};

interface DateRangeProps {
    onChangeDate: (e:any) => void
    value: any
    setValue: (e:any) => void
}

export interface RefType {
    doSomething: () => void;
}
export function DateRange(props: DateRangeProps) {

    // const [value, setValue] = useState<any>({
    //     startDate: new Date(),
    //     endDate: new Date()
    // });

    const [firstLoading, setFirstLoading] = useState(true);

    const handleChange = (newValue: any) => {
        props.setValue(newValue.range1);
    }


    useEffect(() => {
        if(!firstLoading){
            props.onChangeDate(props.value);
        }
        setFirstLoading(false)
    },[props.value]);


    const [showDateRange, setShowDateRange] = useState(false);

    const stringRange = new Date(props.value.startDate).toLocaleDateString().toString() + " - " +
        new Date(props.value.endDate).toLocaleDateString().toString()


    const sideBar:any = sideBarOptions();

    const staticRanges = [
        // ...defaultStaticRanges,
        ...createStaticRanges(sideBar)
    ];

    return (
        <>
            {showDateRange &&<div
                className="fixed top-0 right-0 left-0 bottom-0 z-10"
                onClick={()=>{setShowDateRange(false)}}
            />}
            <input className="border rounded border-slate-400 px-2 text-xs font-medium
                 h-[28px] outline-blue-700 focus-visible:outline-1  hover:border-blue-700 "
                   onClick={()=>{setShowDateRange(true)}} placeholder={stringRange} value={stringRange} readOnly={true}/>

            {showDateRange &&<div className="absolute mt-[60px] z-10">
                <div className="flex flex-row justify-between items-center px-5 bg-white h-[40px] border-2 rounded rounded-b-none ">
                    <span className="text-sm font-medium pr-12">{stringRange}</span>
                    <button className="text-xs font-medium px-2 py-1 rounded bg-blue-700 text-white "
                            onClick={()=>{setShowDateRange(false)}}>Закрыть</button>
                </div>
                <DateRangePicker
                    ranges={[props.value]}
                    onChange={handleChange}

                    className={"text-xs font-medium border-2 border-t-0 border-gray-200 rounded rounded-t-none shadow-lg"}
                    // headerContent={}
                    // showPreview={false}
                    showDateDisplay={true}
                    // showSelectionPreview={true}
                    showMonthAndYearPickers={false}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    direction="horizontal"
                    // scroll={{enabled: true}}
                    locale={ru}
                    staticRanges={staticRanges}
                    inputRanges={[]}

                    rangeColors={['rgb(29 78 216)','rgb(55 65 81)','rgb(55 65 81)']}
                    // color={"rgb(127 29 29)"}



                    // editableDateInputs={true}
                    // rangeColors={["#8569ff"]} //put your color here


                    // inputRanges={[{
                    //     ...defaultInputRanges[0],
                    //     label: 'Your new label'
                    // }]}




                    // staticRanges={[
                    //     ...defaultStaticRanges,
                    //     {
                    //         label: "last year",
                    //         range: () => ({
                    //             startDate: startOfYear(addYears(new Date(), -1)),
                    //             endDate: endOfYear(addYears(new Date(), -1))
                    //         }),
                    //         isSelected(range:any) {
                    //             const definedRange:any = this.range();
                    //             return (
                    //                 isSameDay(range.startDate, definedRange.startDate) &&
                    //                 isSameDay(range.endDate, definedRange.endDate)
                    //             );
                    //         }
                    //     },
                    //     {
                    //         label: "this year",
                    //         range: () => ({
                    //             startDate: startOfYear(new Date()),
                    //             endDate: endOfDay(new Date())
                    //         }),
                    //         isSelected(range:any) {
                    //             const definedRange:any = this.range();
                    //             return (
                    //                 isSameDay(range.startDate, definedRange.startDate) &&
                    //                 isSameDay(range.endDate, definedRange.endDate)
                    //             );
                    //         }
                    //     }
                    //     ]}


                    // staticRanges={[
                    //     ...defaultStaticRanges[0],{
                    //         label: 'Your new label'
                    //     }
                    //
                    //     ]}
                />
            </div>}
        </>
    )
}