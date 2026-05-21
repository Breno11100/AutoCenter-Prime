import { useState } from "react";
import styles from "./DashboardCliente.module.css";
import ClienteAgendamentos from "../../components/ClienteAgendamentos/ClienteAgendamentos";
import ClienteVeiculo from "../../components/ClienteVeiculo/ClienteVeiculo";
import ClienteOrcamentos from "../../components/ClienteOrcamentos/ClienteOrcamentos";
import ClientePerfil from "../../components/ClientePerfil/ClientePerfil";

function DashboardCliente() {

  const [secao, setSecao] =
    useState("agendamentos");

  return (

    <section className={styles.dashboard}>

      <aside className={styles.sidebar}>

        <h2>
          AutoCenter <span>Prime</span>
        </h2>

        <button
          onClick={() =>
            setSecao("agendamentos")
          }
        >
          Agendamentos
        </button>

        <button
          onClick={() =>
            setSecao("veiculo")
          }
        >
          Meu Veículo
        </button>

        <button
          onClick={() =>
            setSecao("orcamentos")
          }
        >
          Orçamentos
        </button>

        <button
          onClick={() =>
            setSecao("perfil")
          }
        >
          Perfil
        </button>

      </aside>

      <main className={styles.content}>

        {
          secao === "agendamentos" && (
            <ClienteAgendamentos />
          )
        }

        {
          secao === "veiculo" && (
            <ClienteVeiculo />
          )
        }

        {
          secao === "orcamentos" && (
            <ClienteOrcamentos />
          )
        }

        {
          secao === "perfil" && (
            <ClientePerfil />
          )
        }

      </main>

    </section>

  );
}

export default DashboardCliente;