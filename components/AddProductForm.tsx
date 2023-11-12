import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productForm } from "@/lib/productFormValidator";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import CustomDropdownMenu from "./CustomDropdownMenu";

const AddProductForm = () => {
  const form = useForm<z.infer<typeof productForm>>({
    resolver: zodResolver(productForm),
    defaultValues: {
      productName: "",
      productCategory: "",
    },
  });

  function onSubmit(values: z.infer<typeof productForm>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const categoryValue = form.watch("productCategory");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormField
          formControl={form.control}
          formName="productName"
          formLabel="Enter product Name"
          inputPlaceholder="soap name..."
        />

        <CustomDropdownMenu
          formControl={form.control}
          formName="productCategory"
          formLabel="Enter product Category"
          selectPlaceholder="Please select appropriate category.."
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
