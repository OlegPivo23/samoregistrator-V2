import { useRouter } from 'vue-router';

export function useGoToCard() {
  const router = useRouter();

  async function goToCard(routeName: string, cardId: number) {
    await router.push({ name: routeName, params: { id: cardId } });
  }

  return { goToCard };
}
