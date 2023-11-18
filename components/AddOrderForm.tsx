"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, z } from "zod";
import CustomFormField from "./CustomFormField";

import CustomDropdownMenu from "./CustomDropdownMenu";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "react-hot-toast";
import { orderFormValidator } from "@/lib/orderFormValidator";
import { Products } from "@/app/types/types";
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
import { Input } from "./ui/input";

const AddOrderForm = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [orderItems, setOrderItems] = useState([
    {
      productName: "",
      quantity: 0,
      sellingPrice: 0,
    },
  ]);

  const handleProductNameChange = (index: number, value: string) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index].productName = value;
    setOrderItems(updatedOrderItems);
  };

  const handleQuantityChange = (index: number, value: number) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index].quantity = value;
    setOrderItems(updatedOrderItems);
  };

  const handleSellingPriceChange = (index: number, value: number) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index].sellingPrice = value;
    setOrderItems(updatedOrderItems);
  };

  const addOrderItem = () => {
    setOrderItems([
      ...orderItems,
      { productName: "", quantity: 0, sellingPrice: 0 },
    ]);
  };

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleSubmit() {
    console.log({
      customerName,
      orderItems,
    });
  }

  return (
    <>
      <div className="form-container">
        <label>Customer Name:</label>

        <Input
          type="text"
          placeholder="Enter customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <div className="order-items-container">
          <label>Order Items:</label>
          {orderItems.map((item, index) => (
            <>
              <div key={index} className="order-item">
                <div>
                  <label>Product Name: </label>
                  <p>{item.productName}</p>
                </div>
              </div>
              <div>
                <label>Quantity:</label>
                <p>{item.quantity}</p>
              </div>
              <div>
                <label>Selling Price:</label>
                <p>{item.sellingPrice}</p>
              </div>
            </>
          ))}
        </div>

        <div className="order-items-container">
          <label>Order Items:</label>
          {orderItems.map((item, index) => (
            <div key={index} className="order-item bg-gray-500">
              <div>
                <label>Product Name:</label>
                <select
                  value={item.productName}
                  onChange={(e) =>
                    handleProductNameChange(index, e.target.value)
                  }
                  className="w-[150px]"
                >
                  <option value="" disabled>
                    Select a product
                  </option>
                  {products.map((product) => (
                    <option key={product.id} value={product.productName}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={item.quantity}
                  className="w-[100px]"
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value, 10))
                  }
                />
              </div>

              <div>
                <label>Selling Price:</label>
                <input
                  type="number"
                  className="w-[100px]"
                  value={item.sellingPrice}
                  onChange={(e) =>
                    handleSellingPriceChange(index, parseFloat(e.target.value))
                  }
                />
              </div>
            </div>
          ))}
          <Button type="button" onClick={addOrderItem}>
            Add Order Item
          </Button>
        </div>

        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default AddOrderForm;
