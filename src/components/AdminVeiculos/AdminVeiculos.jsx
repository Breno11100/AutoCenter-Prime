import { useEffect, useState } from "react";

import { supabase } from "../../services/supabase";

import styles from "./AdminVeiculos.module.css";

function AdminVeiculos() {

  const [veiculos, setVeiculos] =
    useState([]);

  const [busca, setBusca] =
    useState("");

  useEffect(() => {

    carregarVeiculos();

  }, []);

  async function carregarVeiculos() {

    const { data, error } =
      await supabase

        .from("veiculos")

        .select(`
          *,
          usuarios (
            nome,
            email
          )
        `)

        .order("criado_em", {
          ascending: false
        });

    if (error) {

      console.log(error);

      return;

    }

    setVeiculos(data);

  }

  async function excluirVeiculo(id) {

    const confirmar =
      window.confirm(
        "Deseja excluir este veículo?"
      );

    if (!confirmar) return;

    const { error } =
      await supabase

        .from("veiculos")

        .delete()

        .eq("id", id);

    if (error) {

      console.log(error);

      alert("Erro ao excluir");

      return;

    }

    alert("Veículo excluído!");

    carregarVeiculos();

  }

  const veiculosFiltrados =
    veiculos.filter((v) =>
      v.marca
        .toLowerCase()
        .includes(busca.toLowerCase()) ||
      v.modelo
        .toLowerCase()
        .includes(busca.toLowerCase()) ||
      v.placa
        .toLowerCase()
        .includes(busca.toLowerCase())
    );

  return (

    <section className={styles.container}>

      <div className={styles.topo}>

        <h1>
          Veículos
        </h1>

        <input

          type="text"

          placeholder="Buscar por marca, modelo ou placa..."

          value={busca}

          onChange={(e) =>
            setBusca(e.target.value)
          }

        />

      </div>

      <div className={styles.lista}>

        {veiculosFiltrados.map((v) => (

          <div
            key={v.id}
            className={styles.card}
          >

            <div>

              <h2>
                {v.marca} {v.modelo}
              </h2>

              <p>
                Placa: {v.placa}
              </p>

              <p>
                Ano: {v.ano}
              </p>

              <p>
                KM: {v.quilometragem}
              </p>

            </div>

            <div className={styles.info}>

              <p>
                👤 {v.usuarios?.nome}
              </p>

              <p>
                📧 {v.usuarios?.email}
              </p>

              <button
                className={styles.excluir}
                onClick={() =>
                  excluirVeiculo(v.id)
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

export default AdminVeiculos;