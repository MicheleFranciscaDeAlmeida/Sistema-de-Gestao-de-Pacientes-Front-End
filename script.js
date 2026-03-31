const form = document.getElementById("formPaciente");
const tabela = document.getElementById("tabelaPacientes");
const busca = document.getElementById("busca");

let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
let editIndex = null;

function salvar() {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
}

function renderizar(filtro = "") {
    tabela.innerHTML = "";

    pacientes
        .filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase()))
        .forEach((p, index) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
        <td>${p.nome}</td>
        <td>${p.idade}</td>
        <td>${p.cpf || "-"}</td>
        <td>
          <button onclick="editar(${index})">Editar</button>
          <button onclick="remover(${index})">Excluir</button>
        </td>
      `;

            tabela.appendChild(tr);
        });
}

function editar(index) {
    const paciente = pacientes[index];

    document.getElementById("nome").value = paciente.nome;
    document.getElementById("idade").value = paciente.idade;
    document.getElementById("cpf").value = paciente.cpf;

    editIndex = index;
}

function remover(index) {
    pacientes.splice(index, 1);
    salvar();
    renderizar(busca.value);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const cpf = document.getElementById("cpf").value;

    if (editIndex !== null) {
        pacientes[editIndex] = { nome, idade, cpf };
        editIndex = null;
    } else {
        pacientes.push({ nome, idade, cpf });
    }

    salvar();
    renderizar(busca.value);
    form.reset();
});

/* 🔍 busca dinâmica */
busca.addEventListener("input", () => {
    renderizar(busca.value);
});

renderizar();