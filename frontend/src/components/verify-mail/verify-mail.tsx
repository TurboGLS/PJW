import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { verifyEmail } from "../../services/verify-mail.service";

function VerifyEmail({ staticMode = false }) {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (staticMode) {
      setMessage(
        "Registrazione completata! Controlla la tua email per verificare l'account"
      );
      return;
    }

    const token = searchParams.get("token");
    if (token) {
      setMessage("Verifica in corso...");
      verifyEmail(token)
        .then(() => {
          setMessage("Email verificata con successo!");
        })
        .catch(() => {
          setMessage("Errore nella verifica della email.");
        });
    } else {
      setMessage(
        "Verifica email in attesa. Controlla la tua casella per il link di conferma."
      );
    }
  }, [searchParams, staticMode]);

  return (
    <div className="verify-email">
      <p>{message}</p>
    </div>
  );
}

export default VerifyEmail;
