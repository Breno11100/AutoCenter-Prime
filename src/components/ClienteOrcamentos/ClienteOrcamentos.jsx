import { useEffect, useState } from "react";

import { supabase } from "../../services/supabase";

import styles from "./ClienteOrcamentos.module.css";

function ClienteOrcamentos() {

  const [usuario, setUsuario] =
    useState(null);

  const [ordens, setOrdens] =
    useState([]);

  // PEGAR USUÁRIO
  useEffect(() => {

    async function carregarUsuario() {

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) return;

      setUsuario(user);

    }

    carregarUsuario();

  }, []);

  // BUSCAR ORDENS
  useEffect(() => {

    async function carregarOrdens() {

      if (!usuario) return;

      const { data, error } =
        await supabase

          .from("ordens_servico")

          .select(`
            *,
            ordem_servico_itens (
              *,
              servicos (
                nome
              )
            )
          `)

          .eq("cliente_id", usuario.id)

          .order("criado_em", {
            ascending: false
          });

      if (error) {

        console.log(error);

        return;

      }

      setOrdens(data);

    }

    carregarOrdens();

  }, [usuario]);

  return (

    <section className={styles.container}>

      <h1>
        Meus Orçamentos
      </h1>

      <div className={styles.lista}>

        {
          ordens.map((ordem) => (

            <div
              key={ordem.id}
              className={styles.card}
            >

              <div className={styles.topo}>

                <h2>
                  {ordem.titulo}
                </h2>

                <span>
                  {ordem.status}
                </span>

              </div>

              <p>
                {ordem.descricao}
              </p>

              <div className={styles.info}>

                <p>

                  Valor total:
                  {" "}

                  <strong>
                    R$ {ordem.valor_total}
                  </strong>

                </p>

                <p>

                  Previsão:
                  {" "}

                  <strong>
                    {ordem.previsao_entrega}
                  </strong>

                </p>

              </div>

              {/* SERVIÇOS */}
              <div className={styles.servicos}>

                <h3>
                  Serviços
                </h3>

                {
                  ordem.ordem_servico_itens?.map((item) => (

                    <div
                      key={item.id}
                      className={styles.servico}
                    >

                      <p>
                        {item.servicos?.nome}
                      </p>

                      <strong>
                        R$ {item.valor}
                      </strong>

                    </div>

                  ))
                }

              </div>

            </div>

          ))
        }

      </div>

    </section>

  );
}

export default ClienteOrcamentos;