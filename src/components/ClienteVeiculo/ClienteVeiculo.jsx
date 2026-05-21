import { useEffect, useState } from "react";

import { supabase } from "../../services/supabase";

import styles from "./ClienteVeiculo.module.css";

function ClienteVeiculo() {

  const [usuario, setUsuario] =
    useState(null);

  const [veiculos, setVeiculos] =
    useState([]);

  const [marca, setMarca] =
    useState("");

  const [modelo, setModelo] =
    useState("");

  const [ano, setAno] =
    useState("");

  const [placa, setPlaca] =
    useState("");

  const [quilometragem, setQuilometragem] =
    useState("");

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

  // CARREGAR VEÍCULOS
  useEffect(() => {

    async function carregarVeiculos() {

      if (!usuario) return;

      const { data, error } =
        await supabase

          .from("veiculos")

          .select("*")

          .eq("usuario_id", usuario.id);

      if (error) {
        console.log(error);
        return;
      }

      setVeiculos(data);

    }

    carregarVeiculos();

  }, [usuario]);

  // CADASTRAR VEÍCULO
  async function cadastrarVeiculo(e) {

    e.preventDefault();

    const { error } =
      await supabase

        .from("veiculos")

        .insert([

          {
            usuario_id: usuario.id,

            marca: marca,

            modelo: modelo,

            ano: ano,

            placa: placa,

            quilometragem: quilometragem
          }

        ]);

    if (error) {

      console.log(error);

      alert("Erro ao cadastrar veículo");

      return;

    }

    alert("Veículo cadastrado!");

    setMarca("");

    setModelo("");

    setAno("");

    setPlaca("");

    setQuilometragem("");

    // RECARREGAR VEÍCULOS
    const { data } =
      await supabase

        .from("veiculos")

        .select("*")

        .eq("usuario_id", usuario.id);

    setVeiculos(data);

  }

  return (

    <section className={styles.container}>

      <h1>
        Meus Veículos
      </h1>

      {/* FORM */}
      <form onSubmit={cadastrarVeiculo}>

        <input

          type="text"

          placeholder="Marca"

          value={marca}

          onChange={(e) =>
            setMarca(e.target.value)
          }

        />

        <input

          type="text"

          placeholder="Modelo"

          value={modelo}

          onChange={(e) =>
            setModelo(e.target.value)
          }

        />

        <input

          type="number"

          placeholder="Ano"

          value={ano}

          onChange={(e) =>
            setAno(e.target.value)
          }

        />

        <input

          type="text"

          placeholder="Placa"

          value={placa}

          onChange={(e) =>
            setPlaca(e.target.value)
          }

        />

        <input

          type="number"

          placeholder="Quilometragem"

          value={quilometragem}

          onChange={(e) =>
            setQuilometragem(e.target.value)
          }

        />

        <button type="submit">
          Cadastrar Veículo
        </button>

      </form>

      {/* LISTA */}
      <div className={styles.lista}>

        <h2>
          Veículos cadastrados
        </h2>

        {
          veiculos.map((v) => (

            <div
              key={v.id}
              className={styles.card}
            >

              <h3>
                {v.marca}
                {" "}
                {v.modelo}
              </h3>

              <p>
                Ano:
                {" "}
                {v.ano}
              </p>

              <p>
                Placa:
                {" "}
                {v.placa}
              </p>

              <p>
                Quilometragem:
                {" "}
                {v.quilometragem} km
              </p>

            </div>

          ))
        }

      </div>

    </section>

  );
}

export default ClienteVeiculo;