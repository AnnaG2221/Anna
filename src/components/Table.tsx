import React, { useState, useEffect } from "react";
import {
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface ITable {
  data: any[];
}
type SortDirection = "ascending" | "descending";

const setBackGroundColor: any = (assetClass: string) => {
  switch (assetClass) {
    case "Equities":
      return "lightBlue";
    case "Credit":
      return "lightGreen";
    case "Macro":
      return "white";
    default:
      return "inherit";
  }
};

const setNumberColor: any = (cell: string | number) => {
  if (typeof cell === "string") return "inherit";
  return cell >= 0 ? "darkBlue" : "red";
};

const assetClassOrder: any = {
  Equities: 1,
  Macro: 2,
  Credit: 3,
};

const sortMap: any = {
  assetClass: (a: any, b: any, direction: SortDirection) => {
    return direction === "ascending"
      ? assetClassOrder[a.assetClass] - assetClassOrder[b.assetClass]
      : assetClassOrder[b.assetClass] - assetClassOrder[a.assetClass];
  },
  price: (a: any, b: any, direction: SortDirection) => {
    return direction === "ascending" ? a.price - b.price : b.price - a.price;
  },
  ticker: (a: any, b: any, direction: SortDirection) => {
    return direction === "ascending"
      ? a.ticker.localeCompare(b.ticker)
      : b.ticker.localeCompare(a.ticker);
  },
};

const Table: React.FC<ITable> = ({ data }) => {
  const titles: string[] = Object.keys(data[0] || {});
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState<any>({
    key: null,
    direction: null,
  });

  const handleSort = (title: string) => {
    let direction = "ascending";
    if (sortConfig.key === title && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: title, direction });
    const sort = [...data].sort((a, b) => sortMap[title](a, b, direction));
    setSortedData(sort);
  };
  useEffect(() => {
    setSortedData(data);
  }, [data]);

  return (
    <MuiTable>
      <TableHead>
        <TableRow>
          {titles.map((title: string) => (
            <TableCell
              key={title}
              onClick={() => handleSort(title)}
              sx={{ fontWeight: "900" }}
            >
              {title.toUpperCase()}
              {sortConfig.key === title && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.map((item: any) => {
          const cells: string[] = Object.values(item);
          return (
            <TableRow
              key={item.name}
              sx={{
                "&.MuiTableRow-root": {
                  backgroundColor: setBackGroundColor(item.assetClass),
                },
              }}
            >
              {cells.map((cell, index) => (
                <TableCell key={cell} sx={{ color: setNumberColor(cell) }}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );
};

export default Table;
