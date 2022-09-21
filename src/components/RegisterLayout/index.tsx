import Head from "next/head";
import MenuHeader from "../MenuHeader";
import RegisterForm from "../RegisterForm";

const RegisterLayout = () => {
  return (
    <>
      <Head>
        <title>Register your wallet First</title>
      </Head>

      <MenuHeader title="Register your wallet" />
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterLayout;
