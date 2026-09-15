import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../lib/axios';

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/auth/me');
            return res.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Not authenticated');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.post('/auth/register', formData);
            return res.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.post('/auth/login', formData);
            return res.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        isLoading: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            });
    },
});

export default authSlice.reducer;
