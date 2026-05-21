import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import styles from "./AdminClientes.module.css";

function AdminClientes() {

  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("ativos");

  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {

    const { data, error } =
      await supabase
        .from("usuarios")
        .select(`
          *,
          veiculos (
            id
          )
        `)
        .eq("tipo", "cliente")
        .order("criado_em", {
          ascending: false
        });

    if (error) {
      console.log(error);
      return;
    }

    setClientes(data || []);
  }

  async function toggleCliente(id, statusAtual) {

    const confirmar = window.confirm(
      statusAtual
        ? "Deseja desativar este cliente?"
        : "Deseja ativar este cliente?"
    );

    if (!confirmar) return;

    const { error } =
      await supabase
        .from("usuarios")
        .update({ ativo: !statusAtual })
        .eq("id", id);

    if (error) {
      console.log(error);
      alert("Erro ao atualizar cliente");
      return;
    }

    alert(
      statusAtual
        ? "Cliente desativado!"
        : "Cliente ativado!"
    );

    carregarClientes();
  }

  const clientesFiltrados = (clientes || []).filter((cliente) => {

    const matchBusca =
      cliente.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.email?.toLowerCase().includes(busca.toLowerCase());

    if (!matchBusca) return false;

    if (filtro === "ativos") return cliente.ativo === true;
    if (filtro === "desativados") return cliente.ativo === false;

    return true;
  });

  return (

    <section className={styles.container}>

      <div className={styles.topo}>

        <h1>Clientes</h1>

        <input
          type="text"
          placeholder="Buscar cliente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

      </div>

      {/* FILTROS */}
      <div className={styles.filtros}>

        <button onClick={() => setFiltro("ativos")}>
          Ativos
        </button>

        <button onClick={() => setFiltro("desativados")}>
          Desativados
        </button>

        <button onClick={() => setFiltro("todos")}>
          Todos
        </button>

      </div>

      <div className={styles.lista}>

        {clientesFiltrados.map((cliente) => (

          <div key={cliente.id} className={styles.card}>

            <div>

              <h2>{cliente.nome}</h2>
              <p>{cliente.email}</p>
              <p>{cliente.telefone || "Sem telefone"}</p>

            </div>

            <div className={styles.info}>

              <span>
                {cliente.veiculos?.length || 0} veículo(s)
              </span>

              <button
                className={styles.excluir}
                onClick={() => toggleCliente(cliente.id, cliente.ativo)}
              >
                {cliente.ativo ? "Desativar" : "Ativar"}
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default AdminClientes;