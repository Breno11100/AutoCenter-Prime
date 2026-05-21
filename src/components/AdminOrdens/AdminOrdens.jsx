import { useEffect, useState } from "react";

import { supabase } from "../../services/supabase";

import styles from "./AdminOrdens.module.css";

function AdminOrdens() {

  const [ordens, setOrdens] =
    useState([]);

  useEffect(() => {

    carregarOrdens();

  }, []);

  async function carregarOrdens() {

    const { data, error } =
      await supabase

        .from("ordens_servico")

        .select(`
          *,
          usuarios!cliente_id (
            nome
          ),
          veiculos (
            marca,
            modelo,
            placa
          )
        `)

        .order("data_entrada", {
          ascending: false
        });

    if (error) {

      console.log(error);

      return;

    }

    setOrdens(data);

  }

  async function atualizarOrdem(
    id,
    novosDados
  ) {

    const { error } =
      await supabase

        .from("ordens_servico")

        .update(novosDados)

        .eq("id", id);

    if (error) {

      console.log(error);

      alert("Erro ao atualizar");

      return;

    }

    alert("OS atualizada!");

    carregarOrdens();

  }

  return (

    <section className={styles.container}>

      <h1>
        Ordens de Serviço
      </h1>

      <div className={styles.lista}>

        {
          ordens.map((item) => (

            <div
              key={item.id}
              className={styles.card}
            >

              <div>

                <h2>
                  {item.usuarios?.nome}
                </h2>

                <p>

                  {item.veiculos?.marca}
                  {" "}
                  {item.veiculos?.modelo}

                </p>

                <p>
                  {item.veiculos?.placa}
                </p>

              </div>

              <div>

                <p>
                  {item.descricao}
                </p>

                <label>
                  Valor:
                </label>

                <input

                  type="number"

                  value={item.valor || ""}

                  onChange={(e) => {

                    const novasOrdens =
                      [...ordens];

                    const index =
                      novasOrdens.findIndex(
                        (o) =>
                          o.id === item.id
                      );

                    novasOrdens[index].valor =
                      e.target.value;

                    setOrdens(
                      novasOrdens
                    );

                  }}

                />

                <label>
                  Previsão de entrega:
                </label>

                <input

                  type="date"

                  value={
                    item.previsao_entrega || ""
                  }

                  onChange={(e) => {

                    const novasOrdens =
                      [...ordens];

                    const index =
                      novasOrdens.findIndex(
                        (o) =>
                          o.id === item.id
                      );

                    novasOrdens[index]
                      .previsao_entrega =
                        e.target.value;

                    setOrdens(
                      novasOrdens
                    );

                  }}

                />

                <label>
                  Status:
                </label>

                <select

                  value={item.status}

                  onChange={(e) => {

                    const novasOrdens =
                      [...ordens];

                    const index =
                      novasOrdens.findIndex(
                        (o) =>
                          o.id === item.id
                      );

                    novasOrdens[index]
                      .status =
                        e.target.value;

                    setOrdens(
                      novasOrdens
                    );

                  }}

                >

                  <option value="pendente">
                    Pendente
                  </option>

                  <option value="em_andamento">
                    Em andamento
                  </option>

                  <option value="aguardando_peca">
                    Aguardando peças
                  </option>

                  <option value="finalizado">
                    Finalizada
                  </option>

                </select>

                <button

                  className={styles.salvar}

                  onClick={() =>
                    atualizarOrdem(
                      item.id,
                      {
                        valor: item.valor_total,
                        previsao_entrega:
                          item.previsao_entrega,
                        status: item.status
                      }
                    )
                  }

                >
                  Salvar Alterações
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </section>

  );
}

export default AdminOrdens;