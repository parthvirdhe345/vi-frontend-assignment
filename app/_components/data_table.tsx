import React, { useState } from "react";
import { Resizable, ResizableBox } from "react-resizable";

import { cn } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
    flexRender,
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    additionalField?: React.ReactNode;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    additionalField,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleCheckboxClick = (rowId: string) => {
        if (selectedRowId !== null) {
            if (selectedRowId === rowId) {
                setSelectedRowId(null);
            } else {
                alert("You can only select one row at a time.");
                return;
            }
        } else {
            setSelectedRowId(rowId);
        }
    };
    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {additionalField && (
                                <Resizable
                                    className="sticky left-0"
                                    axis="x"
                                    onResize={() => {}}
                                    width={150}
                                    height={0}
                                    draggableOpts={{ enableUserSelectHack: false }}
                                >
                                    <TableHead colSpan={1}>{additionalField}</TableHead>
                                </Resizable>
                            )}
                            {/* //@ Render table headers */}
                            {table.getHeaderGroups().map((headerGroup) =>
                                headerGroup.headers.map((header, index) => (
                                    <React.Fragment key={header.id}>
                                        {index === 0 ? (
                                            <Resizable
                                                className="sticky left-10 bg-white"
                                                width={150}
                                                height={0}
                                                axis="x"
                                                draggableOpts={{ enableUserSelectHack: false }}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <TableHead colSpan={header.colSpan}>
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext(),
                                                        )}
                                                    </TableHead>
                                                )}
                                            </Resizable>
                                        ) : (
                                            <TableHead key={header.id} colSpan={header.colSpan}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column.columnDef.header,
                                                          header.getContext(),
                                                      )}
                                            </TableHead>
                                        )}
                                    </React.Fragment>
                                )),
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className={cn({
                                        hovering: isHovered,
                                        selected: row.id === selectedRowId,
                                    })}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    <Resizable
                                        className="sticky left-0 bg-white"
                                        axis="x"
                                        onResize={() => {}}
                                        width={150}
                                        height={0}
                                        draggableOpts={{ enableUserSelectHack: false }}
                                    >
                                        <TableCell>
                                            <Checkbox
                                                checked={row.id === selectedRowId}
                                                onClick={() => handleCheckboxClick(row.id)}
                                            ></Checkbox>
                                        </TableCell>
                                    </Resizable>

                                    {/* //@table  column of body  */}

                                    {row.getVisibleCells().map((cell, index) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn({
                                                hovering: isHovered,
                                                selected: row.id === selectedRowId,
                                                "sticky left-10 bg-white": index === 0,
                                            })}
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + 1}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}

export default DataTable;