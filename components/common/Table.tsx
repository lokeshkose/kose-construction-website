import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";

interface CustomTableProps<T> {
  data: T[];
  columns: ColumnsType<T>;
  loading?: boolean; // ✅ Added loading prop
  pagination?: TablePaginationConfig;
  onChange?: (pagination: TablePaginationConfig) => void;
}

const CustomTable = <T extends object>({
  data,
  columns,
  loading = false, // ✅ Default loading state
  pagination = { pageSize: 5, current: 1 },
  onChange,
}: CustomTableProps<T>) => {
  return (
    // <div style={{ maxHeight: "500px", overflowY: "auto", overflowX: "hidden" }}>
    //   <Table
    //     dataSource={data}
    //     columns={columns}
    //     loading={loading}
    //     pagination={false} // Use scrolling instead of pagination
    //     onChange={onChange}
    //     scroll={{ x: "100%", y: 300 }} // Restricts unnecessary scrolling
    //     bordered
    //   />
    // </div>

    <Table
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={pagination}
      onChange={onChange}
      scroll={{ x: "100%" ,y: 270  }}
      style={{ minWidth: "100%" }}
    />
  );
};

export default CustomTable;
