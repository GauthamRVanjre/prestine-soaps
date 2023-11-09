"use client";
import { useState, useEffect } from "react";
import { Products } from "../types/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={products} />
    </div>
  );
}
