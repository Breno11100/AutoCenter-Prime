import { useEffect, useState } from "react";

import { supabase } from "../../services/supabase";

import styles from "./AdminConfiguracoes.module.css";

function AdminConfiguracoes() {

  const [config, setConfig] =
    useState({
      nome_empresa: "",
      telefone: "",
      email: "",
      endereco: ""
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    carregarConfig();

  }, []);

  async function carregarConfig() {

    const { data, error } =
      await supabase
        .from("configuracoes")
        .select("*")
        .limit(1)
        .single();

    if (error && error.code !== "PGRST116") {
      console.log(error);
      return;
    }

    if (data) {
      setConfig(data);
    }

    setLoading(false);
  }

  async function salvarConfig() {

    const { error } =
      await supabase
        .from("configuracoes")
        .upsert(config);

    if (error) {
      console.log(error);
      alert("Erro ao salvar");
      return;
    }

    alert("Configurações salvas!");
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (

    <section className={styles.container}>

      <h1>Configurações</h1>

      <div className={styles.form}>

        <label>Nome da empresa</label>
        <input
          type="text"
          value={config.nome_empresa}
          onChange={(e) =>
            setConfig({
              ...config,
              nome_empresa: e.target.value
            })
          }
        />

        <label>Telefone</label>
        <input
          type="text"
          value={config.telefone}
          onChange={(e) =>
            setConfig({
              ...config,
              telefone: e.target.value
            })
          }
        />

        <label>Email</label>
        <input
          type="email"
          value={config.email}
          onChange={(e) =>
            setConfig({
              ...config,
              email: e.target.value
            })
          }
        />

        <label>Endereço</label>
        <input
          type="text"
          value={config.endereco}
          onChange={(e) =>
            setConfig({
              ...config,
              endereco: e.target.value
            })
          }
        />

        <button
          onClick={salvarConfig}
          className={styles.salvar}
        >
          Salvar
        </button>

      </div>

    </section>

  );
}

export default AdminConfiguracoes;