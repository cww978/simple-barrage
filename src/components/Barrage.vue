<template>
  <div
    class="barrage"
    @mouseenter="mouseenterHandler"
    @mouseleave="mouseleaveHandler"
    :style="`transform: translate(${x}px,${y}px)`"
  >
    <!-- <div class="header-img">
      <img
        class="avatar"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div> -->
    <div class="barrage-content">
      <div class="barrage-text"><slot></slot></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Barrage",
  data() {
    return {
      translateX: 0,
      translateY: 0,
      speed: 3,
      puse: false
    };
  },
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    // 渲染完成
    this.$emit("completed");
  },
  methods: {
    // 鼠标进入弹幕
    mouseenterHandler() {
      this.$emit("barrage-hover");
    },
    // 鼠标离开弹幕
    mouseleaveHandler() {
      this.$emit("barrage-leave");
    }
  }
};
</script>
<style scoped>
.barrage {
  position: absolute;
  background-color: #ffa0a073;
  display: flex;
  align-items: center;
  border-radius: 30px;
  padding: 5px 10px;
}
.header-img {
  display: flex;
  justify-content: center;
  align-items: center;
}
.barrage-content {
  flex: 1;
}
.barrage-text {
  color: white;
  font-size: 1.2rem;
  padding: 0px 10px;
}
.avatar {
  height: 50px;
  width: 50px;
  border-radius: 25px;
}
</style>
