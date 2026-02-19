import { describe, it, expect, vi } from 'vitest';
import deleteGravidKrav from './deleteGravidKrav';
import httpRequest from '../httpRequest';
import { Paths } from '../../config/Paths';

vi.mock('../httpRequest');

describe('deleteGravidKrav', () => {
  it('should call httpRequest with correct parameters', async () => {
    const mockResponse = { valid: true, status: 200, violations: [] };
    vi.mocked(httpRequest).mockResolvedValue(mockResponse);

    const basePath = 'http://api.example.com';
    const kravId = '123';

    await deleteGravidKrav(basePath, kravId);

    expect(httpRequest).toHaveBeenCalledWith(`${basePath}${Paths.GravidKrav}/123`, null, 'DELETE');
  });

  it('should return ValidationResponse', async () => {
    const mockResponse = { valid: true, status: 200, violations: [], data: {} };
    vi.mocked(httpRequest).mockResolvedValue(mockResponse);

    const result = await deleteGravidKrav('http://api.example.com', '123');

    expect(result).toEqual(mockResponse);
  });

  it('should handle errors from httpRequest', async () => {
    const error = new Error('Network error');
    vi.mocked(httpRequest).mockRejectedValue(error);

    await expect(deleteGravidKrav('http://api.example.com', '123')).rejects.toThrow('Network error');
  });
});
