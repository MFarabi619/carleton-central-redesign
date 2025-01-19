<template>
    <div class="meteor-holder relative -top-[120px]">
        <div :class="starClasses" />
        <div class="meteor-bg absolute -left-32 -top-20 z-0 h-48 w-64 transform-gpu animate-falldown rounded-full bg-gradient-radial via-80% to-transparent"
            :class="bgClass" />
    </div>
</template>

<script lang="ts" setup>
import { cn } from './cn'

const props = withDefaults(
  defineProps<{
    starClass: string
    bgClass: string
  }>(),
  {
    starClass:
      'from-indigo-300/10 via-indigo-500 to-indigo-900/80 dark:to-indigo-200 shadow-indigo-500/50',
    bgClass: 'from-indigo-500/60 via-indigo-300/10'
  }
)

const { starClass, bgClass } = toRefs(props)

const starClasses = computed(() => {
  return cn(
    'meteor absolute z-10 h-[60px] w-[1px] transform-gpu animate-falldown rounded-[2px]',
    'bg-gradient-to-b via-80% dark:via-60% shadow-lg dark:shadow-[-2px_-16px_16px_4px_var(--tw-shadow-color)]',
    starClass.value
  )
})
</script>

<style scoped></style>
