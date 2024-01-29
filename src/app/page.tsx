"use client";

import { Button } from "@/components/ui/button";
import {
  AuthContext,
  AuthedStorageKey,
  UserIdStorageKey,
} from "@/contexts/authContext";
import { axiosClient } from "@/lib/useAxios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const { isAuth, userId, setIsAuth, setUserId } = useContext(AuthContext);

  const handleOnClick = () => {
    if (isAuth) {
      setIsAuth(false);
      setUserId("");
      localStorage.removeItem(AuthedStorageKey);
      localStorage.removeItem(UserIdStorageKey);
    } else {
      router.push("/login");
    }
  };

  const addWebAuthn = async () => {
    const { data: options } = await axiosClient.post(
      "/auth/webauth-registration-options",
      { email: userData.email }
    );

    options.authenticatorSelection.residentKey = "required";
    options.authenticatorSelection.requireResidentKey = true;
    options.extensions = {
      credProps: true,
    };

    let authRes;
    try {
      authRes = await startRegistration(options);
    } catch (error) {
      return toast("Adding authentication aborted", { duration: 5000 });
    }

    const verificationParamas = {
      data: {
        ...authRes,
      },
      user: {
        email: userData.email,
      },
    };

    const { data: verificationData } = await axiosClient.post(
      "/auth/webauth-registration-verification",
      verificationParamas
    );

    if (verificationData.ok) {
      toast("You can now login using the registered method!", {
        duration: 5000,
      });
    } else {
      toast(verificationData.message, { duration: 5000 });
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      if (userId && isAuth) {
        const { data } = await axiosClient.get(`/user/${userId}`);

        setUserData({
          name: data.user.name,
          email: data.user.email,
        });
      }
    };

    getUserData();
  }, [isAuth, userId]);

  return (
    <div className="min-h-screen flex bg-slate-50 items-start justify-center p-7">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col text-center gap-2">
          <h1>
            Welcome to the Auth-app{isAuth && userData && `, ${userData.name}`}
          </h1>
          {!isAuth && <h2>You are currently logged out</h2>}
        </div>
        {isAuth && (
          <Button
            type="button"
            className="self-center max-w-60 min-w-60"
            onClick={addWebAuthn}
          >
            Add Authenticator / Passkey
          </Button>
        )}
        <Button
          className="self-center max-w-60 min-w-60"
          type="button"
          onClick={handleOnClick}
        >
          {isAuth ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
}
