import styles from "./Header.module.css";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>

      <div className={styles.logo}>

        <img
          src={logo}
         alt="Logo AutoCenter Prime"
        />

      </div>

      <nav className={styles.nav}>

        <a href="#inicio">Início</a>
        <a href="#servicos">Serviços</a>
        <a href="#sobre">Sobre</a>
        <a href="#contato">Contato</a>

      </nav>

      <Link to="/login" className={styles.loginButton}>
        Login
      </Link>

    </header>
  );
}

export default Header;