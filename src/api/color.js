import apiClient from './axios';

export const getColor = async (hexCode) => {
  try {
    const repsponse = await apiClient.get(`/color/hex/${hexCode}`)
    return repsponse.data;
  } catch (error) {
    console.error('Get Color Failed: ', error);
  }
}

export const getPopularColors = async () => {
  try {
    const repsponse = await apiClient.get(`/color/popular`)
    return repsponse.data;
  } catch (error) {
    console.error('Get Color Failed: ', error);
  }
}

export const addCopyCount = async (hexCode) => {
  try {
    const repsponse = await apiClient.put(`/color/hex/${hexCode}`)
    return repsponse.data;
  } catch (error) {
    console.error('Copy Failed: ', error);
  }
}