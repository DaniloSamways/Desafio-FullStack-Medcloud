import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Patient } from "./models/Patient";

const patientsSlice = createSlice({
  name: 'patients',
  initialState: [
    {
      id: "asdfasf",
      name: 'João',
      email: 'daniloi@',
      birth_date: '2021-10-10',
    }
  ],
  reducers: {
    setPatients: (state: Patient[], action) => {
      return action.payload;
    },
    addPatient: (state: Patient[], action) => {
      state.push(action.payload);
    },
    updatePatient: (state: Patient[], action) => {
      const index = state.findIndex(patient => patient.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deletePatient: (state: Patient[], action) => {
      state = state.filter(patient => patient.id !== action.payload);
      return;
    },
  },
});

export const { addPatient, deletePatient, setPatients, updatePatient } = patientsSlice.actions;

export const patientsStore = configureStore({
  reducer: patientsSlice.reducer,
});
