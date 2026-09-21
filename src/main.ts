import type { Temp } from "./Temp";
import "./style.css";

let lista: Temp[] = [];

async function loadTable() {
  const data = await getData();

  lista.push(...data);

  tableIras();
}

function tableIras() {
  const table = document.getElementById("table") as HTMLTableElement;
  table.innerHTML = "";
  const row = document.createElement("tr");
  const header1 = document.createElement("th");
  header1.textContent = "Nap";
  const header2 = document.createElement("th");
  header2.textContent = "Hőmérséklet";
  row.appendChild(header1);
  row.appendChild(header2);
  table.appendChild(row);
  for (const { day, temperature } of lista) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.textContent = day;
    const td2 = document.createElement("td");
    td2.textContent = temperature.toString();
    if (temperature > 29) {
      tr.style.backgroundColor = "#ff7f7f";
    } else if (temperature < 10) {
      tr.style.backgroundColor = "#85e0ff";
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
  }
}

async function getData(): Promise<Temp[]> {
  const url =
    "https://petrik-idojaras-default-rtdb.europe-west1.firebasedatabase.app/.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`avlami nem jo: ${response.status}`);
    }

    const result: Temp[] = await response.json();
    return result;
  } catch (error) {
    console.error("valami nem jo");
    return [];
  }
}

document.getElementById("submit-btn")?.addEventListener("click", (e) => {
  e.preventDefault();
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  lista.push({
    day: day,
    temperature: parseInt(
      (document.getElementById("homerseklet") as HTMLInputElement).value,
    ),
  });
  tableIras();
  document.getElementById("homerseklet")!.value = "";
});

document.getElementById("export")?.addEventListener("click", () => {
  const textArea = document.getElementById("exported") as HTMLTextAreaElement;
  textArea.value = JSON.stringify(lista);
});

document.addEventListener("DOMContentLoaded", () => {
  loadTable();
});
