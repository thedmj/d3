<template>
  <div class="button">
    <button>
        <span v-if="$slots.default">{{this.$slots.default[0].text}}</span>
    </button>
  </div>
</template>

<script>
  export default {
    mounted() {
    //   console.log(this.$slots.default[0].text);
    }
  }

</script>

<style lang="less">
  .button {
    width: 60px;
    height: 30px;
    button {
      width: 100%;
      height: 100%;
    }
  }

</style>
