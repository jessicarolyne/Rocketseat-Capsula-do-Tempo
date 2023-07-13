'use client'

import { ChangeEvent, useState } from "react"

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
  console.log(event.target.files)
  const { files } = event.target
  if(!files) {
    return
  }
  const previewURL = URL.createObjectURL(files[0])
  setPreview(previewURL)
  }
  return(
    <>
      <input
      onChange={onFileSelected} 
      name="coverUrl"
      type="file" 
      id="midia"  
      className="invisible h-0 w-0"
      accept="image/*"
      />
      {preview && <img src={preview} alt="" className="w-full aspect-video rounded-lg object-cover"/>}
    </>
  )
}