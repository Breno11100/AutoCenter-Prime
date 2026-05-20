import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="inicio"
      className={styles.hero}
    >

      <div className={styles.overlay}></div>

      <div className={styles.content}>

        <span className={styles.subtitle}>
          EXCELÊNCIA AUTOMOTIVA
        </span>

        <h1>
          Seu carro merece performance e confiança
        </h1>

        <p>
          Revisões completas, diagnósticos avançados
          e manutenção especializada para garantir
          segurança, potência e tranquilidade.
        </p>

        <div className={styles.buttons}>

          <Link to="/login" className={styles.primaryButton}>
            Fazer Revisão
          </Link>

          <a
            href="#servicos"
            className={styles.secondaryButton}
          >
            Conhecer Serviços
          </a>


        </div>

      </div>

    </section>
  );
}

export default Hero;