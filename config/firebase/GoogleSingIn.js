import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";


export const _singInWithGoogle = async () => {
    try{
        GoogleSignin.configure({
            offlineAccess: false,
            webClientId: '45133498609-a3f1854t2enhcgdmf546uut3i4tdcsg1.apps.googleusercontent.com',
            scopes: ['profile','email']
        })
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        const {idToken} = await GoogleSignin.signIn();
        const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
        auth().signInWithCredential(googleCredentials);
        return userInfo;
    }catch(error){
        console.log('=> Google Sing In',error)
        return null
    }
}