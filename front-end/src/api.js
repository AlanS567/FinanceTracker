import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const signup = (data) => api.post('/auth/signup', data);
export const addExpense = (expense) => api.post('/expenses', expense);
export const getExpenses = () => api.get('/expenses');
export const updateExpense = (id, updatedExpense) => api.put(`/expenses/${id}`, updatedExpense);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);
