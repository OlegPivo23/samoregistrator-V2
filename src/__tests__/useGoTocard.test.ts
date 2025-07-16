import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGoToCard } from 'src/composables/useGoToCard';

const mockPush = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('useGoToCard', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('должен вызвать router.push с правильным routeName и cardId', async () => {
    const { goToCard } = useGoToCard();

    const routeName = 'CardDetails';
    const cardId = 123;

    await goToCard(routeName, cardId);

    expect(mockPush).toHaveBeenCalledWith({
      name: routeName,
      params: { id: cardId },
    });
  });

  it('не должен вызывать router.push если аргументы неверны', async () => {
    const { goToCard } = useGoToCard();
    await goToCard('', 0);
    expect(mockPush).not.toHaveBeenCalled();
  });
});
