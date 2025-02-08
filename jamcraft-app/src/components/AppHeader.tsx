import { Group, NavLink, Space, Container, Flex, Image } from '@mantine/core';
import { useLocation, Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';

export function AppHeader() {
  const location = useLocation();
  const isHome = location.pathname === ROUTES.home;

  return (
    <Container fluid py="sm">
      <Flex align="center" justify="space-between">
        
        <Image
          src="/assets/small_logo.png"
          alt="Jamcraft Logo"
          h={40}
          w="auto"
          fit="contain"
        />
        <Space w="md" />
        {/* Centered Links */}
        <Group gap={"md"} wrap="nowrap">
          <NavLink 
            component={Link}
            to={ROUTES.home}
            label="Home" 
            active={isHome}
          />
          <NavLink 
            component={Link}
            to={ROUTES.about}
            label="About" 
            active={location.pathname === ROUTES.about}
          />
          <NavLink 
            component={Link}
            to="/games" 
            label="Games" 
            active={location.pathname === '/games'}
          />
        </Group>



        {/* Right-Aligned Links

        <Group gap="sm" wrap="nowrap" w={240} justify="flex-end">
          <ActionIcon size="lg" variant="light" radius="xl" color="white">
            <IconBrandLinkedinFilled size={36} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="light" radius="xl" color="white">
            <IconBrandYoutubeFilled size={36} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="light" radius="xl" color="white">
            <IconBrandBluesky size={36} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="light" radius="xl" color="white">
            <IconBrandSteamFilled size={36} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="light" radius="xl" color="white">
            <IconBrandGithubFilled size={36} stroke={1.5} />
          </ActionIcon>
        </Group>
  */}
      </Flex>
    </Container>
  );
}