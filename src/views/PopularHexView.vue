<template>
  <main class="popular-hex">
    <div class="title-wrapper">
      <h1 class="title">Popular Hex Codes</h1>
    </div>
    <div class="color-container">
      <div class="color-box" 
        :style="{backgroundColor: '#' + item.colorCode}" 
        v-for="(item, index) in popularColorList" 
        :key="index"
      >
        <button type="button" class="copy-button"
          v-if="isCopied[index]"
          :style="{color: computedColor(item.colorCode)}"
        >
          <span>Copied</span>
          <i class="fa-solid fa-check"></i>
        </button>
        <span 
          v-else
          class="color-code" 
          :style="{color: computedColor(item.colorCode)}"
          @click="handleCopy(index, item.colorCode.toUpperCase())"
        >
          {{ '#' + item.colorCode.toUpperCase() }}
        </span>
      </div>
    </div>
  </main>
</template>
  
<script setup>
import { ref, onMounted} from 'vue';
import { getPopularColors, addCopyCount } from '../api/color';

const popularColorList = ref([]);
const incrementValue = ref(120);
const isCopied = ref([]);

const fetchPopularColors = async () => {
  const response = await getPopularColors();
  if (response) {
    popularColorList.value = response.popular_colors;
    isCopied.value = Array(popularColorList.value.length).fill(false);
  }
}

const computedColor = (hexColor) => {
  const toHex = (value) => value.toString(16).padStart(2, "0");

  // RGB 값 추출
  let r = parseInt(hexColor.slice(0, 2), 16); // Red
  let g = parseInt(hexColor.slice(2, 4), 16); // Green
  let b = parseInt(hexColor.slice(4, 6), 16); // Blue

  // 값 증가 및 범위 제한 (최대 255)
  if(calculateLuminance(hexColor) <= 0.5) {
    r = Math.min(r + incrementValue.value, 255);
    g = Math.min(g + incrementValue.value, 255);
    b = Math.min(b + incrementValue.value, 255);
  } else {
    r = Math.max(r - incrementValue.value, 0)
    g = Math.max(g - incrementValue.value, 0)
    b = Math.max(b - incrementValue.value, 0)
  }

  // 새 색상 반환
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const calculateLuminance = (hex) => {
  // HEX를 RGB로 변환
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  // RGB를 [0, 1] 사이의 값으로 정규화
  r /= 255;
  g /= 255;
  b /= 255;

  // sRGB 공간에서의 밝기 계산
  r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // 상대적 밝기 계산
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance;
}

const handleCopy = async (index, hexCode) => {
  navigator.clipboard
    .writeText(hexCode)
    .then(() => {
      isCopied.value[index] = true;
      setTimeout(() => {
        handleReturn(index);
      }, 1000);
    })
    .catch((error) => {
      console.error('Copy Failed:', error);
    });

  await addCopyCount(hexCode);
};

const handleReturn = (index) => {
  isCopied.value[index] = false;
};

onMounted(() => {
  fetchPopularColors();
})
</script>
  
<style scoped>
.popular-hex {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

.title-wrapper {
  margin-top: 4rem;
}

.title {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
}

.color-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
}

.color-box {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  width: 12rem;
  height: 12rem;
  border-radius: 1rem;
  box-shadow: 0.05rem 0.05rem 0.6rem 0.2rem rgba(0,0,0,0.15);
}

.color-code {
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
}

.copy-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 4rem;
  font-size: 1.6rem;
  gap: 0.5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;  
}

@media screen and (max-width: 1366px) {
    .color-container {
      grid-template-columns: repeat(8, 1fr);
      gap: 1.5rem;
    }

    .color-box {
      justify-self: center;
      width: 11rem;
      height: 11rem;
    }
}

@media screen and (max-width: 1024px) {
    .color-container {
      grid-template-columns: repeat(5, 1fr);
    }

    .color-box {
      justify-self: center;
      width: 10rem;
      height: 10rem;
    }
}

@media screen and (max-width: 600px) {
  .color-container {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
    margin-top: 1rem;
  }  

  .color-box {
    justify-self: center;
    width: 8rem;
    height: 8rem;
  }  

  .color-code {
    font-size: 1.2rem;
  }

  .copy-button {
    height: 2.4rem;
    width: 2.4rem;
    font-size: 1.2rem;
    gap: 0.2rem;
  }
}
</style>