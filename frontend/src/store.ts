import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Patient } from "./models/Patient";

const patientsSlice = createSlice({
  name: "patients",
  initialState: [
    {
      id: "1",
      name: "Tese",
      cpf: "123.456.789-00",
      address: {
        zip_code: "12345-678",
        street: "Rua Teste",
        number: "123",
        district: "Bairro Teste",
        city: "Cidade Teste",
        state: "PR",
        country: "Brasil",
      },
      email: "email@teste.com",
      birth_date: new Date("2005-12-27"),
    },
  ],
  reducers: {
    setPatients: (state: Patient[], action) => {
      return action.payload;
    },
    addPatient: (state: Patient[], action) => {
      state.push(action.payload);
    },
    updatePatient: (state: Patient[], action) => {
      const index = state.findIndex(
        (patient) => patient.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deletePatient: (state: Patient[], action) => {
      return state.filter((patient) => patient.id !== action.payload);
    },
  },
});

export const { addPatient, deletePatient, setPatients, updatePatient } =
  patientsSlice.actions;

export const patientsStore = configureStore({
  reducer: {
    patients: patientsSlice.reducer,
  },
});
