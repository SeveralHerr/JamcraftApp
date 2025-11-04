import { Image, Text, Group } from "@mantine/core";
import { Card as UnifiedCard } from "../ui/Card";
import { colors, typography } from "../../theme";

interface BaseCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export function BaseCard({
  imageSrc,
  imageAlt,
  title,
  description,
  onClick,
}: BaseCardProps) {
  return (
    <UnifiedCard
      onClick={onClick}
      style={{
        width: '100%',
        maxWidth: 300,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <Image
          src={imageSrc}
          radius="md"
          h="auto"
          mah={300}
          fit="contain"
          alt={imageAlt}
          style={{
            width: '100%',
          }}
        />
      </div>

      <Group justify="space-between" mb="xs">
        <Text
          fw={typography.fontWeight.medium}
          c={colors.brand.primary}
          style={{
            fontSize: typography.fontSize.lg,
          }}
        >
          {title}
        </Text>
      </Group>

      <Text
        size="sm"
        c={colors.text.tertiary}
        ta="left"
        lineClamp={12}
        style={{
          lineHeight: typography.lineHeight.relaxed,
        }}
      >
        {description}
      </Text>
    </UnifiedCard>
  );
}
