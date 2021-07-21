import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { IUser } from "../../models";

interface IInitialState {
  users: IUser[];
  error: string | undefined;
}

const initialState: IInitialState = { users: [], error: "" };

export const fetchUsersByThunk = createAsyncThunk(
  "users/fetchUsers",
  async (): Promise<IUser[]> => {
    const response = await agent.users.getUsers();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    editUser: (state, { payload }: PayloadAction<IUser>) => {
      state.users = state.users.map((x) => {
        if (x.id === payload.id) {
          return { ...payload };
        } else {
          return x;
        }
      });
    },
    deleteUser: (state, { payload }: PayloadAction<number>) => {
      state.users = state.users.filter((x) => x.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersByThunk.pending, (state, { payload }) => {})
      .addCase(fetchUsersByThunk.fulfilled, (state, { payload }) => {
        state.users = state.users.concat(payload);
      })
      .addCase(fetchUsersByThunk.rejected, (state, { error }) => {
        state.error = error.message;
      });
  },
});

export const { addUser, deleteUser, editUser } = userSlice.actions;

export default userSlice.reducer;
