import styles from "./WhatsAppButton.module.css";
import whatsappIcon from "../../assets/WhatsApp_icon.png";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5581991228713?text=Olá,%20gostaria%20de%20agendar%20uma%20revisão."
      target="_blank"
      rel="noreferrer"
      className={styles.button}
    >
      <img src={whatsappIcon} alt="WhatsApp" />
    </a>
  );
}

export default WhatsAppButton;