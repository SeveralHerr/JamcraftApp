import { Group, NavLink, Container, Flex, Image } from '@mantine/core';
import { useLocation, Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';

export function AppHeader() {
  const location = useLocation();
  const isHome = location.pathname === ROUTES.home;

  return (
    <Container fluid py="sm">
      <Flex align="center" gap="md">
        {/* Left section - Logo */}
        <div style={{ width: '200px' }}>
          <Image
            src="/assets/small_logo.png"
            alt="Jamcraft Logo"
            h={40}
            w="auto"
            fit="contain"
          />
        </div>
        
        {/* Center section - Navigation */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', width:'500px' }}>
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
        </div>

        {/* Right section - Empty space to balance layout */}
        <div style={{ width: '200px' }} />
      </Flex>
    </Container>
  );
}