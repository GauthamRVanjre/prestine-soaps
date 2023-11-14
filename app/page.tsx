"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsDataTable from "@/components/ProductsDataTable";
import OrdersDataTable from "@/components/OrdersDataTable";

export default function Home() {
  return (
    <>
      <Tabs defaultValue="products" className="mt-4 ml-6 w-full">
        <TabsList className="ml-4">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductsDataTable />
        </TabsContent>
        <TabsContent value="orders">
          <OrdersDataTable />
        </TabsContent>
      </Tabs>
    </>
  );
}
