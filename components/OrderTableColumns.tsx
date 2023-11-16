"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Products, orders } from "../app/types/types";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SheetContent,
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import Details from "@/components/Details";

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
      let sellingPrice = 0;

      let totalCostPrice = 0;

      order.orderItems.map((item) => {
        totalCostPrice += item.product.costPrice * item.quantity;
      });

      sellingPrice = 2 * totalCostPrice;

      return <div>{sellingPrice}</div>;
    },
  },
];
