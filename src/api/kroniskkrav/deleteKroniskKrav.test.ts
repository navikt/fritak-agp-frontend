import { describe, it, expect, vi, beforeEach } from 'vitest';
import deleteKroniskKrav from './deleteKroniskKrav';
import httpRequest from '../httpRequest';
import { Paths } from '../../config/Paths';
import { ValidationResponse } from '../../state/validation/ValidationResponse';
import KroniskKravResponse from '../gravidkrav/KroniskKravResponse';

vi.mock('../httpRequest');

describe('deleteKroniskKrav', () => {
  const basePath = 'http://api.example.com';
  const kravId = '12345';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call httpRequest with correct parameters', async () => {
    const mockResponse: ValidationResponse<KroniskKravResponse> = {} as ValidationResponse<KroniskKravResponse>;

    vi.mocked(httpRequest).mockResolvedValue(mockResponse);

    const result = await deleteKroniskKrav(basePath, kravId);

    expect(httpRequest).toHaveBeenCalledWith(`${basePath}${Paths.KroniskKravSlett}/${kravId}`, null, 'DELETE');
    expect(result).toEqual(mockResponse);
  });

  it('should return validation response on success', async () => {
    const mockResponse: ValidationResponse<KroniskKravResponse> = {} as ValidationResponse<KroniskKravResponse>;

    vi.mocked(httpRequest).mockResolvedValue(mockResponse);

    const result = await deleteKroniskKrav(basePath, kravId);

    expect(result).toEqual(mockResponse);
  });

  it('should handle promise rejection', async () => {
    const error = new Error('Delete failed');
    vi.mocked(httpRequest).mockRejectedValue(error);

    await expect(deleteKroniskKrav(basePath, kravId)).rejects.toThrow('Delete failed');
  });
});
