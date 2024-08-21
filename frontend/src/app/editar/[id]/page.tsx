import { redirect } from "next/navigation";
import { Client } from "./Client";

async function fetchPatient(id: string) {
  const response = await fetch(`http://localhost:3000/patients/${id}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
}

export default async function EditPatient({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const patient = await fetchPatient(id);

  if (!patient) {
     return redirect("/");
  }

  return (
    <Client patient={patient} />
  );
}
