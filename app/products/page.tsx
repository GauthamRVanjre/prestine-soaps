"use client";
import { useState, useEffect } from "react";
import { Products } from "../types/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import AddProductDialog from "@/components/AddProductDialog";
import { useQuery } from "@tanstack/react-query";

export default function ProductsPage() {
  const columnsLength = columns.length;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      const res = await response.json();
      return res;
    },
  });

  console.log(data);

  return (
    <>
      <div className="container">
        <div className="float-right my-14 mx-8">
          <AddProductDialog />
        </div>
        <div className="container mx-auto py-10">
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
