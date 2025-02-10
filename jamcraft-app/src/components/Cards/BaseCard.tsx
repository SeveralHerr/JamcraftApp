import { Card, Image, Text, Group } from "@mantine/core";
import styles from "./BaseCard.module.css";

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
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w="100%"
      maw={300}
      className={styles.card}
      onClick={onClick}
    >
      <Card.Section >
        <Image
          className={styles.image}
          src={imageSrc}
          radius="md"
          h="100%"
          w="100%"
          maw={300}
          mah={300}
          fit="contain"
          alt={imageAlt}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} c="#00abf0">
          {title}
        </Text>
      </Group>

      <Text size="sm" c="gray.4" ta="left" lineClamp={12}>
        {description}
      </Text>
    </Card>
  );
}
