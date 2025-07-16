<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useSoftwareValidation } from '../composables/useSoftwareValidations';

type TechKey =
  | 'os'
  | 'virtualization'
  | 'loadBalancer'
  | 'containerization'
  | 'storage'
  | 'cloud'
  | 'webServer'
  | 'platform'
  | 'appServer'
  | 'dbms';

type TechItem = {
  key: TechKey;
  label: string;
};

const techStack: TechItem[] = [
  { key: 'os', label: 'Базовая операционная система' },
  { key: 'virtualization', label: 'Система виртуализации' },
  { key: 'loadBalancer', label: 'Балансировщик нагрузки' },
  { key: 'containerization', label: 'Контейнеризация' },
  { key: 'storage', label: 'Средства хранения данных' },
  { key: 'cloud', label: 'Облачное хранилище' },
  { key: 'webServer', label: 'Веб-сервер' },
  { key: 'platform', label: 'Программная платформа' },
  { key: 'appServer', label: 'Сервер приложений' },
  { key: 'dbms', label: 'СУБД' },
];

const allowedSoftware: Record<TechKey, string[]> = {
  os: ['ALT Linux', 'Astra Linux', 'Ubuntu', 'Иное (указать)', 'Microsoft Windows'],
  virtualization: ['KVM', 'Oracle VirtualBox', 'VMWare ESXi', 'Иное (указать)'],
  loadBalancer: ['Nginx', 'HAProxy', 'Иное (указать)'],
  containerization: ['Docker', 'Podman', 'Kubernetes', 'Иное (указать)'],
  storage: ['Ceph', 'MinIO', 'Иное (указать)'],
  cloud: ['VK Cloud', 'Яндекс Облако', 'Иное (указать)'],
  webServer: ['Nginx', 'Apache', 'Иное (указать)'],
  platform: ['Node.js', '.NET Core', 'Иное (указать)'],
  appServer: ['Tomcat', 'WildFly', 'Иное (указать)'],
  dbms: ['PostgreSQL', 'ClickHouse', 'Redis', 'Иное (указать)'],
};

const OTHER_OPTION = 'Другое';

const initialTechState = Object.fromEntries(techStack.map(({ key }) => [key, ''])) as Record<
  TechKey,
  string
>;

const selectedSoftware = reactive<Record<TechKey, string>>({ ...initialTechState });
const violations = reactive<Record<TechKey, string>>({ ...initialTechState });
const customInputs = reactive<Record<TechKey, string>>({ ...initialTechState });

const selectOptions = computed(() => {
  const result: Record<TechKey, string[]> = {} as Record<TechKey, string[]>;
  for (const key in allowedSoftware) {
    result[key as TechKey] = [...allowedSoftware[key as TechKey], OTHER_OPTION];
  }
  return result;
});

function handleSelectChange(key: TechKey, value: string) {
  if (value === OTHER_OPTION) {
    selectedSoftware[key] = '';
  } else {
    selectedSoftware[key] = value;
  }
}

function handleCustomInputChange(key: TechKey, value: string) {
  customInputs[key] = value;
  selectedSoftware[key] = value;
}

const { isBlacklisted } = useSoftwareValidation(selectedSoftware, violations);
</script>
<template>
  <div class="q-gutter-md">
    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6">Технологический стек</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div v-for="item in techStack" :key="item.key" class="q-mb-md">
          <q-select
            v-model="selectedSoftware[item.key]"
            :options="selectOptions[item.key]"
            :label="item.label"
            dense
            outlined
            clearable
            class="q-mt-sm"
            :error="!!violations[item.key]"
            :error-message="violations[item.key]"
            @update:model-value="handleSelectChange(item.key, $event)"
          />

          <q-input
            v-if="selectedSoftware[item.key] === ''"
            v-model="customInputs[item.key]"
            label="Укажите своё значение"
            dense
            outlined
            class="q-mt-sm"
            :error="isBlacklisted(customInputs[item.key])"
            :error-message="
              isBlacklisted(customInputs[item.key])
                ? `Запрещённое ПО: ${customInputs[item.key]}`
                : ''
            "
            @input="handleCustomInputChange(item.key, $event.target.value)"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-caption text-weight-medium q-mb-xs">Выбранные значения:</div>
        <q-banner class="bg-grey-2 q-pa-md">
          <pre class="text-caption">{{ JSON.stringify(selectedSoftware, null, 2) }}</pre>
        </q-banner>
      </q-card-section>
    </q-card>
  </div>
</template>
