import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DashboardCliente.module.css";

import ClienteAgendamentos from "../../components/ClienteAgendamentos/ClienteAgendamentos";
import ClienteVeiculo from "../../components/ClienteVeiculo/ClienteVeiculo";
import ClienteOrcamentos from "../../components/ClienteOrcamentos/ClienteOrcamentos";
import ClientePerfil from "../../components/ClientePerfil/ClientePerfil";

function DashboardCliente() {

  const [secao, setSecao] = useState("agendamentos");
  const navigate = useNavigate();

  function sair() {
    // aqui você pode depois limpar token/sessão
    navigate("/");
  }

  return (
    <section className={styles.dashboard}>

      <aside className={styles.sidebar}>

        <h2>
          AutoCenter <span>Prime</span>
        </h2>

        <button onClick={() => setSecao("perfil")}>
          Perfil
        </button>

        <button onClick={() => setSecao("veiculo")}>
          Meu Veículo
        </button>

        <button onClick={() => setSecao("agendamentos")}>
          Agendamentos
        </button>

        <button onClick={() => setSecao("orcamentos")}>
          Orçamentos
        </button>

        {/* BOTÃO SAIR */}
        <button
          onClick={sair}
          className={styles.sair}
        >
          Sair
        </button>

      </aside>

      <main className={styles.content}>

        {secao === "agendamentos" && <ClienteAgendamentos />}
        {secao === "veiculo" && <ClienteVeiculo />}
        {secao === "orcamentos" && <ClienteOrcamentos />}
        {secao === "perfil" && <ClientePerfil />}

      </main>

    </section>
  );
}

export default DashboardCliente;