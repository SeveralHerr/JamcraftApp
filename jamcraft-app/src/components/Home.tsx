
import { Divider, Table } from '@mantine/core';
import { DiscordCard } from './DiscordCard';
import { ItchCard } from './ItchCard';
import { MinecraftCard } from './MinecraftCard';

export function Home() {

  return (
    <>
      <img src="/assets/jamcraft.png" alt="Jamcraft Logo" />
      <Divider my="md" />
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td  >
                <DiscordCard ></DiscordCard>
              </Table.Td>
              <Table.Td>
                <ItchCard></ItchCard>
              </Table.Td>
              <Table.Td>
                <MinecraftCard></MinecraftCard>
              </Table.Td>
            </Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  );
}