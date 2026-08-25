export const uploadImageToImgBB = async (file) => {
  if (!file) return null;
  
  const formData = new FormData();
  formData.append('image', file);
  
  const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  
  if (!imgbbKey) {
    throw new Error('ImgBB API key is not configured');
  }

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
    method: 'POST',
    body: formData,
  });
  
  const data = await response.json();
  
  if (data.success) {
    return data.data.url; // Returns the direct image URL
  } else {
    throw new Error(data.error?.message || 'Image upload failed');
  }
};
