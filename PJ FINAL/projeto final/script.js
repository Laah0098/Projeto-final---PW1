const form = document.getElementById("cadastroForm");
const tableBody = document.querySelector("#cadastroTable tbody");
const cadastroCount = document.getElementById("cadastroCount");
const cadastroSection = document.getElementById("cadastroSection");
const tabelaSection = document.getElementById("tabelaSection");
const linkCadastro = document.getElementById("linkCadastro");
const linkTabela = document.getElementById("linkTabela");
const sidebar = document.getElementById("sidebar");
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const layout = document.querySelector(".layout");

let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

linkCadastro.addEventListener("click", (e) => {
  e.preventDefault();
  tabelaSection.classList.remove("active");
  cadastroSection.classList.add("active");
});

linkTabela.addEventListener("click", (e) => {
  e.preventDefault();
  cadastroSection.classList.remove("active");
  tabelaSection.classList.add("active");
});

toggleSidebarBtn.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  if (isOpen) {
    layout.classList.add("sidebar-open");
  } else {
    layout.classList.remove("sidebar-open");
  }
});

sidebar.addEventListener("mouseenter", () => {
  sidebar.classList.add("open");
  layout.classList.add("sidebar-open");
});

sidebar.addEventListener("mouseleave", () => {
  sidebar.classList.remove("open");
  layout.classList.remove("sidebar-open");
});

function renderTable() {
  tableBody.innerHTML = "";
  cadastros.forEach((cadastro, index) => {
    const row = document.createElement("tr");
    const senhaComBolinhas = "*".repeat(cadastro.campo3.length); // Aqui a senha será exibida com bolinhas

    row.innerHTML = `
      <td>${cadastro.campo1}</td>
      <td>${cadastro.campo2}</td>
      <td>${senhaComBolinhas}</td>
      <td><button onclick="removeCadastro(${index})">Remover</button></td>
    `;
    tableBody.appendChild(row);
  });
  cadastroCount.textContent = `(${cadastros.length})`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const novoCadastro = {
    campo1: document.getElementById("campo1").value,
    campo2: document.getElementById("campo2").value,
    campo3: document.getElementById("campo3").value,
  };
  cadastros.push(novoCadastro);
  localStorage.setItem("cadastros", JSON.stringify(cadastros));
  renderTable();
  form.reset();
});

function removeCadastro(index) {
  cadastros.splice(index, 1);
  localStorage.setItem("cadastros", JSON.stringify(cadastros));
  renderTable();
}

// Alternar visibilidade da senha
const togglePassword = document.getElementById("togglePassword");
const campo3 = document.getElementById("campo3");

togglePassword.addEventListener("click", () => {
  // Alternar entre "password" e "text"
  const type = campo3.type === "password" ? "text" : "password";
  campo3.type = type;

  // Alterar o ícone conforme o tipo de campo
  togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

renderTable();
