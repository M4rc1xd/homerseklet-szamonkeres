function loadTable() {
  const table = document.getElementById('table') as HTMLTableElement;
  const URL = "https://petrik-idojaras-default-rtdb.europe-west1.firebasedatabase.app/.json";

}
document.getElementById("submit-btn")?.addEventListener("click", (e) => {
  console.log("asd");
  e.preventDefault();
  const btn = document.getElementById("submit-btn") as HTMLButtonElement;
  const table = document.getElementById("table") as HTMLTableElement;
  table.innerHTML = "asdasd" + document.getElementById("homerseklet");
});


document.addEventListener('DOMContentLoaded', () => {loadTable()});