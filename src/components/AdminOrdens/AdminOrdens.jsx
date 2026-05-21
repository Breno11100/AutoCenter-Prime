import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import styles from "./AdminOrdens.module.css";

function AdminOrdens() {

  const [ordens, setOrdens] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [servicosSelecionados, setServicosSelecionados] = useState({});
  const [modalAberto, setModalAberto] = useState(null);

  const [filtroStatus, setFiltroStatus] = useState("todos");

  useEffect(() => {
    carregarServicos();
  }, []);

  useEffect(() => {
    carregarOrdens();
  }, [filtroStatus]);

  async function carregarServicos() {
    const { data } = await supabase.from("servicos").select("*");
    setServicos(data || []);
  }

  async function carregarOrdens() {

    let query = supabase
      .from("ordens_servico")
      .select(`
        *,
        usuarios!cliente_id ( nome ),
        veiculos ( marca, modelo, placa ),
        ordem_servico_itens (
          servico_id,
          servicos ( nome, valor_base )
        )
      `)
      .order("data_entrada", { ascending: false });

    if (filtroStatus !== "todos") {
      query = query.eq("status", filtroStatus);
    }

    const { data } = await query;
    setOrdens(data || []);
  }

  function toggleServico(ordemId, servico) {

    setServicosSelecionados(prev => {
      const atuais = prev[ordemId] || [];
      const existe = atuais.some(s => s.id === servico.id);

      return {
        ...prev,
        [ordemId]: existe
          ? atuais.filter(s => s.id !== servico.id)
          : [...atuais, servico]
      };
    });
  }

  // ❌ ANTIGO (removido cálculo errado por estado local)
  // function calcularTotal(ordemId) { ... }

  // ✔ NOVO: cálculo baseado no banco
  function calcularTotalOrdem(ordem) {
    const itens = ordem.ordem_servico_itens || [];

    return itens.reduce((acc, item) => {
      return acc + Number(item.servicos?.valor_base || 0);
    }, 0);
  }

  function abrirModal(ordem) {

    const itens = ordem.ordem_servico_itens || [];

    setServicosSelecionados(prev => ({
      ...prev,
      [ordem.id]: itens.map(i => ({
        id: i.servico_id,
        valor_base: i.servicos?.valor_base || 0,
        nome: i.servicos?.nome
      }))
    }));

    setModalAberto(ordem.id);
  }

  async function salvarOrdem(ordemId) {

    const selecionados = servicosSelecionados[ordemId] || [];

    const total = selecionados.reduce(
      (acc, s) => acc + Number(s.valor_base),
      0
    );

    await supabase
      .from("ordens_servico")
      .update({ valor_total: total })
      .eq("id", ordemId);

    await supabase
      .from("ordem_servico_itens")
      .delete()
      .eq("ordem_servico_id", ordemId);

    const itens = selecionados.map(s => ({
      ordem_servico_id: ordemId,
      servico_id: s.id,
      valor: s.valor_base
    }));

    await supabase
      .from("ordem_servico_itens")
      .insert(itens);

    setModalAberto(null);
    carregarOrdens();
  }

  async function atualizarStatus(id, status) {

    await supabase
      .from("ordens_servico")
      .update({ status })
      .eq("id", id);

    carregarOrdens();
  }

  return (
    <section className={styles.container}>

      <h1>Ordens de Serviço</h1>

      <div className={styles.filtros}>

        {[
          "todos",
          "pendente",
          "em_andamento",
          "aguardando_peca",
          "finalizado"
        ].map((status) => (
          <button
            key={status}
            onClick={() => setFiltroStatus(status)}
            className={filtroStatus === status ? styles.ativoFiltro : ""}
          >
            {status.replace("_", " ")}
          </button>
        ))}

      </div>

      <div className={styles.lista}>

        {ordens.map((item) => {

          const total = calcularTotalOrdem(item);

          return (
            <div key={item.id} className={styles.card}>

              <div>
                <h2>{item.usuarios?.nome}</h2>
                <p>{item.veiculos?.marca} {item.veiculos?.modelo}</p>
                <p>{item.veiculos?.placa}</p>

                <div className={styles.statusArea}>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      atualizarStatus(item.id, e.target.value)
                    }
                  >
                    <option value="pendente">Pendente</option>
                    <option value="em_andamento">Em andamento</option>
                    <option value="aguardando_peca">Aguardando peça</option>
                    <option value="finalizado">Finalizado</option>
                  </select>
                </div>

              </div>

              <div>

                <p>{item.descricao}</p>

                <p><strong>Total: R$ {total.toFixed(2)}</strong></p>

                <button
                  className={styles.salvar}
                  onClick={() => abrirModal(item)}
                >
                  Selecionar Serviços
                </button>

                <button
                  className={styles.salvar}
                  onClick={() => salvarOrdem(item.id)}
                >
                  Salvar OS
                </button>

              </div>

            </div>
          );
        })}

      </div>

      {modalAberto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>

            <h2>Serviços da OS</h2>

            <div className={styles.listaServicos}>

              {servicos.map((s) => {

                const selecionado =
                  (servicosSelecionados[modalAberto] || [])
                    .some(sel => sel.id === s.id);

                return (
                  <div
                    key={s.id}
                    className={`${styles.servicoItem} ${selecionado ? styles.ativo : ""}`}
                    onClick={() => toggleServico(modalAberto, s)}
                  >
                    <div className={styles.checkbox}>
                      {selecionado ? "✔" : ""}
                    </div>

                    <div className={styles.nome}>{s.nome}</div>

                    <div className={styles.valor}>
                      R$ {Number(s.valor_base).toFixed(2)}
                    </div>
                  </div>
                );
              })}

            </div>

            <p className={styles.total}>
              <strong>
                Total: R$ {
                  (servicosSelecionados[modalAberto] || [])
                    .reduce((acc, s) => acc + Number(s.valor_base), 0)
                    .toFixed(2)
                }
              </strong>
            </p>

            <div className={styles.modalActions}>
              <button onClick={() => setModalAberto(null)}>Fechar</button>
              <button onClick={() => salvarOrdem(modalAberto)}>Salvar</button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

export default AdminOrdens;