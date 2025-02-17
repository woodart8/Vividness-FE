<template>
  <main class="ai-generator">
    <div class="title-wrapper">
      <h1 class="title">AI Color Palette Generator</h1>
    </div>
    <section class="color-view-section">
      <div class="color-box-wrapper">
        <div class="color-box" :style="{backgroundColor: '#' + hexCode}"></div>
        <div class="color-code-wrapper">
          <span class="color-code">#{{ hexCode }}</span>
          <button type="button" class="copy-button"
            v-if="isCopied[0]"
          >
            <i class="fa-solid fa-check"></i>
          </button>
          <button type="button" class="copy-button"
            v-else
            @click="handleCopy(0, hexCode)"
          >
            <i class="fa-regular fa-copy"></i>
          </button>
        </div>
      </div>
      <div class="search-bar">
        <div class="color-picker-wrapper">
          <button type="button" class="color-picker-button" @click="handleToggle" :style="{backgroundColor: colors.hex, color: textColor}">
            <i class="fa-solid fa-eye-dropper"></i>
          </button>
          <Chrome v-if="isToggled" class="chrome-picker" v-model="colors" ref="chromePicker"/>
        </div>
        <div class="input-text-wrapper">
          <input 
            type="text"
            name="hex-code-input"
            class="color-input"
            maxlength="6"
            placeholder="Hex code or use the picker"
            v-model="input"
            @keyup.enter="handleSubmit"
          >
          <button type="button" class="submit-button" @click="handleSubmit">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </section>
    <section class="ai-generate-section">
      <div class="tag-container">
        <span>Select tags for better results</span>
        <ul class="tag-list">
          <li class="tag" :class="{selected: item.selected}" @click="handleClickTags(index)" v-for="(item, index) in tagList" :key="index">{{ item.tag }}</li>
        </ul>
      </div>
      <button type="button" class="generate-button" @click="fetchPalette">
        <span>Generate Palette with AI</span>
      </button>
      <div class="palette-container" v-if="isGenereted">
        <div class="color-box-wrapper" v-for="(item, index) in palette" :key="index">
          <div class="mini-color-box" :style="{backgroundColor: '#' + item.hexCode}"></div>
          <div class="color-code-wrapper">
            <span class="mini-color-code">#{{ item.hexCode }}</span>
            <button type="button" class="mini-copy-button"
              v-if="isCopied[index+1]"
            >
              <i class="fa-solid fa-check"></i>
            </button>
            <button type="button" class="mini-copy-button"
              v-else
              @click="handleCopy(index+1, item.hexCode)"
            >
              <i class="fa-regular fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="loading-spinner" v-if="isLoading && !isGenereted"></div>
    </section>
  </main>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { getColor, addCopyCount } from '../api/color';
import { createPalette } from '../api/palette';
import { Chrome } from '@ckpack/vue-color';

const isToggled = ref(false);
const isCopied = ref([false]);
const isGenereted = ref(false);
const isLoading = ref(false);

const textColor = ref('white');
const hexCode = ref('000000');
const input = ref('');
const colors = ref({hex: '#000000'});
const chromePicker = ref(null);

const palette = ref([]);
const tagList = ref(
  [
    {tag: 'Similar', value: '같은 계열', selected: false},
    {tag: 'Complementary ', value: '보색', selected: false},
    {tag: 'Pastel', value: '파스텔톤', selected: false},
    {tag: 'Vivid', value: '비비드한', selected: false},
    {tag: 'Colorful', value: '다채로운', selected: false},
    {tag: 'Warm', value: '따뜻한', selected: false},
    {tag: 'Cool', value: '차가운', selected: false},
  ]
)
const formData = ref({tags: []});

