import apiClient from 'axios';

export const getColor = async (hexCode) => {
  try {
    const repsponse = await apiClient.get(`/color/hex/${hexCode}`)
    return repsponse.data;
  } catch (error) {
    console.error('Get Color Failed: ', error);
  }
}