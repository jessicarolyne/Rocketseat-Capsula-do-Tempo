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
import { SplashScreen } from 'expo-router'

export default function Layout() {
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
    
    <ImageBackground source={bgblur} className="relative flex-1 bg-gray-900 px-8 py-10" imageStyle={{position: 'absolute', left: '-100%'}}>
      <StyleStripes className="absolute left-2"/>
        </ImageBackground>
  )
}