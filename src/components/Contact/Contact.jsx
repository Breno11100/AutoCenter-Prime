import { useRef } from "react";
import emailjs from "@emailjs/browser";

import styles from "./Contact.module.css";

function Contact() {

  const form = useRef();

  const enviarEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
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
    <section
      id="contato"
      className={styles.contact}
    >

      <div className={styles.top}>

        <span>FALE CONOSCO</span>

        <h2>
          Estamos prontos para cuidar do seu veículo
        </h2>

        <p>
          Entre em contato para tirar dúvidas,
          solicitar orçamento ou agendar serviços.
        </p>

      </div>

      <div className={styles.container}>

        <div className={styles.infoArea}>

          <a href="tel:+5581991228713" className={styles.infoCard}>
            <h3>📞 Telefone</h3>
            <p>(81) 99122-8713</p>
          </a>

          <a href="mailto:autocenterprime@gmail.com" className={styles.infoCard}>
            <h3>📧 E-mail</h3>
            <p>autocenterprime@gmail.com</p>
          </a>

          <div className={styles.infoCard}>

            <h3>📍 Localização</h3>

            <p>Recife - Pernambuco</p>

          </div>

        </div>

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