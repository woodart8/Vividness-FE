import apiClient from '@/api/axios';

export const createPalette = async (hexCode) => {
  try {
    const repsponse = await apiClient.post(`/palette/hex/${hexCode}`)
    return repsponse.data;
  } catch (error) {
    console.error('Generate Palette Failed: ', error);
  }
}