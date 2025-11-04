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
        height: '100%',
        minHeight: 480,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <Image
          src={imageSrc}
          radius="md"
          h={200}
          fit="cover"
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
        lineClamp={6}
        style={{
          lineHeight: typography.lineHeight.relaxed,
          flex: 1,
        }}
      >
        {description}
      </Text>
    </UnifiedCard>
  );
}
