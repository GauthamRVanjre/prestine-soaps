import { useQuery } from "@tanstack/react-query";
import React from "react";
import { DataTable } from "./data-table";
import { orderTableColumns } from "./OrderTableColumns";
import AddOrderDialog from "./AddOrderDialog";

const OrdersDataTable = () => {
  const columnsLength = orderTableColumns.length;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch("/api/orders");
      const res = await response.json();
      return res;
    },
  });

  return (
    <>
      <div className="container -ml-12 mt-12">
        <div className="float-right my-5 mx-2">
          <AddOrderDialog />
        </div>
        <div className="container mx-auto">
          {!isError ? (
            <DataTable
              columns={orderTableColumns}
              data={data}
              loading={isLoading}
              columnsLength={columnsLength}
            />
          ) : (
            <div>{isError}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersDataTable;
