<script setup lang="ts">
import { reactive } from 'vue';

type TechItem = {
  key: string;
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

const allowedSoftware: Record<string, string[]> = {
  os: ['Альт Линукс', 'Астра Линукс', 'Роса', 'Ubuntu (MIT)'],
  virtualization: ['KVM', 'VirtualBox (GPL)', 'OpenVZ'],
  loadBalancer: ['Nginx', 'HAProxy', 'Балансер ВКС'],
  containerization: ['Docker', 'Podman', 'КРОН Контейнер'],
  storage: ['Ceph', 'MinIO', 'Хранилище АСКОН'],
  cloud: ['VK Cloud', 'Яндекс Облако', 'OpenStack (Apache 2.0)'],
  webServer: ['Nginx', 'Apache', 'Lighttpd'],
  platform: ['Node.js', '.NET Core (MIT)', '1С:Платформа'],
  appServer: ['Tomcat', 'WildFly', 'Jboss'],
  dbms: ['PostgreSQL', 'ClickHouse', 'Greenplum'],
};

const selectedSoftware = reactive<Record<string, string>>({});
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
            :options="allowedSoftware[item.key]"
            :label="item.label"
            emit-value
            map-options
            dense
            outlined
            use-input
            fill-input
            clearable
            class="q-mt-sm"
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
