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
import AddOrderForm from "./AddOrderForm";
import NewOrderForm from "./newOrderForm";

const AddOrderDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="border p-2 hover:bg-gray-200">Add new Product</div>
        </DialogTrigger>
        <DialogContent>
          {/* <AddOrderForm /> */}
          <NewOrderForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddOrderDialog;
