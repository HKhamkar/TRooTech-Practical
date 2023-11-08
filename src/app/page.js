"use client";

import styles from "./page.module.css";
import TableComponent from "@/Components/TableComponent";
import { Box, Container } from "@mui/material";

function Home() {
  return (
    <Box sx={{ display: "inline-block", width: "100%" }}>
      <Container>
        <TableComponent />
      </Container>
    </Box>
  );
}

export default Home;
