<template>
  <v-container>
    <v-col class="d-flex flex-column justify-center align-center">
      <v-card v-for="item in state.files" :key="item" width="800" elevation="1" class="mt-5">
        <v-col class="d-flex pb-0">
          <v-col class="d-flex flex-column pa-0">
            <v-card-title>
              Завантаживший файл
            </v-card-title>
            <v-card-subtitle>
              Пошта: {{ state.email }} <br />
              Ім'я: {{ state.name }} <br />
              Фамілія: {{ state.surname }} <br />
            </v-card-subtitle>
          </v-col>
          
          <v-card-actions>
            <v-btn
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show = !show"
            />
          </v-card-actions>
        </v-col>
        <v-col>
          <v-expand-transition>
            <div v-show="show">
              <v-divider />

              <v-card-title>
                  {{ item.name }}
              </v-card-title>

              <v-card-subtitle>
                К-ть сторінок: {{ item.pages }} <br/>
                Розмір: {{ truncatedNumber(item.size) }} <br/>
                Формат: {{ item.contentType }} <br/>
              </v-card-subtitle>
            </div>
          </v-expand-transition>
        </v-col>
      </v-card>
    </v-col>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserData } from '~/composables/useUserData';

const show = ref(false);

const form = {
  name: '',
  email: '',
  surname: '',
  password: '',
  files: []
}

const state = reactive({
  ...form,
})

const { data } = useUserData();

const truncatedNumber = (value) => {
  const digitsToKeep = 2;
  const factor = Math.pow(10, Math.floor(Math.log10(+value)) + 1 - digitsToKeep);
  const truncatedNumber = Math.floor((+value) / factor);
  return truncatedNumber + ' КБ';
}

const getFiles = async () => {
  try {
    const response = await $fetch(`http://localhost:5000/users/${data.value.user._id}`, {
      method: "GET",
      credentials: "include"
    });

    if (response && response.user) {
      state.email = response?.user?.email;
      state.name = response?.user?.name;
      state.surname = response?.user?.surname;
      state.files = [...response?.user?.files];
    }
  } catch (error) {
    console.error('Error during login', error);
  }
};

onMounted(() => {
  getFiles();
});
</script>
