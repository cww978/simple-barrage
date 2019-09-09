<template>
  <div ref="barrage-screen" class="barrage-screen">
    <slot style="position: absolute;" name="content"></slot>
    <template v-for="(item, index) in barrages">
      <barrage
        @barrage-hover="item.puse = true"
        @barrage-leave="item.puse = false"
        :y="item.y"
        :x="item.x"
        :key="index"
      >
        {{ item.text }}
      </barrage>
    </template>
  </div>
</template>
<script>
import Barrage from "./Barrage";
import { setInterval } from "timers";
export default {
  name: "BarrageScreen",
  components: { Barrage },
  data() {
    return {
      // 弹幕回收池
      pool: [],
      // 弹幕池
      barrages: [],
      barrageScreenHeight: 0,
      barrageScreenWidth: 0
    };
  },
  props: {
    barrage: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    barrage(val) {
      if (val == false) {
        this.barrages = [];
      }
    }
  },
  mounted() {
    this.barrageScreenHeight = this.$refs["barrage-screen"].offsetHeight;
    this.barrageScreenWidth = this.$refs["barrage-screen"].offsetWidth;
    this.start();
  },
  methods: {
    // 循环渲染弹幕元素
    loop() {
      for (let i = 0; i < this.barrages.length; i++) {
        if (this.barrages[i].puse == false) {
          this.barrages[i].x -= this.barrages[i].speed;
          // 对超出2倍屏幕宽度的弹幕进行回收
          if (Math.abs(this.barrages[i].x) > 2 * this.barrageScreenWidth) {
            let recoveryItem = this.barrages.splice(i, 1);
            this.recovery(recoveryItem);
          }
        }
      }
    },
    // 启动循环
    start() {
      this.$nextTick(() => {
        // 30帧
        setInterval(this.loop, 1000 / 30);
      });
    },
    // 创建弹幕
    creatBarrage() {
      let data = {
        x: 0,
        maxX: this.barrageScreenWidth,
        maxY: this.barrageScreenHeight,
        y: 0,
        speed: 3,
        puse: false,
        timeId: new Date().getTime(),
        init() {
          this.x = this.maxX;
          this.y = parseInt(Math.random() * (this.maxY - 100));
          this.puse = false;
        }
      };
      return data;
    },
    // 回收弹幕
    recovery(barrages) {
      barrages.puse = true;
      this.pool.push(barrages);
    },
    renderBarrage(data) {
      this.$nextTick(() => {
        let barrage = null;
        // 从弹幕回收池取出弹幕对象
        if (this.pool.length > 0) {
          let pools = this.pool.splice(0, 1)[0];
          barrage = pools[0];
        } else {
          barrage = this.creatBarrage();
        }
        barrage.init();
        barrage = Object.assign(barrage, data);
        // 是否加入弹幕宣传池
        if (this.barrage) {
          this.barrages.push(barrage);
        }
      });
    }
  }
};
</script>
<style scoped>
.barrage-screen {
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
}
</style>
