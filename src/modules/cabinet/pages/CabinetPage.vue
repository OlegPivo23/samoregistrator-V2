<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import MainLayout from 'src/layouts/MainLayout.vue';
import { QSpinnerDots } from 'quasar';
import TabsComponent from 'src/components/tabs/TabsComponent.vue';

type Tab = 'profile' | 'contact';

const activeTab = ref<Tab>('profile');

const ProfileFormComponent = defineAsyncComponent({
  loader: () => import('src/components/forms/ProfileFormComponent.vue'),
  loadingComponent: () => '<div>Loading profile...</div>',
  delay: 200,
});

const ContactFormComponent = defineAsyncComponent({
  loader: () => import('src/components/forms/ContactFormComponent.vue'),
  loadingComponent: () => '<div>Loading contacts...</div>',
  delay: 200,
});
</script>

<template>
  <MainLayout>
    <div class="min-h-screen flex justify-center items-center bg-gray-100">
      <Suspense>
        <template #default>
          <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-gray-700 text-center mb-6">Личный кабинет</h2>
            <TabsComponent v-model:activeTab="activeTab" />
            <KeepAlive>
              <component
                :is="activeTab === 'profile' ? ProfileFormComponent : ContactFormComponent"
              />
            </KeepAlive>
          </div>
        </template>
        <template #fallback>
          <div class="flex flex-center q-pa-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </Suspense>
    </div>
  </MainLayout>
</template>
