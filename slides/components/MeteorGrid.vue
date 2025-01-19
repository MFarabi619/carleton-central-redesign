<template>
  <div class="absolute h-full w-full transform-gpu overflow-hidden">
    <div
      class="absolute left-0 right-0 top-0 z-0 h-full bg-gradient-to-b from-white dark:from-black via-80% via-white/10 dark:via-neutral-850 to-neutral-800"
    ></div>
    <div
      class="absolute left-10 right-10 top-[-120px] h-[120px] rounded-[50%] shadow-2xl shadow-black dark:shadow-white"
    ></div>
    <div class="absolute left-0 right-0 h-screen overflow-hidden">
      <slot />
    </div>
    <div class="absolute inset-0 z-0 bg-grid bg-[size:60px_60px]"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
