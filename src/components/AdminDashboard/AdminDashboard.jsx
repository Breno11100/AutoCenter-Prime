import { useEffect, useState } from "react";

import { supabase } from "../../services/supabase";

import styles from "./AdminDashboard.module.css";

function AdminDashboard() {

  const [clientes, setClientes] =
    useState(0);

  const [veiculos, setVeiculos] =
    useState(0);

  const [agendamentos, setAgendamentos] =
    useState(0);

  const [ordens, setOrdens] =
    useState(0);

  useEffect(() => {

    carregarDados();

  }, []);

  async function carregarDados() {

    // CLIENTES
    const { count: totalClientes } =
      await supabase

        .from("usuarios")

        .select("*", {
          count: "exact",
          head: true
        })

        .eq("tipo", "cliente");

    // VEÍCULOS
    const { count: totalVeiculos } =
      await supabase

        .from("veiculos")

        .select("*", {
          count: "exact",
          head: true
        });

    // AGENDAMENTOS
    const { count: totalAgendamentos } =
      await supabase

        .from("agendamentos")

        .select("*", {
          count: "exact",
          head: true
        });

    // ORDENS
    const { count: totalOrdens } =
      await supabase

        .from("ordens_servico")

        .select("*", {
          count: "exact",
          head: true
        });

    setClientes(totalClientes || 0);

    setVeiculos(totalVeiculos || 0);

    setAgendamentos(
      totalAgendamentos || 0
    );

    setOrdens(totalOrdens || 0);

  }

  return (

    <section className={styles.container}>

      <h1>
        Dashboard Geral
      </h1>

      <div className={styles.cards}>

        <div className={styles.card}>

          <h3>
            Clientes
          </h3>

          <strong>
            {clientes}
          </strong>

        </div>

        <div className={styles.card}>

          <h3>
            Veículos
          </h3>

          <strong>
            {veiculos}
          </strong>

        </div>

        <div className={styles.card}>

          <h3>
            Agendamentos
          </h3>

          <strong>
            {agendamentos}
          </strong>

        </div>

        <div className={styles.card}>

          <h3>
            Ordens de Serviço
          </h3>

          <strong>
            {ordens}
          </strong>

        </div>

      </div>

    </section>

  );
}

export default AdminDashboard;