<template>
  <main class="color-mixer">
    <div class="title-wrapper">
      <h1 class="title">Color Mixer</h1>
    </div>
    <section class="result-color-section">
      <div class="color-box-wrapper">
        <div 
          class="result-color-box"
          @click="mixColor"
          :style="{ backgroundColor: resultColor ? '#' + resultColor : '#ffffff' }"
        ></div>
        <div v-show="resultColor" class="color-code-wrapper">
          <span class="color-code">#{{ resultColor.toUpperCase() }}</span>
          <button type="button" class="copy-button"
            v-if="isCopied"
          >
            <i class="fa-solid fa-check"></i>
          </button>
          <button type="button" class="copy-button"
            v-else
            @click="handleCopy(resultColor.toUpperCase())"
          >
            <i class="fa-regular fa-copy"></i>
          </button>
        </div>
      </div>
    </section>
    <section class="source-color-section">
      <div v-if="!resultColor" class="explanation-wrapper">
        <span class="explanation">Choose a color below and put it in the box above</span>
      </div>
      <button v-else type="button" class="refresh-button" @click="handleRefresh">
        <i class="fa-solid fa-arrow-rotate-right"></i>
      </button>
      <div class="color-container">
        <div
          class="color-box"
          :style="{backgroundColor: '#' + item.colorCode}"
          v-for="(item, index) in sourceColorList"
          :key="index"
          @click="startColorDrag(item.colorCode, $event)"
        ></div>
      </div>
    </section>
    <div
      v-if="dragging"
      class="dragging-circle"
      :style="{ backgroundColor: '#' + selectedColor, top: mousePosition.y + 'px', left: mousePosition.x + 'px' }"
    ></div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { addCopyCount } from '../api/color';

const sourceColorList = ref([
  { colorCode: 'ff0000' },
  { colorCode: 'ff8000' },
  { colorCode: 'ffff00' },
  { colorCode: '008000' },
  { colorCode: '0000ff' },
  { colorCode: '000080' },
  { colorCode: '800080' },
  { colorCode: '000000' },
  { colorCode: 'ffffff' }
]);

const selectedColor = ref('');
const dragging = ref(false);
const mousePosition = ref({ x: 0, y: 0 });
const resultColor = ref('');
const colorRatios = ref([]); 

const isCopied = ref(false);

const startColorDrag = (color, event) => {
  selectedColor.value = color;
  dragging.value = true;

  const clientX = event.clientX;
  const clientY = event.clientY;

  mousePosition.value = { x: clientX, y: clientY };

  const onMove = (moveEvent) => {
    const x = moveEvent.clientX;
    const y = moveEvent.clientY;
    mousePosition.value = { x, y };
  };

  const onEnd = () => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);

    setTimeout(() => {
      dragging.value = false;
      selectedColor.value = '';
    }, 50); // 50ms 지연
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);
};

// 클릭하여 색을 합치는 함수
const mixColor = () => {
  if (dragging.value) {
    if (resultColor.value === '') {
      // 첫 번째 색상이라면 그 색을 기본값으로 설정
      resultColor.value = selectedColor.value;
      colorRatios.value = [{ color: selectedColor.value, ratio: 1 }]; // 첫 번째 색상은 비율 1
    } else {
      // 색상 비율을 계산하고 혼합
      resultColor.value = mixColorsByRatios(resultColor.value, selectedColor.value);
      updateColorRatios();
    }

    dragging.value = false;
  }
};

// 색상 비율을 계산하여 혼합하는 함수
const mixColorsByRatios = (color1, color2) => {
  const r1 = parseInt(color1.substring(0, 2), 16);
  const g1 = parseInt(color1.substring(2, 4), 16);
  const b1 = parseInt(color1.substring(4, 6), 16);

  const r2 = parseInt(color2.substring(0, 2), 16);
  const g2 = parseInt(color2.substring(2, 4), 16);
  const b2 = parseInt(color2.substring(4, 6), 16);

  const totalRatio = colorRatios.value.reduce((sum, item) => sum + item.ratio, 0) + 1;
  const r = Math.round((r1 * (totalRatio - 1) + r2 * 1) / totalRatio).toString(16).padStart(2, '0');
  const g = Math.round((g1 * (totalRatio - 1) + g2 * 1) / totalRatio).toString(16).padStart(2, '0');
  const b = Math.round((b1 * (totalRatio - 1) + b2 * 1) / totalRatio).toString(16).padStart(2, '0');

  return r + g + b;
};

// 색상 비율을 업데이트하는 함수
const updateColorRatios = () => {
  colorRatios.value.push({ color: selectedColor.value, ratio: 1 });
};

const handleCopy = async (hexCode) => {
  navigator.clipboard
    .writeText(hexCode)
    .then(() => {
      isCopied.value= true;
      setTimeout(() => {
        handleReturn();
      }, 1000);
    })
    .catch((error) => {
      console.error('Copy Failed:', error);
    });

  await addCopyCount(hexCode);
};

const handleReturn = () => {
  isCopied.value = false;
};

const handleRefresh = () => {
  resultColor.value = '';
  colorRatios.value = []; 
}
</script>

<style scoped>
.color-mixer {
  display: flex;
  flex-direction: column;
  width: 100%;
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

.color-box-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 24rem;
  gap: 1rem;
}

.color-code-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 80%;
}

.color-code {
  font-size: 2.4rem;
  font-weight: 700;
}

.copy-button {
  position: absolute;
  top: 0.52rem;
  right: 0.3rem;
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

.refresh-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #202020;
  font-size: 2rem;
  padding: 0;
}

.color-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12rem;
  height: 12rem;
  border-radius: 1rem;
  box-shadow: 0.05rem 0.05rem 0.6rem 0.2rem rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.result-color-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 20rem;
  border-radius: 1rem;
  box-shadow: 0.05rem 0.05rem 0.6rem 0.2rem rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.explanation-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
}

.explanation {
  line-height: 1.6rem;
  font-size: 1.6rem;
  font-weight: 700;
}

.source-color-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  margin-bottom: 10rem;
}

.color-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3rem;
}

.dragging-circle {
  position: absolute;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.2);
  pointer-events: none;
}

@media screen and (max-width: 1024px) {
  .color-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
}

@media screen and (max-width: 600px) {
  .color-box-wrapper {
    height: 22rem;
  }

  .color-box {
    width: 9rem;
    height: 9rem;
  }

  .result-color-box{
    width: 16rem;
    height: 16rem;
  }

  .copy-button {
    top: 0.52rem;
    right: -1.4rem;
  }
}
</style>
  