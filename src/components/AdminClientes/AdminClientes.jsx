import { useEffect, useState } from "react";

import { supabase } from "../../services/supabase";

import styles from "./AdminClientes.module.css";

function AdminClientes() {

  const [clientes, setClientes] =
    useState([]);

  const [busca, setBusca] =
    useState("");

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

    setClientes(data);

  }

  async function excluirCliente(id) {

    const confirmar =
      window.confirm(
        "Deseja excluir este cliente?"
      );

    if (!confirmar) return;

    const { error } =
      await supabase

        .from("usuarios")

        .delete()

        .eq("id", id);

    if (error) {

      console.log(error);

      alert("Erro ao excluir");

      return;

    }

    alert("Cliente excluído!");

    carregarClientes();

  }

  const clientesFiltrados =
    clientes.filter((cliente) =>
      cliente.nome
        .toLowerCase()
        .includes(
          busca.toLowerCase()
        )
    );

  return (

    <section className={styles.container}>

      <div className={styles.topo}>

        <h1>
          Clientes
        </h1>

        <input

          type="text"

          placeholder="Buscar cliente..."

          value={busca}

          onChange={(e) =>
            setBusca(e.target.value)
          }

        />

      </div>

      <div className={styles.lista}>

        {
          clientesFiltrados.map(
            (cliente) => (

              <div
                key={cliente.id}
                className={styles.card}
              >

                <div>

                  <h2>
                    {cliente.nome}
                  </h2>

                  <p>
                    {cliente.email}
                  </p>

                  <p>
                    {cliente.telefone ||
                      "Sem telefone"}
                  </p>

                </div>

                <div
                  className={styles.info}
                >

                  <span>

                    {
                      cliente.veiculos
                        ?.length
                    }
                    {" "}
                    veículo(s)

                  </span>

                  <button
                    className={
                      styles.excluir
                    }
                    onClick={() =>
                      excluirCliente(
                        cliente.id
                      )
                    }
                  >
                    Excluir
                  </button>

                </div>

              </div>

            )
          )
        }

      </div>

    </section>

  );
}

export default AdminClientes;