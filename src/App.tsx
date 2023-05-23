import React, { useState, useReducer, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Paper, Stack, Box } from "@mui/material";
import Table from "./components/Table";
import axios from "axios";

function App() {
  const [data, setData] = useState<any[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/sampleData.json");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        width: "80%",
        mx: "auto",
        my: 3,
      }}
    >
      <Table data={data}></Table>
    </Box>
  );
}

export default App;
