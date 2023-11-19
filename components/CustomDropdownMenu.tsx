import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CustomDropDownProps {
  formControl: any;
  formName: string;
  formLabel: string;
  selectPlaceholder: string;
  selectItems?: Array<String>[];
}

const CustomDropdownMenu: React.FC<CustomDropDownProps> = ({
  formControl,
  formLabel,
  formName,
  selectPlaceholder,
  selectItems,
}) => {
  return (
    <>
      <FormField
        control={formControl}
        name={formName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formLabel}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={selectPlaceholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Chocolate">Chocolate</SelectItem>
                <SelectItem value="Soap">Soap</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CustomDropdownMenu;
