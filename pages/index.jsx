import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebaseApp } from "../firebase-config";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { mapUserData } from "../auth/useUser";
import { setUserCookie } from "../auth/userCookie";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const firebaseAuthConfig = ({ signInSuccessUrl }) => ({
  signInFlow: "popup",
  signInOptions: [googleProvider.providerId],
  signInSuccessUrl,
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      const userData = await mapUserData(user);
      setUserCookie(userData);
    },
  },
});

const Home = () => {
  const signInSuccessUrl = "/gastos";
  return (
    <div style={{ marginTop: "20em" }}>
      <StyledFirebaseAuth
        uiConfig={firebaseAuthConfig({ signInSuccessUrl })}
        firebaseAuth={auth}
        signInSuccessUrl={signInSuccessUrl}
      />
    </div>
  );
};

export default Home;
