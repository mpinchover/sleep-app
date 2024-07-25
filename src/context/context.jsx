import React, { useEffect, useState } from "react";
import supabase from "../auth/supabase";
import { Alert } from "react-native";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import {
  displayNameState,
  emailState,
  passwordState,
} from "../recoil/settings";
import randomstring from "randomstring";

export const Authorization = React.createContext();

export const AuthContext = ({ children }) => {
  const [userSession, setUserSession] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userSettings, setUserSettings] = useState();

  const [userEmail, setUserEmail] = useRecoilState(emailState);
  const [userDisplayName, setUserDisplayName] =
    useRecoilState(displayNameState);

  const [userPassword, setUserPassword] = useRecoilState(passwordState);

  checkForUser = async () => {
    const { data, error } = await supabase.auth.getSession();
    setUserSession(data.session);

    if (data.session) {
      console.log("user", data.session.user.user_metadata);
      setUserEmail(data.session.user.user_metadata.email);
      setUserDisplayName(data.session.user.user_metadata.display_name);

      const randomPassword = randomstring.generate({
        length: data.session.user.user_metadata.password_length,
        charset: "alphanumeric",
      });
      setUserPassword(randomPassword);
    }
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log(event, session);
      checkForUser();
      // console.log(event, session);

      if (event === "INITIAL_SESSION") {
        // setUserSession(session);
        // handle initial session
      } else if (event === "SIGNED_IN") {
        // console.log("SIGNED IN");
        // setUserSession(session);
        // handle sign in event
      } else if (event === "SIGNED_OUT") {
        // setUserSession(session);
        // handle sign out event
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  updateSettings = async () => {
    try {
      setIsLoading(true);
      await sleep(2000);
      const { data, error } = await supabase.auth.updateUser({
        email: userEmail,
        data: {
          display_name: userDisplayName,
        },
      });
      if (error) {
        Alert.alert("Update settings failed", "", [
          {
            text: "Okay",
          },
        ]);
        throw e;
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

  return (
    <Authorization.Provider
      value={{
        userSession,
        updateSettings,
        isLoading,
        setUserSettings,
      }}
    >
      {children}
    </Authorization.Provider>
  );
};
