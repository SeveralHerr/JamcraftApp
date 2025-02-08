import { Group, ActionIcon, NavLink, Space, Container, Flex } from '@mantine/core';
import { IconBrandBluesky , IconBrandLinkedinFilled, IconBrandYoutubeFilled,IconBrandSteamFilled,IconBrandGithubFilled    } from '@tabler/icons-react';




export function AppHeader() {


  return (
    // <header className={classes.header}>
    //   <div className={classes.inner}>
    
    <Container fluid py="sm">
      <Flex align="center" justify="space-between"  >
        
        {/* Invisible spacer to balance layout */}
        <div style={{ width: "355px" }}></div> 

        {/* Centered Links */}
        <Group gap={"md"} wrap="nowrap">

                   <NavLink href="/about" label="about" />
                   <NavLink href="/games" label="games" />

        </Group>

        {/* Right-Aligned Links */}
        <Group gap="md" wrap="nowrap">
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
        </Group>
      </Flex>
    </Container>

    
    // <header className={classes.header}>
    //   <div className={classes.inner}>
     
    

  
    //     {/* <Center>
    //       <Group  gap={30}  wrap="nowrap"> 
    //           <NavLink href="/about" label="about" />
    //           <NavLink href="/games" label="games" />
     
    //         </Group>
   
    //     </Center>
    //       <Space w={30}/> */}
    //     <Group gap="xs" justify="flex-end" wrap="nowrap" align="center">


    //       <ActionIcon size="lg" variant="light" radius="xl"color="white">
    //         <IconBrandLinkedinFilled size={36} stroke={1.5} />
    //       </ActionIcon>
    //       <Space w="lg" />
    //       <ActionIcon size="lg" variant="light" radius="xl" color="white">
    //         <IconBrandYoutubeFilled  size={36} stroke={1.5} />
    //       </ActionIcon>
    //       <Space w="lg" />
    //       <ActionIcon size="lg" variant="light" radius="xl"color="white">
    //         <IconBrandBluesky  size={36} stroke={1.5} />
    //       </ActionIcon>
    //       <Space w="lg" />
    //       <ActionIcon size="lg" variant="light" radius="xl"color="white">
    //         <IconBrandSteamFilled   size={36} stroke={1.5} />
    //       </ActionIcon>
    //       <Space w="lg" />
    //       <ActionIcon size="lg" variant="light" radius="xl"color="white">
    //         <IconBrandGithubFilled    size={36} stroke={1.5} />
    //       </ActionIcon>
    //       <Space w="lg" />

    //       <Space w="lg" />
    //     </Group>
    //   </div>
    // </header>
  );
}