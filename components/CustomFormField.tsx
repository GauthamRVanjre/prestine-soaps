import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

interface CustomFormFieldProps {
  formControl: any;
  formName: string;
  formLabel: string;
  inputPlaceholder: string;
}
const CustomFormField: React.FC<CustomFormFieldProps> = ({
  formControl,
  formLabel,
  formName,
  inputPlaceholder,
}) => {
  return (
    <>
      <FormField
        control={formControl}
        name={formName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formLabel}</FormLabel>
            <FormControl>
              <Input placeholder={inputPlaceholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CustomFormField;
