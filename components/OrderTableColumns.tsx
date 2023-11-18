"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Products, orders } from "../app/types/types";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import EditOrderForm from "./EditOrderForm";

export const orderTableColumns: ColumnDef<orders>[] = [
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "productName",
    header: "items ordered",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div>
          {order.orderItems.map((item) => (
            <div className="bg-gray-200 w-40 m-4 p-2">
              {item.product.productName} - {item.quantity} pcs
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "costPrice",
    header: "total cost price",
    cell: ({ row }) => {
      const order = row.original;
      let totalCostPrice = 0;

      order.orderItems.map((item) => {
        totalCostPrice += item.product.costPrice * item.quantity;
      });

      return <div>{totalCostPrice}</div>;
    },
  },
  {
    accessorKey: "sellingPrice",
    header: "total selling price",
    cell: ({ row }) => {
      const order = row.original;
      let totalSellingPrice = 0;

      order.orderItems.map((item) => {
        totalSellingPrice += item.sellingPrice;
      });

      return <div>{totalSellingPrice}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      //add actions here
      return (
        <>
          <Dialog>
            <DialogTrigger>
              <div className="border p-2 hover:bg-gray-200">
                Add new Product
              </div>
            </DialogTrigger>
            <DialogContent>
              <EditOrderForm />
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
