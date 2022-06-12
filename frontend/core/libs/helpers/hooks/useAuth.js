import { useRouter } from "next/router";
import { currentUser, logOut } from "utils/http";
import { del, get, set } from "utils/localStorageAPI";
import useToast from "./useToast";

const useAuth = () => {
  const toast = useToast();
  const router = useRouter();
  let me = get("userCredentials");
  if (me) {
    const firstName = me.name.split(" ")[0];
    me.firstName = firstName;
  }
  const handleFetchCurrentUser = async () => {
    try {
      const data = await currentUser();
      set("userCredentials", data);
    } catch (error) {
      toast.display({ description: error.message });
    }
  };
  const handleLogout = async (reload = true) => {
    try {
      await logOut();
      del("userCredentials");
      if (reload) router.reload();
    } catch (error) {
      toast.display({ description: error.message });
    }
  };
  return { handleFetchCurrentUser, handleLogout, me };
};

export default useAuth;
