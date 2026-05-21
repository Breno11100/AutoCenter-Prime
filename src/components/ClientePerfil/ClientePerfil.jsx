import { useEffect, useState } from "react";

import { supabase } from "../../services/supabase";

import styles from "./ClientePerfil.module.css";

function ClientePerfil() {

  const [usuario, setUsuario] =
    useState(null);

  const [nome, setNome] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [telefone, setTelefone] =
    useState("");

  // CARREGAR PERFIL
  useEffect(() => {

    async function carregarPerfil() {

      // PEGAR USUÁRIO LOGADO
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) return;

      setUsuario(user);

      // BUSCAR PERFIL
      const { data, error } =
        await supabase

          .from("usuarios")

          .select("*")

          .eq("id", user.id)

          .single();

      if (error) {
        console.log(error);
        return;
      }

      setNome(data.nome || "");

      setEmail(data.email || "");

      setTelefone(data.telefone || "");

    }

    carregarPerfil();

  }, []);

  // SALVAR ALTERAÇÕES
  async function atualizarPerfil(e) {

    e.preventDefault();

    const { error } =
      await supabase

        .from("usuarios")

        .update({

          nome: nome,

          telefone: telefone

        })

        .eq("id", usuario.id);

    if (error) {

      console.log(error);

      alert("Erro ao atualizar perfil");

      return;

    }

    alert("Perfil atualizado!");

  }

  return (

    <section className={styles.container}>

      <h1>
        Meu Perfil
      </h1>

      <form onSubmit={atualizarPerfil}>

        {/* NOME */}
        <input

          type="text"

          placeholder="Nome"

          value={nome}

          onChange={(e) =>
            setNome(e.target.value)
          }

        />

        {/* EMAIL */}
        <input

          type="email"

          value={email}

          disabled

        />

        {/* TELEFONE */}
        <input

          type="text"

          placeholder="Telefone"

          value={telefone}

          onChange={(e) =>
            setTelefone(e.target.value)
          }

        />

        <button type="submit">
          Salvar alterações
        </button>

      </form>

    </section>

  );
}

export default ClientePerfil;