import styles from "./Services.module.css";

function Services() {
  return (
    <section
      id="servicos"
      className={styles.services}
    >

      <div className={styles.titleArea}>

        <span>NOSSOS SERVIÇOS</span>

        <h2>
          Soluções completas para seu veículo
        </h2>

        <p>
          Tecnologia, precisão e profissionais especializados
          para cuidar do seu carro com excelência.
        </p>

      </div>

      <div className={styles.cards}>

        <div className={styles.card}>

          <div className={styles.icon}>
            🔧
          </div>

          <h3>Revisão Completa</h3>

          <p>
            Revisões preventivas e corretivas
            para garantir desempenho e segurança.
          </p>

        </div>

        <div className={styles.card}>

          <div className={styles.icon}>
            🛢️
          </div>

          <h3>Troca de Óleo</h3>

          <p>
            Lubrificação profissional utilizando
            produtos de alta qualidade.
          </p>

        </div>

        <div className={styles.card}>

          <div className={styles.icon}>
            ⚡
          </div>

          <h3>Diagnóstico Eletrônico</h3>

          <p>
            Equipamentos modernos para identificar
            falhas rapidamente.
          </p>

        </div>

        <div className={styles.card}>

          <div className={styles.icon}>
            🚗
          </div>

          <h3>Suspensão e Freios</h3>

          <p>
            Manutenção completa para garantir
            estabilidade e segurança.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Services;