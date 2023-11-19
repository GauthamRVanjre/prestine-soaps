import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productForm } from "@/lib/productFormValidator";
import { number, z } from "zod";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "react-hot-toast";
import { orders } from "@/app/types/types";
import { orderFormValidator } from "@/lib/orderFormValidator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface EditOrderFormProps {
  orderDetails: orders | undefined;
}

const EditOrderForm: FC<EditOrderFormProps> = ({ orderDetails }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof orderFormValidator>>({
    resolver: zodResolver(orderFormValidator),
    defaultValues: {
      status: orderDetails?.status,
    },
  });

  const onFinish = async (values: z.infer<typeof orderFormValidator>) => {
    setIsLoading(true);

    console.log("values", values);
    try {
      const response = await fetch(`/api/orders/${orderDetails?.id}`, {
        method: "PUT",
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        toast.success("order status updated successfully");
      } else {
        toast.error("something went wrong! try again");
      }
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-8">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="InProcess">InProcess</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default EditOrderForm;
