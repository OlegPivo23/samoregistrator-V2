// composables/useSoftwareValidation.ts
import { watch } from 'vue';

export function useSoftwareValidation(
  selected: Record<string, string>,
  violations: Record<string, string>,
) {
  const blacklistedSoftware: string[] = [
    'Microsoft Windows',
    'Microsoft SQL Server',
    'Oracle Database',
    'SAP HANA',
    'IBM WebSphere Application Server',
  ];

  watch(
    selected,
    () => {
      Object.entries(selected).forEach(([key, value]) => {
        const normalized = (value || '').toLowerCase().trim();
        const isBlacklisted = blacklistedSoftware.some(
          (bad) => normalized === bad.toLowerCase().trim(),
        );

        if (isBlacklisted) {
          violations[key] = `Вы выбрали запрещённое ПО: ${value}`;
        } else {
          delete violations[key];
        }
      });
    },
    { deep: true },
  );

  return {
    isBlacklisted: (value: string) => {
      const normalized = (value || '').toLowerCase().trim();
      return blacklistedSoftware.some((bad) => normalized === bad.toLowerCase().trim());
    },
  };
}
