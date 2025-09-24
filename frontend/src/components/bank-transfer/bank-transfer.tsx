import React from 'react'
import s from "./bank-transfer.module.scss"

const BankTransfer = () => {
  return (
    <div className={s["main-container"]}>
      <div className={s["form-container"]}>
        <div>Invia bonifico</div>
        <form className={s["form"]}>
          <input type="number" name="Import" placeholder='Importo' min={0} />
          <input type="text" name="Cause" placeholder='Causale' />
          <input type="text" name="IBAN" placeholder='IBAN' />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default BankTransfer
