import { useRouter } from 'vue-router';

export function useGoToCard() {
  const router = useRouter();

  async function goToCard(routeName: string, cardId: number) {
    if (!routeName || cardId <= 0) {
      return;
    }
    await router.push({ name: routeName, params: { id: cardId } });
  }

  return { goToCard };
}
