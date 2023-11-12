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
          <Button variant="ghost" className="border ">
            Add new Product
          </Button>
        </DialogTrigger>
        <DialogContent>
          <AddProductForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProductDialog;
