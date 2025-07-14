'use server';

export async function uploadToImgBB(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro ao fazer upload da imagem: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.url;
  } catch (error) {
    console.error('Erro ao fazer upload para ImgBB:', error);
    throw new Error('Falha ao fazer upload da imagem');
  }
}