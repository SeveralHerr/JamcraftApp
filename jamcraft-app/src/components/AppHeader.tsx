import { Group, Space, ActionIcon,  Center, NavLink } from '@mantine/core';
import { IconBrandBluesky , IconBrandLinkedinFilled, IconBrandYoutubeFilled,IconBrandSteamFilled,IconBrandGithubFilled    } from '@tabler/icons-react';

import classes from './css/AppHeader.module.css';


export function AppHeader() {


  return (
    
    <header className={classes.header}>
      <div className={classes.inner}>
      <Center>
          <Group ml='lg' gap={30} visibleFrom="sm" >

          </Group>
        </Center>
  
        <Center>
          <Group ml='400' gap={30} visibleFrom="sm" wrap="nowrap"> 
              <NavLink href="/about" label="about" />
              <NavLink href="/games" label="games" />
            </Group>
          </Center>
        <Group gap="xs" justify="flex-end" wrap="nowrap">


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
        </Group>
      </div>
    </header>
  );
}