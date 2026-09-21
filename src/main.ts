import type { Temp } from "./Temp";

async function loadTable() {
  const data = await getData();
  const table = document.getElementById("table") as HTMLTableElement;
  const row = document.createElement("tr");
  const header1 = document.createElement("th");
  header1.textContent = "Nap";
  const header2 = document.createElement("th");
  header2.textContent = "Hőmérséklet";
  row.appendChild(header1);
  row.appendChild(header2);
  table.appendChild(row);


  for (const item of data) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.textContent = item.day;
    const td2 = document.createElement("td");
    td2.textContent = item.temperature.toString();
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
  }
    
}

async function getData(): Promise<Temp[]> {
  const url = "https://petrik-idojaras-default-rtdb.europe-west1.firebasedatabase.app/.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`avlami nem jo: ${response.status}`);
    }

    const result: Temp[] = await response.json();
    return result;
  } catch (error) {
    console.error('valami nem jo');
    return [];
  }
}

document.getElementById("submit-btn")?.addEventListener("click", (e) => {
  console.log("asd");
  e.preventDefault();
  const table = document.getElementById("table") as HTMLTableElement;
  const temp = document.getElementById("homerseklet") as HTMLInputElement;
  table.innerHTML = "asdasd" + temp.value;
});


document.addEventListener('DOMContentLoaded', () => {loadTable()});