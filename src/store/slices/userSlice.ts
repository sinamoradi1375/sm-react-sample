import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { IUser } from "../../models";

interface IInitialState {
  users: IUser[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IInitialState = { users: [], isLoading: false, error: "" };

export const fetchUsersByThunk = createAsyncThunk(
  "todos/fetchUsers",
  async (): Promise<IUser[]> => {
    const response = await agent.todo.getUsers();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.isLoading = true;
      state.users.push(action.payload);
      state.isLoading = false;
    },
    editUser: (state, { payload }: PayloadAction<IUser>) => {
      state.isLoading = true;
      state.users = state.users.map((x) => {
        if (x.id === payload.id) {
          return { ...payload };
        } else {
          return x;
        }
      });
      state.isLoading = false;
    },
    deleteUser: (state, { payload }: PayloadAction<number>) => {
      state.isLoading = true;
      state.users = state.users.filter((x) => x.id !== payload);
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersByThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(fetchUsersByThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = state.users.concat(payload);
      })
      .addCase(fetchUsersByThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      });
  },
});

export const { addUser, deleteUser, editUser } = userSlice.actions;

export default userSlice.reducer;
