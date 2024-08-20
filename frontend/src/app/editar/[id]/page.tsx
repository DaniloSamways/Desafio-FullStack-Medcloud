"use client";

function fetchPatient(id: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        nome: "Nome Existente",
        descricao: "Descrição Existente",
        // Outros dados
      });
    }, 1000);
  });
  //   return fetch(`http://localhost:3000/patients/${id}`);
}

export default function EditPatient({ params }: { params: { id: string } }) {
  const { id } = params;

  const patient = fetchPatient(id);

  return (
    <h1>
      Editar paciente {id} {patient.then((data: any) => data.nome)}
    </h1>
  );
}
