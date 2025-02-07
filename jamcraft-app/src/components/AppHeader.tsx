import { Group, Space, ActionIcon } from '@mantine/core';
import { IconBrandBluesky , IconBrandLinkedinFilled, IconBrandYoutubeFilled,IconBrandSteamFilled,IconBrandGithubFilled    } from '@tabler/icons-react';

import classes from './css/AppHeader.module.css';

const links = [
  { link: '/about', label: 'about' },
  { link: '/games', label: 'games' },
];

export function AppHeader() {
  //const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    
    <header className={classes.header}>
      <div className={classes.inner}>

  
          <Group ml='lg' gap={54}visibleFrom="sm" justify='flex-end' >

          </Group>
          

        <Group gap="xs" justify="flex-end" wrap="nowrap">
        <Group ml='lg' gap={30} className={classes.links} visibleFrom="sm" justify='flex-end' >
            {items}
          </Group>
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <ActionIcon size="lg" variant="light" radius="xl"color="white">
            <IconBrandLinkedinFilled size={36} stroke={1.5} />
          </ActionIcon>
          <Space w="lg" />
          <ActionIcon size="lg" variant="light" radius="xl" color="white">
            <IconBrandYoutubeFilled  size={36} stroke={1.5} />
          </ActionIcon>
          <Space w="lg" />
          <ActionIcon size="lg" variant="light" radius="xl"color="white">
            <IconBrandBluesky  size={36} stroke={1.5} />
          </ActionIcon>
          <Space w="lg" />
          <ActionIcon size="lg" variant="light" radius="xl"color="white">
            <IconBrandSteamFilled   size={36} stroke={1.5} />
          </ActionIcon>
          <Space w="lg" />
          <ActionIcon size="lg" variant="light" radius="xl"color="white">
            <IconBrandGithubFilled    size={36} stroke={1.5} />
          </ActionIcon>
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
        </Group>
      </div>
    </header>
  );
}