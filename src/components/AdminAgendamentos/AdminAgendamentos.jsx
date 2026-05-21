import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import styles from "./AdminAgendamentos.module.css";

function AdminAgendamentos() {

  const [agendamentos, setAgendamentos] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  async function carregarAgendamentos() {

    const { data, error } =
      await supabase
        .from("agendamentos")
        .select(`
          *,
          usuarios (
            nome,
            telefone
          ),
          veiculos (
            marca,
            modelo,
            placa
          )
        `)
        .order("data_agendada", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setAgendamentos(data || []);
  }

  async function atualizarStatus(id, status) {

    const { error } =
      await supabase
        .from("agendamentos")
        .update({ status })
        .eq("id", id);

    if (error) {
      alert("Erro ao atualizar");
      return;
    }

    carregarAgendamentos();
  }

  async function criarOrdemServico(item) {

    const { error } =
      await supabase
        .from("ordens_servico")
        .insert([
          {
            cliente_id: item.usuario_id,
            veiculo_id: item.veiculo_id,
            titulo: "Ordem de Serviço",
            descricao: item.descricao,
            status: "pendente",
            valor: 0
          }
        ]);

    if (error) {
      console.log("ERRO COMPLETO:", error);
      alert("Erro ao criar OS");
      return;
    }

    alert("OS criada com sucesso!");
  }

  // 🔥 FILTRO APLICADO AQUI
  const agendamentosFiltrados =
    filtro === "todos"
      ? agendamentos
      : agendamentos.filter(item => item.status === filtro);

  return (
    <section className={styles.container}>

      <h1>Gerenciar Agendamentos</h1>

      {/* 🔥 BOTÕES DE FILTRO */}
      <div className={styles.filtros}>

        {["todos", "Pendente", "aprovado", "cancelado"].map((status) => (
          <button
            key={status}
            onClick={() => setFiltro(status)}
            className={filtro === status ? styles.ativoFiltro : ""}
          >
            {status}
          </button>
        ))}

      </div>

      <div className={styles.lista}>

        {agendamentosFiltrados.map((item) => (

          <div key={item.id} className={styles.card}>

            <div>
              <h2>{item.usuarios?.nome}</h2>
              <p>{item.usuarios?.telefone}</p>
            </div>

            <div>
              <h3>
                {item.veiculos?.marca} {item.veiculos?.modelo}
              </h3>
              <p>{item.veiculos?.placa}</p>
            </div>

            <div>
              <p>{item.descricao}</p>

              <p>
                Data:{" "}
                {new Date(item.data_agendada)
                  .toLocaleDateString("pt-BR")}
              </p>

              <span>{item.status}</span>
            </div>

            <div className={styles.buttons}>

              <button
                onClick={() => atualizarStatus(item.id, "aprovado")}
              >
                Aprovar
              </button>

              <button
                onClick={() => criarOrdemServico(item)}
              >
                Criar OS
              </button>

              <button
                className={styles.cancelar}
                onClick={() => atualizarStatus(item.id, "cancelado")}
              >
                Cancelar
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default AdminAgendamentos;