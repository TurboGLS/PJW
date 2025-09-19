import type { BankAccount } from "../../entities/bank-account";

interface BankAccountInfosProps {
  bankaccountInfos: BankAccount;
}

const BankAccountInfos = ({ bankaccountInfos }: BankAccountInfosProps) => {
  return (
    <div>
      <div>{bankaccountInfos.nomeTitolare}</div>
      <div>{bankaccountInfos.cognomeTitolare}</div>
      <div>{bankaccountInfos.email}</div>
      <div>{bankaccountInfos.iban}</div>
      <div>{bankaccountInfos.dataApertura.toString()}</div>
    </div>
  );
};

export default BankAccountInfos;
