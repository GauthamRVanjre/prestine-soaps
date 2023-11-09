"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Products } from "../types/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "productCategory",
    header: "Product Category",
  },
  {
    accessorKey: "createdDate",
    header: "product creation",
    cell: ({ row }) => {
      const product = row.original;
      const inputDate = new Date(product.createdDate);

      //adjusting to IST
      inputDate.setUTCHours(inputDate.getUTCHours() + 5);
      inputDate.setUTCMinutes(inputDate.getUTCMinutes() + 30);

      const formattedDate =
        `${inputDate.getUTCDate().toString().padStart(2, "0")}/` +
        `${(inputDate.getUTCMonth() + 1).toString().padStart(2, "0")}/` +
        `${inputDate.getUTCFullYear()} ` +
        `${inputDate.getUTCHours().toString().padStart(2, "0")}:` +
        `${inputDate.getUTCMinutes().toString().padStart(2, "0")}:` +
        `${inputDate.getUTCSeconds().toString().padStart(2, "0")}`;

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "costPrice",
    header: "Cost Price",
  },
];
