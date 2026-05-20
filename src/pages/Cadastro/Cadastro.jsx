import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cadastro.module.css";
import { cadastrarUsuario } from "../../services/auth";
import { Link } from "react-router-dom";
import logo from "../../assets/LoginBack.png";

function Cadastro() {

  const navigate = useNavigate();

  const [nome, setNome] = useState("");

  const [email, setEmail] = useState("");

  const [telefone, setTelefone] = useState("");

  const [senha, setSenha] = useState("");

  async function fazerCadastro(e) {

    e.preventDefault();

    const resultado =
      await cadastrarUsuario(

        nome,
        email,
        senha,
        telefone

      );

    if (resultado.error) {

      alert(resultado.error.message);

console.log(resultado.error);

      return;
    }

    alert("Cadastro realizado com sucesso!");

    navigate("/login");

  }

  return (

    <section className={styles.login}>

      <Link
        to="/"
        className={styles.logoBack}
      >
        <img src={logo} alt="Logo AutoCenter Prime" />
      </Link>

      <div className={styles.container}>

        <div className={styles.left}>

          <h1>
            AutoCenter <span>Prime</span>
          </h1>

          <p>
            Crie sua conta e acompanhe
            ordens de serviço, veículos
            e atendimentos em tempo real.
          </p>

        </div>

        <div className={styles.right}>

          <form
            className={styles.form}
            onSubmit={fazerCadastro}
          >

            <h2>Criar Conta</h2>

            <input
              type="text"
              placeholder="Digite seu nome"

              value={nome}

              onChange={(e) =>
                setNome(e.target.value)
              }
            />

            <input
              type="email"
              placeholder="Digite seu email"

              value={email}

              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Digite seu telefone"

              value={telefone}

              onChange={(e) =>
                setTelefone(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Digite sua senha"

              value={senha}

              onChange={(e) =>
                setSenha(e.target.value)
              }
            />

            <button type="submit">
              Criar Conta
            </button>

            <Link
            to="/login"
            className={styles.loginLink}>
              Já possui conta?
            </Link>

          </form>

        </div>

      </div>

    </section>

  );
}

export default Cadastro;