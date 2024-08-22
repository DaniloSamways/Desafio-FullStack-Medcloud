import { redirect } from "next/navigation";
import { Client } from "./Client";

async function fetchPatient(id: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/patients/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (err) {
    return null;
  }
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

  return <Client patient={patient} />;
}
