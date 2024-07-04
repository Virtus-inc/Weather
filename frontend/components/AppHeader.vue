<template>
  <v-card
    color="black"
    rounded="0"
    elevation="5"
    flat
  >
    <v-toolbar density="comfortable">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <NuxtLink
          to="/"
          class="text-black text-decoration-none"
          rel="noopener noreferrer"
        >
          <h4>
            <strong class="red">R</strong>
            <strong class="green">G</strong>
            <strong class="blue">B</strong>-Studio
          </h4>
        </NuxtLink>
      </v-toolbar-title>

      <v-spacer />

      <div v-if="data">
        <NuxtLink
          to="/upload"
          class="text-black text-decoration-none"
          rel="noopener noreferrer"
        >
          <v-btn prepend-icon="mdi-file-multiple" variant="text">
            Завантажити
          </v-btn>
        </NuxtLink>
        <NuxtLink
          to="/files"
          class="text-black text-decoration-none"
          rel="noopener noreferrer"
        >
          <v-btn prepend-icon="mdi-file-multiple" variant="text">
            Мої файли
          </v-btn>
        </NuxtLink>

        <NuxtLink
          to="/profile"
          class="text-black text-decoration-none"
          rel="noopener noreferrer"
        >
          <v-btn prepend-icon="mdi-account" variant="text">
            Профіль
          </v-btn>
        </NuxtLink>
      </div>
      <div v-else>
        <NuxtLink
          to="/auth/login"
          class="text-black text-decoration-none"
          rel="noopener noreferrer"
        >
          <v-btn prepend-icon="mdi-check" variant="text">
            Вхід
          </v-btn>
        </NuxtLink>
        <NuxtLink
          to="/auth/registration"
          class="text-black text-decoration-none"
          rel="noopener noreferrer"
        >
          <v-btn prepend-icon="mdi-plus" variant="text">
            Реєстрація
          </v-btn>
        </NuxtLink>
      </div>
    </v-toolbar>
  </v-card>
</template>

<script setup>
import { useUserData } from '~/composables/useUserData';
const { data } = useUserData();
</script>

<style scoped>
.red {
    color: red;
}
.green {
    color: green;
}
.blue {
    color: blue;
}
</style>