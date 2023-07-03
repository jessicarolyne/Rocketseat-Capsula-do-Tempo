import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { Button, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import * as secureStore from 'expo-secure-store'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import {
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree'
import bgblur from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import SvgLogo from '../src/assets/nlw-spacetime-logo.svg'
import { styled } from 'nativewind'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import React, { useEffect } from 'react'
import { api } from '../src/lib/api'


const StyleStripes = styled(Stripes)
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/c9d90b78b37444e80874',
};
export default function App() {
  const router = useRouter()
  const [request, response, SignInWithGithub] = useAuthRequest(
    {
      clientId: 'c9d90b78b37444e80874',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime'
      }),
    },
    discovery
  );
async function handleGithubOauthCode(code: string) {
  const response = await api.post('/register', {
    code,
  })
  const { token } = response.data  
  await secureStore.setItemAsync('token', token)
  router.push('/memories')  
}
   useEffect(() => {
   /* console.log(
      makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    )*/
    if (response?.type === 'success') {
      const { code } = response.params;
      handleGithubOauthCode(code)
    }
  }, [response]);
  
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })
  if(!hasLoadedFonts) {
    return null
  }
  return (
    <ImageBackground source={bgblur} className="relative flex-1 bg-gray-900 px-8 py-10" imageStyle={{position: 'absolute', left: '-100%'}}>
      <StyleStripes className="absolute left-2"/>
        
      <View className="flex-1 items-center justify-center gap-6">
        <SvgLogo/>
        <View className='space-y-2'>
          <Text className='text-center font-title text-2xl leading-tight text-gray-50'>Sua cápsula do tempo</Text>
          <Text className='text-center font-body text-base leading-relaxed text-gray-100'>Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!</Text>
        </View>
        <TouchableOpacity onPress={()  => SignInWithGithub()} activeOpacity={0.7} className='rounded-full bg-green-500 px-5 py-3'>
          <Text className="font-alt text-sm uppercase text-black">Cadastrar lembrança</Text>
        </TouchableOpacity>
      </View>
      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>Feito com 💜 no NLW da Rocketseat</Text>
      <StatusBar style="light" />
    </ImageBackground>
  )
}
 