import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import AddProductForm from "./AddProductForm";

const AddProductDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="border p-2 hover:bg-gray-200">Add new Product</div>
        </DialogTrigger>
        <DialogContent>
          <AddProductForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProductDialog;
