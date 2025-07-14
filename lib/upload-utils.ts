import { uploadToImgBB } from './imgbb-utils'

export async function saveImageToServer(file: File): Promise<string> {
  try {
    const imageUrl = await uploadToImgBB(file)
    return imageUrl
  } catch (error) {
    console.error('Erro ao salvar imagem:', error)
    throw new Error('Falha ao salvar a imagem no servidor')
  }
}