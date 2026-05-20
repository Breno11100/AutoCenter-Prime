import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { login } from "../../services/auth";
import { Link } from "react-router-dom";
import logo from "../../assets/LoginBack.png";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");

  async function fazerLogin(e) {

    e.preventDefault();

    const resultado =
      await login(email, senha);

    if (resultado.error) {

      alert("Erro ao fazer login");

      return;
    }

    // VERIFICA TIPO DE USUÁRIO
    if (resultado.perfil.tipo === "admin") {

      navigate("/admin");

    } else {

      navigate("/cliente");

    }

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
            Gerencie ordens de serviço,
            clientes e veículos
            em um sistema moderno
            e profissional.
          </p>

        </div>

        <div className={styles.right}>

          <form
            className={styles.form}
            onSubmit={fazerLogin}
          >

            <h2>Entrar</h2>

            <input
              type="email"
              placeholder="Digite seu email"

              value={email}

              onChange={(e) =>
                setEmail(e.target.value)
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
              Entrar
            </button>

            <Link
            to="/cadastro"
            className={styles.cadastroLink}>
              Ainda não possui conta?
            </Link>

          </form>

        </div>

      </div>

    </section>

  );
}

export default Login;