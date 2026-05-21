import { useState } from "react";

import styles from "./DashboardAdmin.module.css";

import AdminDashboard
from "../../components/AdminDashboard/AdminDashboard";

import AdminAgendamentos
from "../../components/AdminAgendamentos/AdminAgendamentos";

import AdminOrdens
from "../../components/AdminOrdens/AdminOrdens";

import AdminClientes
from "../../components/AdminClientes/AdminClientes";

import AdminVeiculos
from "../../components/AdminVeiculos/AdminVeiculos";

import AdminFinanceiro
from "../../components/AdminFinanceiro/AdminFinanceiro";

import AdminEstoque
from "../../components/AdminEstoque/AdminEstoque";

import AdminConfiguracoes
from "../../components/AdminConfiguracoes/AdminConfiguracoes";

function DashboardAdmin() {

  const [secao, setSecao] =
    useState("dashboard");

  return (

    <section className={styles.dashboard}>

      {/* SIDEBAR */}
      <aside className={styles.sidebar}>

        <h2>
          AutoCenter <span>Prime</span>
        </h2>

        <button
          onClick={() =>
            setSecao("dashboard")
          }
        >
          Dashboard
        </button>

        <button
          onClick={() =>
            setSecao("agendamentos")
          }
        >
          Agendamentos
        </button>

        <button
          onClick={() =>
            setSecao("ordens")
          }
        >
          Ordens de Serviço
        </button>

        <button
          onClick={() =>
            setSecao("clientes")
          }
        >
          Clientes
        </button>

        <button
          onClick={() =>
            setSecao("veiculos")
          }
        >
          Veículos
        </button>

        <button
          onClick={() =>
            setSecao("financeiro")
          }
        >
          Financeiro
        </button>

        <button
          onClick={() =>
            setSecao("estoque")
          }
        >
          Estoque
        </button>

        <button
          onClick={() =>
            setSecao("configuracoes")
          }
        >
          Configurações
        </button>

      </aside>

      {/* CONTEÚDO */}
      <main className={styles.content}>

        {
          secao === "dashboard" && (
            <AdminDashboard />
          )
        }

        {
          secao === "agendamentos" && (
            <AdminAgendamentos />
          )
        }

        {
          secao === "ordens" && (
            <AdminOrdens />
          )
        }

        {
          secao === "clientes" && (
            <AdminClientes />
          )
        }

        {
          secao === "veiculos" && (
            <AdminVeiculos />
          )
        }

        {
          secao === "financeiro" && (
            <AdminFinanceiro />
          )
        }

        {
          secao === "estoque" && (
            <AdminEstoque />
          )
        }

        {
          secao === "configuracoes" && (
            <AdminConfiguracoes />
          )
        }

      </main>

    </section>

  );
}

export default DashboardAdmin;