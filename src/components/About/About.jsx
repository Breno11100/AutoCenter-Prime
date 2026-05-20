import styles from "./About.module.css";

function About() {
  return (
    <section
      id="sobre"
      className={styles.about}
    >

      <div className={styles.imageArea}>

        <img
          src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=1400&auto=format&fit=crop"
          alt="Oficina automotiva"
        />

      </div>

      <div className={styles.content}>

        <span>QUEM SOMOS</span>

        <h2>
          Especialistas em performance automotiva
        </h2>

        <p>
          A AutoCenter Prime oferece serviços automotivos
          de alta qualidade, unindo tecnologia, precisão
          e profissionais especializados para entregar
          segurança e confiança em cada atendimento.
        </p>

        <p>
          Trabalhamos com diagnósticos avançados,
          revisões completas e manutenção especializada
          para garantir o máximo desempenho do seu veículo.
        </p>

        <div className={styles.stats}>

          <div className={styles.statBox}>
            <h3>+10</h3>
            <span>Anos de experiência</span>
          </div>

          <div className={styles.statBox}>
            <h3>+5mil</h3>
            <span>Clientes atendidos</span>
          </div>

          <div className={styles.statBox}>
            <h3>100%</h3>
            <span>Compromisso e qualidade</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;