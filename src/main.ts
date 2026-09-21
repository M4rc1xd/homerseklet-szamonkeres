import type { Temp } from "./Temp";
import './style.css'

async function loadTable() {
  const data = await getData();
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



  for (const item of data) {
    tableHozzaadas(item.day, item.temperature);
  }
    
}

function tableHozzaadas(day: string, temp: number){
  const table = document.getElementById("table") as HTMLTableElement;

    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.textContent = day;
    const td2 = document.createElement("td");
    td2.textContent = temp.toString();
    if (temp > 29) {
      tr.style.backgroundColor = "#ff7f7f";
    } else if (temp < 10) {
      tr.style.backgroundColor = "#85e0ff";
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
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
  e.preventDefault();
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: 'long' });
  tableHozzaadas(day, document.getElementById("homerseklet") as HTMLInputElement ? parseInt((document.getElementById("homerseklet") as HTMLInputElement).value) : 0);
  document.getElementById("homerseklet")!.value = "";

});

// document.getElementById("export")?.addEventListener("click", () => {

// }


document.addEventListener('DOMContentLoaded', () => {loadTable()});