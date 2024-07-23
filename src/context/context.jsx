import React, { useEffect, useState } from "react";
import supabase from "../auth/supabase";
import { Alert } from "react-native";
export const Authorization = React.createContext();

export const AuthContext = ({ children }) => {
  const [userSession, setUserSession] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userSettings, setUserSettings] = useState();
  checkForUser = async () => {
    const { data, error } = await supabase.auth.getSession();
    // console.log("DATA IS ", data.session);
    setUserSession(data.session);
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
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

  updateSettings = async (newSettingsValue) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.updateUser(newSettingsValue);
      if (error) {
        Alert.alert("Update settings failed", "", [
          {
            text: "Okay",
          },
        ]);
        throw e;
      }
      console.log("Data is ", data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Authorization.Provider
      value={{
        userSession,
        updateSettings,
        isLoading,
      }}
    >
      {children}
    </Authorization.Provider>
  );
};
