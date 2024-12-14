import axios from "axios";

export const createPalette = async (hexCode) => {
  try {
    const repsponse = await axios.post(`/api/v1/palette/hex/${hexCode}`)
    return repsponse.data;
  } catch (error) {
    console.error('Generate Palette Failed: ', error);
  }
}