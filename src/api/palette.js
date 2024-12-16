import apiClient from './axios';

export const createPalette = async (hexCode, formData) => {
  try {
    const repsponse = await apiClient.post(`/palette/hex/${hexCode}`, formData)
    return repsponse.data;
  } catch (error) {
    console.error('Generate Palette Failed: ', error);
  }
}