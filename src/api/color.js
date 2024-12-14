import axios from "axios";

export const getColor = async (hexCode) => {
  try {
    const repsponse = await axios.get(`/api/v1/color/hex/${hexCode}`)
    return repsponse.data;
  } catch (error) {
    console.error('Get Color Failed: ', error);
  }
}