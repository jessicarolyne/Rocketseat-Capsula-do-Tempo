import { View, Text, Touchable, Switch, TextInput } from "react-native"
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { Link } from "expo-router"
import Icon from '@expo/vector-icons/Feather'
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useState } from "react"
import * as ImagePicker from 'expo-image-picker';

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets()
  const [ preview, setPreview ] = useState<string | null>(null)
  const [ isPublic, setIsPublic ] = useState(false)
  const [ content, setContent ] = useState('')

  async function openImagePicker(){
   try{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result);
    if(result.assets[0]) {
setPreview(result.assets[0].uri)
    }
   }

    /*if (!result.canceled) {
      setImage(result.assets[0].uri);
    }*/
  }
  return (
    <ScrollView className=" flex-1 px-8" 
    contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}>
      <View className="mt-4 flex-row items-center justify-between">
        <NLWLogo/>
        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>
      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch value={isPublic} onValueChange={setIsPublic} 
          thumbColor={ isPublic ? "#9b79ea" : "#9e9ea0" }
          trackColor={{false: "#767577", true: "#372560"}}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória publica
          </Text>
        </View>
      </View>
      <TouchableOpacity 
      activeOpacity={0.7}
      onPress={openImagePicker}
      className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20">
        <View className="flex-row items-center gap-2">
          <Icon name="image" color="#FFF" />
          <Text className="font-body text-sm text-gray-200">Adicionar foto ou vídeo de capa</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <TextInput multiline
        value={content}
        onChangeText={setContent}
        className="my-4 p-0 font-body text-lg text-gray-50"
        placeholderTextColor="#56565a"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."/>
      </TouchableOpacity>
      <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full items-center self-end bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Salvar
          </Text>
        </TouchableOpacity>
    </ScrollView>
  )
}