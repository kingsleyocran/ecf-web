import { auth } from "../../../../firebaseClient";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  getAdditionalUserInfo,
} from "firebase/auth";

const actionCodeSettings = {
  url: "https://www.climatestorytellers.earth/portal/verify?signup=true",
  // url: "http://localhost:3000/portal/verify?signup=true",
  handleCodeInApp: true,
  // iOS: {
  //   bundleId: "com.example.ios",
  // },
  // android: {
  //   packageName: "com.example.android",
  //   installApp: true,
  //   minimumVersion: "12",
  // },
  // dynamicLinkDomain: "example.page.link",
};

export async function signInWithEmailPasswordless(email: string) {
  console.log("email -> ", email);
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem("emailForSignIn", email);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.error("Error sending email link:", error);
      const errorMessage = error.message;
      // ...
    });
}

export async function completeSignIn() {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please provide your email for confirmation");
    }

    try {
      // The client SDK will parse the code from the link for you.
      const result = await signInWithEmailLink(
        auth,
        email!,
        window.location.href
      );

      // Clear email from storage.
      window.localStorage.removeItem("emailForSignIn");
      const userInfo = getAdditionalUserInfo(result);
      const isNewUser = userInfo?.isNewUser;
      console.log("Successfully signed in: ", result.user);
      console.log("userInfo: ", userInfo);

      // Return user information
      return result.user;
    } catch (error) {
      console.error("Error completing sign-in: ", error);
      throw new Error("Sign-in could not be completed.");
    }
  } else {
    throw new Error("Cannot verify due to an error");
  }
}

export async function signUpWithEmail(email: string, password: string) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function logInWithEmail(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      const user = result.user;

      return user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.error(errorMessage);
    });
}

export async function signOutAuth() {
  await signOut(auth);
}
