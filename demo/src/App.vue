<template>
  <app-layout>
    <home-view />
  </app-layout>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: sans-serif;
}
</style>
<script setup>
import { AppLayout } from "@/layouts";
import { HomeView } from "@/views";
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
