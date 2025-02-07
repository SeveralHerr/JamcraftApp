
import { Divider, Table } from '@mantine/core';
import { DiscordCard } from './DiscordCard';

export function Home() {

  return (
    <>
      <img src="./public/assets/jamcraft.png" alt="Jamcraft Logo" />
      <Divider my="md" />
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <DiscordCard></DiscordCard>
              </Table.Td>
              <Table.Td>
                <DiscordCard></DiscordCard>
              </Table.Td>
              <Table.Td>
                <DiscordCard></DiscordCard>
              </Table.Td>
            </Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  );
}