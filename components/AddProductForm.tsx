import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productForm } from "@/lib/productFormValidator";
import { z } from "zod";
import CustomFormField from "./CustomFormField";

import CustomDropdownMenu from "./CustomDropdownMenu";
import { ScrollArea } from "./ui/scroll-area";

const AddProductForm = () => {
  const form = useForm<z.infer<typeof productForm>>({
    resolver: zodResolver(productForm),
    defaultValues: {
      productName: "",
      productCategory: "",
      soapProductItems: {
        soapBase: "",
        soapBasePrice: "",
        EO: "",
        EOPrice: "",
        FO: "",
        FOPrice: "",
        oils: "",
        oilPrice: "",
        clay: "",
        clayPrice: "",
        Bottles: "",
        BottlePrice: "",
        wrappingPapers: "",
        wrappingPapersPrice: "",
        packingBags: "",
        packingBagsPrice: "",
      },
      chocolateProducts: {
        chocolateBags: "",
        chocolateBagsPrice: "",
        chocolateEO: "",
        chocolateEOPrice: "",
        dryFruits: "",
        dryFruitsPrice: "",
        milkMaid: "",
        milkMaidPrice: "",
        coconutPowder: "",
        coconutPowderPrice: "",
        chocolateWrappingPaper: "",
        chocolateWrappingPaperPrice: "",
        chocolateMould: "",
        chocolateMouldPrice: "",
        chocolatePackingBags: "",
        chocolatePackingBagsPrice: "",
      },
    },
  });

  const categoryValue = form.watch("productCategory");
  async function onSubmit(values: z.infer<typeof productForm>) {
    console.log(values);
    if (categoryValue === "Soap") {
      try {
        const response = await fetch("/api/products/soapProduct", {
          method: "POST",
          body: JSON.stringify(values),
        });
        if (response.ok) {
          console.log("all good");
        } else {
          console.log("wrong");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch("/api/products/chocolateProduct", {
          method: "POST",
          body: JSON.stringify(values),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <ScrollArea className="h-[400px] rounded-md border p-6 overflow-x-auto overflow-y-auto">
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
              />
            </>
          ) : (
            <>
              <CustomFormField
                formControl={form.control}
                formName="chocolateBags"
                formLabel="Enter chocolateBags Name"
                inputPlaceholder="chocolateBags name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateBagsPrice"
                formLabel="Enter chocolateBagsPrice Name"
                inputPlaceholder="chocolateBagsPrice name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateEO"
                formLabel="Enter chocolateEO Name"
                inputPlaceholder="chocolateEO name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateEOPrice"
                formLabel="Enter chocolateEOPrice Name"
                inputPlaceholder="chocolateEOPrice name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="dryFruits"
                formLabel="Enter dryFruits Name"
                inputPlaceholder="dryFruits name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="dryFruitsPrice"
                formLabel="Enter dryFruitsPrice Name"
                inputPlaceholder="dryFruitsPrice name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="milkMaid"
                formLabel="Enter milkMaid Name"
                inputPlaceholder="milkMaid name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="milkMaidPrice"
                formLabel="Enter milkMaidPrice Name"
                inputPlaceholder="milkMaidPrice name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="coconutPowder"
                formLabel="Enter coconutPowder Name"
                inputPlaceholder="coconutPowder name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="coconutPowderPrice"
                formLabel="Enter coconutPowderPrice Name"
                inputPlaceholder="coconutPowderPrice name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateWrappingPaper"
                formLabel="Enter chocolateWrappingPaper Name"
                inputPlaceholder="chocolateWrappingPaper name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateWrappingPaperPrice"
                formLabel="Enter chocolateWrappingPaperPrice Name"
                inputPlaceholder="chocolateWrappingPaperPrice name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateMould"
                formLabel="Enter chocolateMould Name"
                inputPlaceholder="chocolateMould name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolateMouldPrice"
                formLabel="Enter chocolateMouldPrice Name"
                inputPlaceholder="chocolateMouldPrice name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolatePackingBags"
                formLabel="Enter chocolatePackingBags Name"
                inputPlaceholder="chocolatePackingBags name..."
              />
              <CustomFormField
                formControl={form.control}
                formName="chocolatePackingBagsPrice"
                formLabel="Enter chocolatePackingBagsPrice Name"
                inputPlaceholder="chocolatePackingBagsPrice name..."
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
