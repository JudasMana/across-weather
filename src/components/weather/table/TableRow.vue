<template>
  <tr>
    <td id="time-data">{{ time }}</td>
    <td>{{ tempValue }}</td>
    <td>
      <div id="img-container">
        <img
          v-if="icon"
          :src="icon"
          alt="Icon"
          :class="{ animate: this.showAnimation }"
          :style="{ animationDelay: `${delay * animationDelay}ms` }"
        />
        <p id="empty-data" v-else>-</p>
      </div>
    </td>
  </tr>
</template>

<script>
import { getImage } from "../../../helpers.js";
import { tableAnimationDelay } from "@/config.js";

export default {
  data() {
    return {
      showAnimation: true,
      animationDelay: tableAnimationDelay,
    };
  },
  props: ["time", "temp", "weatherCode", "delay"],
  computed: {
    icon() {
      return getImage(this.weatherCode);
    },
    tempValue() {
      if (!this.icon) {
        return "-";
      }
      return this.temp.toFixed(1) + " °C";
    },
  },
  watch: {
    time() {
      this.resetAnimation();
    },
    temp() {
      this.resetAnimation();
    },
    weatherCode() {
      this.resetAnimation();
    },
  },
  methods: {
    resetAnimation() {
      this.showAnimation = false;
      setTimeout(() => {
        this.showAnimation = true;
      }, 10);
    },
  },
};
</script>

<style scoped>
tr {
  border-bottom: 1px solid rgb(238, 221, 221);
  height: 3rem;
}

td {
  height: 3rem;
  text-align: center;
}

#time-data {
  text-align: start;
  padding-left: 1rem;
}

#img-container {
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  height: 100%;
}

@keyframes jiggle {
  0% {
    transform: rotate(0) translateY(0px);
  }
  15% {
    transform: rotate(-7deg) translateY(-2px) translateX(2px);
  }
  30% {
    transform: rotate(0deg) translateY(-4px) translateX(0px);
  }
  45% {
    transform: rotate(7deg) translateY(-2px) translateX(-2px);
  }
  60% {
    transform: rotate(0) translateY(0px);
  }
  100% {
    transform: rotate(0) translateY(0px);
  }
}

.animate {
  animation-name: jiggle;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>
