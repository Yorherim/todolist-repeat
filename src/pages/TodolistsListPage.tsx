import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { Container, Grid, Paper } from "@mui/material";

import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import { Todolist } from "../components/Todolist/Todolist";
import { FilterType } from "../state/todolists/todolists-slice";
import { authSelectors } from "../state/auth";
import { todolistsActions, todolistsSelectors } from "../state/todolists";
import { useActions } from "../hooks/useActions";

export const TodolistsListPage: React.FC = () => {
  const {
    fetchTodolistsTC,
    removeTodolistTC,
    addTodolistTC,
    changeTodolistTitleTC,
    changeTodolistFilter,
  } = useActions(todolistsActions);
  const todolists = useSelector(todolistsSelectors.getTodolists);
  const isLoggedIn = useSelector(authSelectors.getAuthIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTodolistsTC();
    }
  }, [isLoggedIn, fetchTodolistsTC]);

  const changeFilter = useCallback(
    (filter: FilterType, todolistId: string) => {
      changeTodolistFilter({ todolistId, filter });
    },
    [changeTodolistFilter],
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      removeTodolistTC(todolistId);
    },
    [removeTodolistTC],
  );

  const addTodolist = useCallback(
    (title: string) => {
      addTodolistTC(title);
    },
    [addTodolistTC],
  );

  const changeTodolistTitle = useCallback(
    (newTitle: string, todolistId: string) => {
      changeTodolistTitleTC({ todolistId, newTitle });
    },
    [changeTodolistTitleTC],
  );

  if (!isLoggedIn) {
    return <Navigate to="/todolist-repeat/auth" />;
  }
  return (
    <>
      <Container fixed>
        <AddItemForm addItem={addTodolist} className="input-todolist" />
        <Grid container spacing={5}>
          {todolists.map((td) => {
            return (
              <Grid item key={td.id}>
                <Paper className="paper">
                  <Todolist
                    title={td.title}
                    filter={td.filter}
                    entityStatus={td.entityStatus}
                    todolistId={td.id}
                    changeFilter={changeFilter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};
