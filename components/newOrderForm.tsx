import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Products } from "@/app/types/types";

type OrderItem = {
  productName: string;
  quantity: number;
  sellingPrice: number;
};

const NewOrderForm: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [customerName, setCustomerName] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [selectedSellingPrice, setSelectedSellingPrice] = useState<number>(0);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleProductNameChange = (value: string) => {
    setSelectedProduct(value);
  };

  const handleQuantityChange = (value: string) => {
    setSelectedQuantity(parseInt(value, 10) || 0);
  };

  const handleSellingPriceChange = (value: string) => {
    setSelectedSellingPrice(parseFloat(value) || 0);
  };

  const addOrderItem = () => {
    if (selectedProduct && selectedQuantity && selectedSellingPrice) {
      const newItem: OrderItem = {
        productName: selectedProduct,
        quantity: selectedQuantity,
        sellingPrice: selectedSellingPrice,
      };
      setOrderItems([...orderItems, newItem]);
      setSelectedProduct("");
      setSelectedQuantity(0);
      setSelectedSellingPrice(0);
    }
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
    if (customerName.length === 0) {
      alert("name cannot be null");
    } else if (orderItems.length === 0) {
      alert("orderItems cannot be null");
    }

    console.log({
      customerName,
      orderItems,
    });
  }

  return (
    <>
      <div className="form-container border-white">
        <label className="mb-4">Customer Name:</label>
        <Input
          type="text"
          placeholder="Enter customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        {/* Selection Part */}
        <div className="order-items-container">
          <label className="mb-4">Order Items:</label>
          <div className="order-item">
            <div className="flex flex-col">
              <label>Product Name:</label>
              <select
                value={selectedProduct}
                onChange={(e) => handleProductNameChange(e.target.value)}
                className="w-[250px] border p-2"
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
              <label className="mb-4">Quantity:</label>
              <Input
                type="number"
                value={selectedQuantity}
                className="w-[100px]"
                onChange={(e) => handleQuantityChange(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-4">Selling Price:</label>
              <Input
                type="number"
                className="w-[100px]"
                value={selectedSellingPrice}
                onChange={(e) => handleSellingPriceChange(e.target.value)}
              />
            </div>
          </div>

          {/* Add Product Button */}
          <Button className="mt-4" type="button" onClick={addOrderItem}>
            Add Order Item
          </Button>
        </div>

        {/* Selected Items */}
        <div className="order-items-container">
          <label>Selected Order Items:</label>
          <table className="order-table">
            <thead>
              <tr>
                <th className="bg-green-700">Product Name</th>
                <th className="bg-green-700">Quantity</th>
                <th className="bg-green-700">Selling Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index} className="order-item">
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.sellingPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button className="mt-4" type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default NewOrderForm;
