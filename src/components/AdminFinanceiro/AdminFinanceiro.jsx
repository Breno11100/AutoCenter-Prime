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
          veiculos (marca, modelo, placa),
          ordem_servico_itens (
            valor,
            servicos (nome)
          )
        `)
        .eq("status", "finalizado")
        .order("data_entrada", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setOrdens(data || []);
    calcularResumo(data || []);
  }

  function calcularResumo(data) {

    const total = data.length;

    const faturamento = data.reduce((acc, o) => {

      const somaItens =
        o.ordem_servico_itens?.reduce((sum, item) => {
          return sum + Number(item.valor || 0);
        }, 0) || 0;

      return acc + somaItens;
    }, 0);

    setResumo({
      total,
      finalizadas: total,
      faturamento
    });
  }

  return (
    <section className={styles.container}>

      <h1>Financeiro</h1>

      {/* RESUMO */}
      <div className={styles.cards}>

        <div className={styles.cardResumo}>
          <h3>Finalizadas</h3>
          <p>{resumo.finalizadas}</p>
        </div>

        <div className={styles.cardResumo}>
          <h3>Faturamento</h3>
          <p>R$ {resumo.faturamento.toFixed(2)}</p>
        </div>

      </div>

      {/* LISTA */}
      <div className={styles.lista}>

        {ordens.map((o) => {

          const totalOS =
            o.ordem_servico_itens?.reduce((acc, item) => {
              return acc + Number(item.valor || 0);
            }, 0) || 0;

          return (
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

                <p>Entrada: {o.data_entrada}</p>

                <p className={styles.valorDestaque}>
                  Valor OS: R$ {totalOS.toFixed(2)}
                </p>

                <div>

                  {o.ordem_servico_itens?.map((item, index) => (
                    <p key={index}>
                      • {item.servicos?.nome} — R$ {item.valor}
                    </p>
                  ))}
                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default AdminFinanceiro;