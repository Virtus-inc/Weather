<template>
  <v-card
    class="mx-auto pa-12 pb-8 mt-10"
    elevation="8"
    max-width="800"
    width="800"
    rounded="lg"
  >
    <form @submit.prevent="updateUser">
      <v-text-field
        v-model="state.email"
        label="Пошта"
      />

      <v-text-field
        v-model="state.name"
        label="Ім'я"
      />

      <v-text-field
        v-model="state.surname"
        label="Прізвище"
      />

      <v-text-field
        v-model="state.password"
        type="password"
        label="Пароль"
      />

      <v-btn
        class="me-4"
        type="submit"
      >
        Зберігти
      </v-btn>
    </form>
  </v-card>
</template>

<script setup>
import { reactive } from 'vue'
import { useUserData } from '~/composables/useUserData';

const form = {
  email: '',
  name: '',
  surname: '',
  password: ''
};

const state = reactive({
  ...form
}) 

const { data } = useUserData();

const getUser = async () => {
  try {
    const response = await $fetch(`http://localhost:5000/users/${data.value.user._id}`, {
      method: "GET",
      credentials: "include"
    });

    if (response && response.user) {
      state.email = response?.user?.email;
      state.name = response?.user?.name;
      state.surname = response?.user?.surname;
    }
  } catch (error) {
    console.error('Error during login', error);
  }
};

const updateUser = async () => {
  try {
    const response = await fetch(`http://localhost:5000/users/${data.value.user._id}`, {
      method: 'PATCH',
      body: JSON.stringify(state),
      credentials: "include"
    });
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

onMounted(() => {
  getUser();
});
</script>
