//@ts-expect-error só o type
export async function preverCrimes(dados) {
  const response = await fetch("http://localhost:8000/prever", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  const json = await response.json();
  return json;
}
