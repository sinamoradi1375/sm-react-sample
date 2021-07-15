import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../models";

const initialState: ITodo[] = [];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.push(action.payload);
    },
    deleteTodo: (state, { payload }: PayloadAction<number>) => {
      state = state.filter((x) => x.id !== payload);
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
