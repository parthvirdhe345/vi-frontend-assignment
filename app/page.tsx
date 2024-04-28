"use client";

import { DataTable } from "./_components/data_table";
import { useDataFetching } from "./_hooks/useDataFetching";
import { Resizable } from "react-resizable";
export default function HomePage() {
    const { data, columns } = useDataFetching();

    return (
        <div className="flex flex-col gap-10 items-center p-10">
            <span className="text-3xl text-gray-400 font-bold">Task Details</span>
            <div className="max-w-screen-lg flex size-full flex-col">
                <DataTable columns={columns} data={data} additionalField={<>check</>} />
            </div>
        </div>
    );
}