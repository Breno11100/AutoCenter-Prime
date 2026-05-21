import { useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

function Contact() {
  const form = useRef();

  const enviarEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "AutoCenter-Prime",
        "template_v8xow7e",
        form.current,
        "tg1pFGZ1AFxL-8Qah"
      )
      .then(() => {
        alert("Mensagem enviada com sucesso!");
      })
      .catch(() => {
        alert("Erro ao enviar mensagem.");
      });
  };

  return (
    <section id="contato" className={styles.contact}>

      <div className={styles.top}>
        <span>FALE CONOSCO</span>
        <h2>Estamos prontos para cuidar do seu veículo</h2>
        <p>
          Entre em contato para tirar dúvidas,
          solicitar orçamento ou agendar serviços.
        </p>
      </div>

      <div className={styles.container}>

        {/* LADO ESQUERDO */}
        <div className={styles.leftSide}>

          {/* MAPA */}
          <div className={styles.map}>
            <iframe
              title="Localização AutoCenter Prime"
              src="https://www.google.com/maps/d/u/1/embed?mid=15rdrZruFCbYce6ZHzUvH0iC8rhYzU1M&ehbc=2E312F&noprof=1"
              allowFullScreen=""
              loading="lazy"
            />
          </div>

          {/* TELEFONE */}
          <a
            href="tel:+5581991228713"
            className={styles.phoneCard}
          >
            <h3>📞 Telefone</h3>
            <p>(81) 99122-8713</p>
          </a>

        </div>

        {/* FORMULÁRIO */}
                <form
          ref={form}
          onSubmit={enviarEmail}
          className={styles.form}
        >

          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            required
          />

          <textarea
            name="message"
            placeholder="Digite sua mensagem"
            required
          ></textarea>

          <button type="submit">
            Enviar Mensagem
          </button>

        </form>

      </div>
    </section>
  );
}

export default Contact;