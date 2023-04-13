import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";
import "./App.scss";

import { TodolistsListPage } from "../pages/TodolistsListPage";
import { LoginPage } from "../pages/LoginPage";
import { HeaderLayout } from "../layouts/HeaderLayout";
import { getAppInitialized } from "../state/app/app-selectors";
import { useActions } from "../hooks/useActions";
import { appActions } from "../state/app";

const App: React.FC = () => {
  const { initializeAppTC } = useActions(appActions);
  const isInitialized = useSelector(getAppInitialized);

  useEffect(() => {
    initializeAppTC();
  }, [initializeAppTC]);

  if (!isInitialized) {
    return (
      <Box sx={{ display: "flex" }} className={"circularProgress"}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/todolist-repeat/" element={<HeaderLayout />}>
          <Route index element={<TodolistsListPage />} />
          <Route path="auth" element={<LoginPage />} />
          <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
