import React from 'react'
import s from "./bank-transfer.module.scss"

const BankTransfer = () => {
  return (
    <div className={s["main-container"]}>
      <div className={s["title"]}>Invia bonifico</div>
      <div className={s["form-container"]}>
        <form className={s["form"]}>
          <label>Importo</label>
          <input type="number" name="Import" placeholder='Importo' min={0} />
          <label>Causale</label>
          <input type="text" name="Cause" placeholder='Causale' />
          <label>IBAN Destinatario</label>
          <input type="text" name="IBAN" placeholder='IBAN' />
          <input type="submit" value="Submit" className={s["submit-button"]} />
        </form>
      </div>
    </div>
  )
}

export default BankTransfer
