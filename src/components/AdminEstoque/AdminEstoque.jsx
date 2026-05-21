import { useEffect, useState } from "react";

import { supabase } from "../../services/supabase";

import styles from "./AdminEstoque.module.css";

function AdminEstoque() {

  const [itens, setItens] =
    useState([]);

  const [busca, setBusca] =
    useState("");

  // controla entrada por item
  const [entrada, setEntrada] =
    useState({});

  useEffect(() => {

    carregarEstoque();

  }, []);

  async function carregarEstoque() {

    const { data, error } =
      await supabase

        .from("estoque")

        .select("*")

        .order("criado_em", {
          ascending: false
        });

    if (error) {

      console.log(error);
      return;

    }

    setItens(data);

  }

  async function excluirItem(id) {

    const confirmar =
      window.confirm(
        "Deseja excluir este item?"
      );

    if (!confirmar) return;

    const { error } =
      await supabase

        .from("estoque")

        .delete()

        .eq("id", id);

    if (error) {

      console.log(error);

      alert("Erro ao excluir");

      return;

    }

    alert("Item removido!");

    carregarEstoque();

  }

  // 🔥 ENTRADA DE ESTOQUE
  async function adicionarEntrada(id) {

    const quantidade =
      Number(entrada[id]);

    if (!quantidade || quantidade <= 0)
      return;

    const item = itens.find(
      (i) => i.id === id
    );

    const novaQtd =
      Number(item.quantidade) + quantidade;

    const { error } =
      await supabase

        .from("estoque")

        .update({
          quantidade: novaQtd
        })

        .eq("id", id);

    if (error) {

      console.log(error);

      alert("Erro ao atualizar estoque");

      return;

    }

    setEntrada({
      ...entrada,
      [id]: ""
    });

    carregarEstoque();
  }

  const filtrados =
    itens.filter((i) =>
      i.nome
        .toLowerCase()
        .includes(busca.toLowerCase())
    );

  return (

    <section className={styles.container}>

      <div className={styles.topo}>

        <h1>
          Estoque
        </h1>

        <input

          type="text"

          placeholder="Buscar item..."

          value={busca}

          onChange={(e) =>
            setBusca(e.target.value)
          }

        />

      </div>

      <div className={styles.lista}>

        {filtrados.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            {/* INFO ITEM */}
            <div>

              <h2>
                {item.nome}
              </h2>

              <p>
                {item.descricao}
              </p>

              <p>
                Quantidade:{" "}
                <strong>
                  {item.quantidade}
                </strong>
              </p>

            </div>

            {/* PREÇOS */}
            <div>

              <p>
                Custo: R${" "}
                {Number(item.preco_custo).toFixed(2)}
              </p>

              <p>
                Venda: R${" "}
                {Number(item.preco_venda).toFixed(2)}
              </p>

              {/* ENTRADA */}
              <div style={{
                marginTop: "10px"
              }}>

                <input

                  type="number"

                  placeholder="Entrada"

                  value={
                    entrada[item.id] || ""
                  }

                  onChange={(e) =>
                    setEntrada({
                      ...entrada,
                      [item.id]:
                        e.target.value
                    })
                  }

                  style={{
                    width: "100%",
                    height: "40px",
                    marginBottom: "8px",
                    borderRadius: "10px",
                    border:
                      "1px solid #2f3645",
                    background:
                      "#0f1117",
                    color: "#fff",
                    padding: "0 10px"
                  }}

                />

                <button
                  onClick={() =>
                    adicionarEntrada(
                      item.id
                    )
                  }
                  style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#ffd000",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Entrada
                </button>

              </div>

              {/* EXCLUIR */}
              <button
                className={styles.excluir}
                onClick={() =>
                  excluirItem(item.id)
                }
              >
                Excluir
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  );
}

export default AdminEstoque;