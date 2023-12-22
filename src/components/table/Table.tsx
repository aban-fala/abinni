import React, { useMemo, useState } from "react";

import {
  Button as MantineButton,
  MantineProvider,
  MantineSizes,
} from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_DensityState,
  MRT_GroupingState,
  MRT_PaginationState,
  MRT_SortingState,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { Header, Patient } from "../../constants/types";
import { convertDateToDateString } from "../../utils/convertData";

const sizes: MantineSizes = {
  xs: "10px",
  sm: "14px",
  md: "18px",
  lg: "20px",
  xl: "24px",
  customSize: "28px", // Custom size using a string
};

interface Props {
  headers: Header[];
  data: Patient[];
  onAddClick: () => void;
  onEditClick: (info: Patient) => void;
}

const Table: React.FC<Props> = ({ headers, data, onAddClick, onEditClick }) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<MRT_SortingState>([
    { id: "name", desc: true },
  ]);
  const [grouping, setGrouping] = useState<MRT_GroupingState>([]);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [showColumnFilters, setShowColumnFilters] = useState<boolean>(false);
  const [density, setDensity] = useState<MRT_DensityState>("xs");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useMemo(() => {
    const cols: MRT_ColumnDef<Patient>[] = headers.map(
      (columnHeader: Header) => {
        const { id, header } = columnHeader;
        const col: MRT_ColumnDef<Patient> = {
          id,
          header,
          accessorKey: id,
          enableGlobalFilter: true,
        };
        switch (id) {
          case "name":
            col.accessorFn = (data: Patient) =>
              Object.values(data.name).join(" ");
            break;
          case "dob":
            col.accessorFn = (data: Patient) =>
              convertDateToDateString(data.dob);
            break;
          case "addresses":
            col.accessorFn = (data: Patient) => data.addresses.join(", ");
            break;
          case "additionals":
            col.accessorFn = (data: Patient) => "";
            break;
          default:
            break;
        }
        return col;
      }
    );

    return cols;
  }, [headers]);

  const table = useMantineReactTable({
    columns: columns,
    data: data,
    enableColumnFilters: true,
    enableColumnFilterModes: false,
    enableDensityToggle: true,
    enableGrouping: true,
    enableColumnResizing: true,
    enableStickyHeader: true,
    enableBottomToolbar: true,
    enableGlobalFilter: true,
    onGroupingChange: setGrouping,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onDensityChange: setDensity,
    onColumnFiltersChange: setColumnFilters,
    onShowColumnFiltersChange: setShowColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
      grouping,
      sorting,
      pagination,
      density,
      columnFilters,
      showColumnFilters,
    },
    renderTopToolbarCustomActions: () => (
      <MantineButton
        bg="gray"
        c="black"
        title="Add a Record"
        onClick={() => onAddClick()}
      >
        Add a Record
      </MantineButton>
    ),
    mantineTableBodyRowProps: ({ row }) => ({
      onDoubleClick: () => {
        onEditClick(row.original);
      },
      style: {
        cursor: "pointer",
      },
      title: "Double click a row to edit.",
    }),
    mantineTableBodyCellProps: {
      style: {
        textAlign: "left",
      },
      sx: {
        fontSize: "30px",
        "@media (min-width: 600px)": {
          fontSize: "20px",
        },
        overflow: "auto",
      },
    },
    mantineSearchTextInputProps: {
      placeholder: "Search all columns",
      sx: {
        minWidth: "200px",
      },
      size: "sm",
    },
  });

  return (
    <MantineProvider
      theme={{
        primaryColor: "blue",
        fontSizes: sizes,
      }}
    >
      <MantineReactTable table={table} />
    </MantineProvider>
  );
};

export default Table;
