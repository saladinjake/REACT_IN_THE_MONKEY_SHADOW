import { Loader } from "components/pages";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Persist the user on fresh signin

const AuthCheckPage = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      auth.persistUserToClient();
    }, 3000);
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      console.log(auth.isAuthenticated);
      router.replace("/");
    }
  }, [auth.isAuthenticated]);

  return <Loader h="100vh" />;
};

export default AuthCheckPage;
