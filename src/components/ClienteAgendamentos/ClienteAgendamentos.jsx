import { useEffect, useState } from "react";

import { supabase } from "../../services/supabase";

import styles from "./ClienteAgendamentos.module.css";

function ClienteAgendamentos() {

  const [usuario, setUsuario] = useState(null);

  const [veiculos, setVeiculos] = useState([]);

  const [agendamentos, setAgendamentos] =
    useState([]);

  const [veiculoSelecionado, setVeiculoSelecionado] =
    useState("");

  const [descricao, setDescricao] =
    useState("");

  const [data, setData] =
    useState("");

  // PEGAR USUÁRIO LOGADO
  useEffect(() => {

    async function carregarUsuario() {

      const {
        data: { user }
      } = await supabase.auth.getUser();

      setUsuario(user);

    }

    carregarUsuario();

  }, []);

  // BUSCAR VEÍCULOS + AGENDAMENTOS
  useEffect(() => {

    if (!usuario) return;

    carregarVeiculos();

    carregarAgendamentos();

  }, [usuario]);

  // CARREGAR VEÍCULOS
  async function carregarVeiculos() {

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

  // CARREGAR AGENDAMENTOS
  async function carregarAgendamentos() {

    const { data, error } =
      await supabase

        .from("agendamentos")

        .select(`
          *,
          veiculos (
            marca,
            modelo,
            placa
          )
        `)

        .eq("usuario_id", usuario.id)

        .order("data_agendada", {
          ascending: false
        });

    if (error) {

      console.log(error);

      return;

    }

    setAgendamentos(data);

  }

  // CRIAR AGENDAMENTO
  async function criarAgendamento(e) {

    e.preventDefault();

    const { error } =
      await supabase

        .from("agendamentos")

        .insert([

          {
            usuario_id: usuario.id,

            veiculo_id: veiculoSelecionado,

            descricao: descricao,

            data_agendada: data,

            status: "Pendente"
          }

        ]);

    if (error) {

      console.log(error);

      alert("Erro ao criar agendamento");

      return;

    }

    setVeiculoSelecionado("");

    setDescricao("");

    setData("");

    carregarAgendamentos();

  }

  return (

    <section className={styles.container}>

      <h1>
        Agendamentos
      </h1>

      <form onSubmit={criarAgendamento}>

        {/* SELECT VEÍCULOS */}
        <select

          value={veiculoSelecionado}

          onChange={(e) =>
            setVeiculoSelecionado(
              e.target.value
            )
          }

        >

          <option value="">
            Selecione um veículo
          </option>

          {
            veiculos.map((v) => (

              <option
                key={v.id}
                value={v.id}
              >

                {v.marca}
                {" "}
                {v.modelo}
                {" - "}
                {v.placa}

              </option>

            ))
          }

        </select>

        {/* DESCRIÇÃO */}
        <textarea

          placeholder="Descrição do serviço"

          value={descricao}

          onChange={(e) =>
            setDescricao(
              e.target.value
            )
          }

        />

        {/* DATA */}
        <input

          type="date"

          value={data}

          onChange={(e) =>
            setData(
              e.target.value
            )
          }

        />

        <button type="submit">
          Criar agendamento
        </button>

      </form>

      {/* LISTA */}
      <div className={styles.lista}>

        <h2>
          Meus Agendamentos
        </h2>

        {
          agendamentos.map((item) => (

            <div
              key={item.id}
              className={styles.card}
            >

              <h3>

                {item.veiculos?.marca}
                {" "}
                {item.veiculos?.modelo}

              </h3>

              <p>

                Placa:
                {" "}
                {item.veiculos?.placa}

              </p>

              <p>

                Data:
                {" "}
                {item.data_agendada}

              </p>

              <p>
                {item.descricao}
              </p>

              <span>
                {item.status}
              </span>

            </div>

          ))
        }

      </div>

    </section>

  );
}

export default ClienteAgendamentos;