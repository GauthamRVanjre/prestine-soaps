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
  type?: string;
}
const CustomFormField: React.FC<CustomFormFieldProps> = ({
  formControl,
  formLabel,
  formName,
  inputPlaceholder,
  type,
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
              {type === "number" ? (
                <Input
                  type="number"
                  placeholder={inputPlaceholder}
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(Number(value));
                  }}
                />
              ) : (
                <Input type="text" placeholder={inputPlaceholder} {...field} />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CustomFormField;
