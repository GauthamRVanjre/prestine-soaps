"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Products } from "../types/types";
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
    cell: ({ row }) => {
      const product = row.original;
      if (product.productCategory === "Chocolate") {
        return (
          <div className="bg-red-950 text-white p-2 w-20">
            {product.productCategory}
          </div>
        );
      } else {
        return <div>{product.productCategory}</div>;
      }
    },
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
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      //add actions here
      return (
        <>
          <Sheet>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SheetTrigger asChild>
                    <Button className="p-2" variant="ghost">
                      <LinkIcon />
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open side peek</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <SheetContent className="w-[600px]">
              <SheetHeader>
                <SheetTitle>Product Details</SheetTitle>
                <SheetDescription>See product details here</SheetDescription>
              </SheetHeader>
              <Details
                details={
                  product.chocolateProduct != null
                    ? product.chocolateProduct
                    : product.soapProduct
                }
              />
            </SheetContent>
          </Sheet>
        </>
      );
    },
  },
];
