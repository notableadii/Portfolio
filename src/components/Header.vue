<script setup>
import "./assets/header.css";
function changeBgColor() {
  document.body.style.backgroundColor = "#5409DA";
  document.body.style.color = "white";
}

function resetBgColor() {
  document.body.style.backgroundColor = "";
  document.body.style.color = "";
}
</script>

<template>
  <!-- <header></header> -->
  <header>
    <div class="logo-container">
      <span class="logo">*</span>
      <!-- <span class="logo-text"
        ><a href="https://github.com/notableadii">Github</a></span
      > -->
      <span class="logo-text">
        <a
          href="https://github.com/notableadii"
          @mouseover="changeBgColor"
          @mouseleave="resetBgColor"
          >Github</a
        >
      </span>
    </div>
  </header>
</template>

<style scoped></style>
