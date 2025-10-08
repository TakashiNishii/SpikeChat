import { Metadata } from "next";
import { AccountPage } from "../../components/Pages/Account";

export const metadata: Metadata = {
  title: "Minha Conta"
}

const Account = () => <AccountPage />

export default Account;