const fetchPalette = async () => {
  isGenereted.value = false;
  isLoading.value = true;

  const response = await createPalette(hexCode.value, formData.value);

  if (response) {
    const colorList = response.palette;
    for (let i = 0; i < colorList.length; i++) {
      if (palette.value.length < 4) {
        palette.value.push({
          hexCode: colorList[i].toUpperCase()
        });
      } else {
        palette.value[i].hexCode = colorList[i].toUpperCase();
      }

      if (isCopied.value.length < 5) {
        isCopied.value.push(false);
      } else {
        isCopied.value[i] = false;
      }
    }
    isGenereted.value = true; 
  }
  isLoading.value = false;
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

const checkHex = (hexCode) => {
  const hexPattern = /^[0-9A-Fa-f]{6}$/;
  return hexPattern.test(hexCode);
};

const handleToggle = () => {
  isToggled.value = !isToggled.value;
}

const handleSubmit = async () => {
  if (!checkHex(input.value)) {
    alert("Invalid Hex Code");
    return;
  }
  const color = await getColor(input.value);
  hexCode.value = color.color_code.toUpperCase();
  input.value = '';
  isToggled.value = false;
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

const handleClickTags = (index) => {
  const tagItem = tagList.value[index];

  if (!tagItem.selected) {
    if (formData.value.tags.length >= 3) {
      alert("You can select up to 3 tags!")
      return;
    }
    formData.value.tags.push(tagItem.value);
  } else {
    formData.value.tags = formData.value.tags.filter(tag => tag !== tagItem.value);
  }

  tagItem.selected = !tagItem.selected;
};

const closePickerIfOutside = (event) => {
  if (chromePicker.value && !chromePicker.value.$el.contains(event.target)) {
    isToggled.value = false;
  }
};

const generateRandomHex = () => {
  return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

watch(colors, (newColor) => {
  input.value = newColor.hex.slice(1);
  const luminance = calculateLuminance(input.value);
  textColor.value = luminance > 0.5 ? 'black' : 'white';
});

watch(input, (newValue) => {
  if (input.value.length === 6 && checkHex(newValue)) {
    colors.value.hex = '#' + newValue;
    const luminance = calculateLuminance(input.value);
    textColor.value = luminance > 0.5 ? 'black' : 'white';
  }
})

onMounted(() => {
  document.addEventListener('mousedown', closePickerIfOutside);
  const randomHex = generateRandomHex();
  hexCode.value = randomHex.toUpperCase();
  colors.value.hex = '#' + randomHex;
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', closePickerIfOutside);
});
</script>

<style scoped>
.ai-generator {
  display: flex;
  width: 100%;
  flex-direction: column;
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

.color-view-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 4rem;
}

.color-code {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
}

.mini-color-code {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.color-box {
  width: 16rem;
  height: 16rem;
  border-radius: 1rem;
  box-shadow: 0.05rem 0.05rem 0.6rem 0.2rem rgba(0,0,0,0.15);
}

.mini-color-box {
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  box-shadow: 0.05rem 0.05rem 0.6rem 0.1rem rgba(0,0,0,0.15);  
}

.search-bar {
  display: flex;
  gap: 2rem;
}

.color-picker-wrapper {
  position: relative;
}

.color-picker-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.7rem;
  height: 4.7rem;
  border: none;
  border-radius: 1rem;
  font-size: 1.8rem;
  box-shadow: 0rem 0rem 0.6rem 0.01rem rgba(0,0,0,0.15);
  cursor: pointer;
}

.chrome-picker {
 position: absolute;
 margin-top: 0.6rem;
 z-index: 2;
}

.input-text-wrapper {
  display: flex;
  align-items: center;
  width: 30rem;
  height: 4.5rem;
  background-color: #ffffff;
  border-radius: 0.6rem;
  padding-left: 1rem;
  box-shadow: 0rem 0rem 0.6rem 0.01rem rgba(0,0,0,0.15);
}

.color-input {
  width: 26rem;
  border: none;
  outline: none;
  font-size: 1.4rem;
  background-color: #fff;
  color: #202020;
  cursor: pointer;
}

.submit-button {
  display: flex;
  height: 3rem;
  width: 3rem;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  font-size: 1.8rem;
  color: #202020;
  cursor: pointer;
}

.color-box-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.color-code-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}

.copy-button {
  position: absolute;
  top: 0.52rem;
  right: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
  font-size: 1.4rem;
  color: #888888;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.mini-copy-button {
  position: absolute;
  top: 0.12rem;
  right: -1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
  font-size: 1.2rem;
  color: #888888;
  border: none;
  background-color: transparent;
  cursor: pointer;  
}

.ai-generate-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.tag-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.tag-container span {
  font-size: 1.6rem;
  font-weight: 700;
}

.tag-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0;
}

.tag {
  list-style: none;
  font-size: 1.4rem;
  font-weight: 400;
  color: #202020;
  cursor: pointer;
}

.tag.selected {
  color: #0069cc;
}

.generate-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.5rem;
  width: 26rem;
  margin-top: 1rem;
  border: none;
  border-radius: 0.6rem;
  background-color: #a1a1a1;
  color: #ffffff;
  cursor: pointer;
}

.generate-button:hover {
  background-color: #888888;
  transition: 0.2s ease;
}

.generate-button span {
  font-size: 1.8rem;
  font-weight: 500;
}

.palette-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  margin-top: 2rem;
  margin-bottom: 5rem;
}

.loading-spinner {
  margin-top: 2rem;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #aaa;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 모바일 (폰) 화면 스타일 */
@media screen and (max-width: 600px) {
  .palette-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .mini-color-code {
    margin: 0;
    font-size: 1.6rem;
  }
}
</style>