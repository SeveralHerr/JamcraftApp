import { describe, it, expect } from 'vitest';
import { GetCommunityChannels } from './GetCommunityChannels';

describe('GetCommunityChannels', () => {
  it('should return only active channels', () => {
    const useCase = new GetCommunityChannels();
    const result = useCase.execute();

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(channel => channel.isActive)).toBe(true);
  });

  it('should return channels with required properties', () => {
    const useCase = new GetCommunityChannels();
    const [firstChannel] = useCase.execute();

    expect(firstChannel).toHaveProperty('id');
    expect(firstChannel).toHaveProperty('name');
    expect(firstChannel).toHaveProperty('type');
    expect(firstChannel).toHaveProperty('description');
    expect(firstChannel).toHaveProperty('externalUrl');
    expect(firstChannel).toHaveProperty('isActive');
  });

  it('should return consistent data on multiple calls', () => {
    const useCase = new GetCommunityChannels();
    const result1 = useCase.execute();
    const result2 = useCase.execute();

    expect(result1).toEqual(result2);
  });

  it('should filter out inactive channels', () => {
    const useCase = new GetCommunityChannels();
    const result = useCase.execute();

    const inactiveChannels = result.filter(channel => !channel.isActive);
    expect(inactiveChannels).toHaveLength(0);
  });
});
