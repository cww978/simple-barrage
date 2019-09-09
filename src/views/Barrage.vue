<template>
  <div class="screen-main">
    <!-- 大屏显示 -->
    <div class="screen">
      <!-- 弹幕屏幕 -->
      <barrage-screen
        ref="barrage-screen"
        :barrage="barrageSwitch"
      ></barrage-screen>
    </div>
  </div>
</template>
<script>
import BarrageScreen from "../components/BarrageScreen";
export default {
  components: { BarrageScreen },
  data() {
    return {
      barrageSwitch: true
    };
  },
  mounted() {
    setInterval(() => {
      this.$refs["barrage-screen"].renderBarrage({ text: "你好" });
    }, 3000);
  }
};
</script>
<style scoped>
.screen-main {
  height: calc(100vh);
  padding: 0px;
  background-image: url("../assets/screen-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.screen {
  height: 100%;
  position: relative;
}
.barrage-screen {
  position: relative;
}
</style>
