
'use client'

import GetDate from "@/components/GetDate";
import { Header } from "@/components/Header"
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicMap = dynamic(() => import('../../components/Map'), {
  ssr: false, 
});


const Page = () => {

    const now = new Date();
    const [month, setMonth] = useState(now.getMonth());
    const [year, setYear] = useState(now.getFullYear());


    return(
        <div>
            <Header />

            <GetDate 
                selectedMonth={month}
                selectedYear={year}
                onChange={(newMonth, newYear) => {
                    setMonth(newMonth);
                    setYear(newYear);
                }}
            />
            <div className="h-[500px] w-[700px] mx-auto mt-6 border-2 border-blue-400">
                <DynamicMap year={year} month={month}/>
            </div>
            
        </div>
    )
}

export default Page