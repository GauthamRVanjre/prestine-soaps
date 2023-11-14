"use client";
import { useState, useEffect } from "react";
import { Products } from "../app/types/types";
import { columns } from "./ProductTableColumns";
import { DataTable } from "./data-table";
import AddProductDialog from "@/components/AddProductDialog";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductsDataTable() {
  const columnsLength = columns.length;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      const res = await response.json();
      return res;
    },
  });

  return (
    <>
      <div className="container -ml-12 mt-12">
        <div className="float-right my-5 mx-2">
          <AddProductDialog />
        </div>
        <div className="container mx-auto">
          {!isError ? (
            <DataTable
              columns={columns}
              data={data}
              loading={isLoading}
              columnsLength={columnsLength}
            />
          ) : (
            <div>{isError}</div>
          )}
        </div>
      </div>
    </>
  );
}
