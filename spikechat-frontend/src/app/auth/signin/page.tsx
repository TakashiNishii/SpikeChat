import { Metadata } from "next";
import { SignInPage } from "../../../components/Pages/SignIn";

export const metadata: Metadata = {
  title: "Login"
}

const SignIn = () => <SignInPage />

export default SignIn;