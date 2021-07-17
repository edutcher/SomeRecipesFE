import { createContext, useState, useEffect } from "react";
import UserPool from "../utils/UserPool";

const INITIAL_USER_STATE = {
  username: null,
  userId: null,
  isLoggedIn: false,
  notifications: null,
  favorites: null,
  avatar: null,
};

export const UserContext = createContext();

export function UserProvider(props) {
  const [currentUser, setCurrentUser] = useState(INITIAL_USER_STATE);
  const changeUser = (user) => setCurrentUser(user);

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const sess = await getSession();

      console.log(sess);
      const { sub, username } = sess.accessToken.payload;
      changeUser({
        userId: sub,
        username,
      });
    };
    checkLoggedIn();
  }, []);

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, changeUser, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}
