import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import {
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree'

import { ImageBackground } from 'react-native'
import bgblur from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import { styled } from 'nativewind'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(
    null,
  )

  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
      setIsUserAuthenticated(!!token)
    })
  }, [])

  const StyleStripes = styled(Stripes)
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })
  if(!hasLoadedFonts) {
    return <SplashScreen/>
  }
  return(
    <ImageBackground source={bgblur} className="relative flex-1 bg-gray-900" imageStyle={{position: 'absolute', left: '-100%'}}>
      <StyleStripes className="absolute left-2"/>
      <Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: 'transparent'}, }}>
        <Stack.Screen name="index" redirect={isUserAuthenticated}/>
        <Stack.Screen name="new"/>
        <Stack.Screen name="memories"/>
      </Stack>
      <StatusBar style="light" />
    </ImageBackground>
  )
}