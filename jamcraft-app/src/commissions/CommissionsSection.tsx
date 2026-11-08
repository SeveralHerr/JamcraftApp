import { Stack } from '@mantine/core';
import { Section } from '../components/ui/Section';
import { useCommissions } from './ui/hooks/useCommissions';
import { CommissionShowcase } from './ui/components/CommissionShowcase';

export function CommissionsSection() {
  const { commissions } = useCommissions();

  return (
    <Section id="commissions" title="Commissions" subtitle="Custom games built for local businesses">
      <Stack gap="xl">
        {commissions.map((commission) => (
          <CommissionShowcase key={commission.id} commission={commission} />
        ))}
      </Stack>
    </Section>
  );
}
