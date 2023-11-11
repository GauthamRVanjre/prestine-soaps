"use client";
import { useState, useEffect } from "react";
import { Products } from "../types/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ProductsPage() {
  const columnsLength = columns.length;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={products}
        loading={isLoading}
        columnsLength={columnsLength}
      />
    </div>
  );
}
