import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { ITodo } from "../../models";

interface IInitialState {
  todos: ITodo[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IInitialState = { todos: [], isLoading: false, error: "" };

export const getTodosAsync = createAsyncThunk(
  "todos/fetchTodos",
  async (): Promise<ITodo[]> => {
    const response = await agent.todo.getTodos();
    return response.data;
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.isLoading = true;
      state.todos.push(action.payload);
      state.isLoading = false;
    },
    deleteTodo: (state, { payload }: PayloadAction<number>) => {
      state.isLoading = true;
      state.todos = state.todos.filter((x) => x.id !== payload);
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getTodosAsync.fulfilled, (state, { payload }) => {
        console.log(payload, "here is the payload");
        state.isLoading = false;
        state.todos = state.todos.concat(payload);
      })
      .addCase(getTodosAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      });
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
