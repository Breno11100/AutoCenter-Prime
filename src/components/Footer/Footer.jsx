import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.logo}>
        AutoCenter Prime
      </div>

      <p>
        Tecnologia, confiança e excelência automotiva.
      </p>

      <div className={styles.links}>

        <a href="#inicio">Início</a>
        <a href="#servicos">Serviços</a>
        <a href="#sobre">Sobre</a>
        <a href="#contato">Contato</a>

      </div>

      <span>
        © 2026 AutoCenter Prime. Todos os direitos reservados.
      </span>

    </footer>
  );
}

export default Footer;