import { useEffect, useState } from "react";

import { supabase } from "../../services/supabase";

import styles from "./AdminFinanceiro.module.css";

function AdminFinanceiro() {

  const [ordens, setOrdens] = useState([]);

  const [resumo, setResumo] = useState({
    total: 0,
    finalizadas: 0,
    faturamento: 0
  });

  useEffect(() => {
    carregarFinanceiro();
  }, []);

  async function carregarFinanceiro() {

    const { data, error } =
      await supabase
        .from("ordens_servico")
        .select(`
          *,
          usuarios!cliente_id (nome),
          veiculos (marca, modelo, placa)
        `)
        .order("data_entrada", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    console.log("ORDENS:", data);

    setOrdens(data || []);
    calcularResumo(data || []);
  }

  function calcularResumo(data) {

  const total = data.length;

  const finalizadas = data.filter((o) =>
    String(o.status).toLowerCase().trim() === "finalizado"
  ).length;

  const faturamento = data
    .filter((o) =>
      String(o.status).toLowerCase().trim() === "finalizado"
    )
    .reduce((acc, o) => {
      const valor = Number(o.valor_total ?? o.valor ?? 0);
      return acc + valor;
    }, 0);

  setResumo({
    total,
    finalizadas,
    faturamento
  });
}

  return (

    <section className={styles.container}>

      <h1>Financeiro</h1>

      {/* RESUMO */}
      <div className={styles.cards}>

        <div className={styles.cardResumo}>
          <h3>Total de OS</h3>
          <p>{resumo.total}</p>
        </div>

        <div className={styles.cardResumo}>
          <h3>Finalizadas</h3>
          <p>{resumo.finalizadas}</p>
        </div>

        <div className={styles.cardResumo}>
          <h3>Faturamento</h3>
          <p>
            R$ {resumo.faturamento.toFixed(2)}
          </p>
        </div>

      </div>

      {/* LISTA */}
      <div className={styles.lista}>

        {ordens.map((o) => (

          <div key={o.id} className={styles.card}>

            <div>
              <h2>{o.usuarios?.nome}</h2>

              <p>
                {o.veiculos?.marca} {o.veiculos?.modelo}
              </p>

              <p>
                Placa: {o.veiculos?.placa}
              </p>
            </div>

            <div>
              <p>Status: {o.status}</p>

              <p>Entrada: {o.data_entrada}</p>

              <p>
                Valor: R$ {Number(o.valor_total ?? o.valor ?? 0).toFixed(2)}
              </p>
            </div>

          </div>

        ))}

      </div>

    </section>

  );
}

export default AdminFinanceiro;