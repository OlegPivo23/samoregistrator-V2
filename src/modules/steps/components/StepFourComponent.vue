<script setup lang="ts">
import { useGoToCard } from 'src/composables/useGoToCard';

interface ServerCardData {
  id: number;
  name: string;
  description: string;
  cardText: string;
}

const { goToCard } = useGoToCard();

const serverCardData: ServerCardData[] = [
  {
    id: 1,
    name: 'Первая карточка',
    description: 'Описание карточки',
    cardText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, debitis ipsum accusamus ullam repellat voluptatum tempora ducimus dolore velit culpa quo rerum temporibus, suscipit asperiores doloremque! Unde quibusdam mollitia eos.',
  },
  {
    id: 2,
    name: 'Вторая карточка',
    description: 'Описание карточки',
    cardText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, debitis ipsum accusamus ullam repellat voluptatum tempora ducimus dolore velit culpa quo rerum temporibus, suscipit asperiores doloremque! Unde quibusdam mollitia eos.',
  },
  {
    id: 3,
    name: 'Третья карточка',
    description: 'Описание карточки',
    cardText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, debitis ipsum accusamus ullam repellat voluptatum tempora ducimus dolore velit culpa quo rerum temporibus, suscipit asperiores doloremque! Unde quibusdam mollitia eos.',
  },
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <q-card
      v-for="card in serverCardData"
      :key="card.id"
      class="cursor-pointer"
      @click="goToCard('card', card.id)"
    >
      <q-card-section>
        <h6>{{ card.name }}</h6>
        <p>{{ card.description }}</p>
        <div class="mt-2">
          <p>{{ card.cardText }}</p>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
