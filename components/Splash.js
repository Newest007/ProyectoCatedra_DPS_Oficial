import { View, Text, ImageBackground } from 'react-native'
import {useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import Login from './login';

/*
export default function Splash({children}) {

  //const navigation = useNavigation();

  setTimeout(()=>{
    <Login/>
    //navigation.navigate('Login')
  },5000)  
    
  return ( <>
    <ImageBackground source={require('../src/img/splash.png')}
    resizeMode='contain'
    style={{flex: 1}}/>
    {children}
    </>
  )
}*/

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <>
    <ImageBackground source={require('../src/img/splash.png')}
    resizeMode='contain'
    style={{flex: 1}}/>
    </>
  );
};

export default Splash;
