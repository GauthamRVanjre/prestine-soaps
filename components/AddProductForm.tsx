import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productForm } from "@/lib/productFormValidator";
import { number, z } from "zod";
import CustomFormField from "./CustomFormField";

import CustomDropdownMenu from "./CustomDropdownMenu";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "react-hot-toast";

const AddProductForm = () => {
  const form = useForm<z.infer<typeof productForm>>({
    resolver: zodResolver(productForm),
    defaultValues: {
      productName: "",
      productCategory: "",
      soapProductItems: {
        soapBase: "",
        soapBasePrice: 0, // Changed to 0
        EO: "",
        EOPrice: 0, // Changed to 0
        FO: "",
        FOPrice: 0, // Changed to 0
        oils: "",
        oilPrice: 0, // Changed to 0
        clay: "",
        clayPrice: 0, // Changed to 0
        Bottles: "",
        BottlePrice: 0, // Changed to 0
        wrappingPapers: "",
        wrappingPapersPrice: 0, // Changed to 0
        packingBags: "",
        packingBagsPrice: 0, // Changed to 0
      },
      chocolateProductsItems: {
        chocolateBags: "",
        chocolateBagsPrice: 0, // Changed to 0
        chocolateEO: "",
        chocolateEOPrice: 0, // Changed to 0
        dryFruits: "",
        dryFruitsPrice: 0, // Changed to 0
        milkMaid: "",
        milkMaidPrice: 0, // Changed to 0
        coconutPowder: "",
        coconutPowderPrice: 0, // Changed to 0
        chocolateWrappingPaper: "",
        chocolateWrappingPaperPrice: 0, // Changed to 0
        chocolateMould: "",
        chocolateMouldPrice: 0, // Changed to 0
        chocolatePackingBags: "",
        chocolatePackingBagsPrice: 0, // Changed to 0
      },
    },
  });

  const categoryValue = form.watch("productCategory");

  async function onSubmit(values: z.infer<typeof productForm>) {
    let costPrice: number = 0;

    if (categoryValue === "Soap") {
      costPrice +=
        values.soapProductItems.BottlePrice +
        values.soapProductItems.EOPrice +
        values.soapProductItems.FOPrice +
        values.soapProductItems.oilPrice +
        values.soapProductItems.clayPrice +
        values.soapProductItems.BottlePrice +
        values.soapProductItems.wrappingPapersPrice +
        values.soapProductItems.packingBagsPrice +
        values.soapProductItems.soapBasePrice;
    } else if (categoryValue === "Chocolate") {
      costPrice +=
        values.chocolateProductsItems.chocolateBagsPrice +
        values.chocolateProductsItems.chocolateEOPrice +
        values.chocolateProductsItems.dryFruitsPrice +
        values.chocolateProductsItems.milkMaidPrice +
        values.chocolateProductsItems.coconutPowderPrice +
        values.chocolateProductsItems.chocolateWrappingPaperPrice +
        values.chocolateProductsItems.chocolateMouldPrice +
        values.chocolateProductsItems.chocolatePackingBagsPrice;
    }

    const valuesToSend = {
      ...values,
      costPrice: costPrice, // Replace calculateCostPrice with your actual calculation logic
    };
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(valuesToSend),
      });
      if (response.ok) {
        toast.success("product added successfully");
      } else {
        toast.error("something went wrong!");
      }
    } catch (error) {
      toast.error("something went wrong!");
    } finally {
      form.reset();
    }
  }

  return (
    <ScrollArea className="h-[400px] rounded-md p-6 overflow-x-auto overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2">
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

          {categoryValue === "Soap" ? (
            <>
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.soapBase"
                formLabel="Enter soapBase Name"
                inputPlaceholder="soapBase name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.soapBasePrice"
                formLabel="Enter soapBasePrice Name"
                inputPlaceholder="soapBasePrice name..."
                type="number"
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.EO"
                formLabel="Enter EO Name"
                inputPlaceholder="EO name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.EOPrice"
                formLabel="Enter EOPrice Name"
                inputPlaceholder="EOPrice name..."
                type="number"
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.FO"
                formLabel="Enter FO Name"
                inputPlaceholder="FO name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.FOPrice"
                formLabel="Enter FOPrice Name"
                inputPlaceholder="FOPrice name..."
                type="number"
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.oils"
                formLabel="Enter oils Name"
                inputPlaceholder="oils name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.oilPrice"
                formLabel="Enter oilPrice Name"
                inputPlaceholder="oilPrice name..."
                type="number"
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.clay"
                formLabel="Enter clay Name"
                inputPlaceholder="clay name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.clayPrice"
                formLabel="Enter clayPrice Name"
                inputPlaceholder="clayPrice name..."
                type="number"
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.Bottles"
                formLabel="Enter Bottles Name"
                inputPlaceholder="Bottles name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.BottlePrice"
                formLabel="Enter BottlePrice Name"
                inputPlaceholder="BottlePrice name..."
                type="number"
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.wrappingPapers"
                formLabel="Enter wrappingPapers Name"
                inputPlaceholder="wrappingPapers name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.wrappingPapersPrice"
                formLabel="Enter wrappingPapersPrice Name"
                inputPlaceholder="wrappingPapersPrice name..."
                type="number"
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.packingBags"
                formLabel="Enter packingBags Name"
                inputPlaceholder="packingBags name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="soapProductItems.packingBagsPrice"
                formLabel="Enter packingBagsPrice Name"
                inputPlaceholder="packingBagsPrice name..."
                type="number"
              />
            </>
          ) : (
            <>
              <CustomFormField
                formControl={form.control}
                formName="chocolateProductsItems.dryFruits"
                formLabel="Enter dryFruits Name"
                inputPlaceholder="dryFruits name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateProductsItems.dryFruitsPrice"
                formLabel="Enter dryFruitsPrice Name"
                inputPlaceholder="dryFruitsPrice name..."
                type="number"
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateProductsItems.milkMaid"
                formLabel="Enter milkMaid Name"
                inputPlaceholder="milkMaid name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateProductsItems.milkMaidPrice"
                formLabel="Enter milkMaidPrice Name"
                inputPlaceholder="milkMaidPrice name..."
                type="number"
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateProductsItems.coconutPowder"
                formLabel="Enter coconutPowder Name"
                inputPlaceholder="coconutPowder name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateProductsItems.coconutPowderPrice"
                formLabel="Enter coconutPowderPrice Name"
                inputPlaceholder="coconutPowderPrice name..."
                type="number"
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateProductsItems.chocolateWrappingPaper"
                formLabel="Enter chocolateWrappingPaper Name"
                inputPlaceholder="chocolateWrappingPaper name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateProductsItems.chocolateWrappingPaperPrice"
                formLabel="Enter chocolateWrappingPaperPrice Name"
                inputPlaceholder="chocolateWrappingPaperPrice name..."
                type="number"
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateProductsItems.chocolateMould"
                formLabel="Enter chocolateMould Name"
                inputPlaceholder="chocolateMould name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateProductsItems.chocolateMouldPrice"
                formLabel="Enter chocolateMouldPrice Name"
                inputPlaceholder="chocolateMouldPrice name..."
                type="number"
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateProductsItems.chocolatePackingBags"
                formLabel="Enter chocolatePackingBags Name"
                inputPlaceholder="chocolatePackingBags name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateProductsItems.chocolatePackingBagsPrice"
                formLabel="Enter chocolatePackingBagsPrice Name"
                inputPlaceholder="chocolatePackingBagsPrice name..."
                type="number"
              />
            </>
          )}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default AddProductForm;
