import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { EnvironmentType } from './config/environment';

// Mock react-dom/client
const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({ render: mockRender }));

vi.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot
}));

// Mock App component
vi.mock('./App', () => ({
  default: () => 'MockedApp'
}));

// Mock CSS imports
vi.mock('@navikt/virksomhetsvelger/dist/assets/style.css', () => ({}));
vi.mock('@navikt/ds-css', () => ({}));

// Mock Faro
const mockInitializeFaro = vi.fn();
const mockGetWebInstrumentations = vi.fn(() => []);
const mockTracingInstrumentation = vi.fn();

vi.mock('@grafana/faro-web-sdk', () => ({
  getWebInstrumentations: mockGetWebInstrumentations,
  initializeFaro: mockInitializeFaro
}));

vi.mock('@grafana/faro-web-tracing', () => ({
  TracingInstrumentation: mockTracingInstrumentation
}));

vi.mock('./nais.js', () => ({
  default: {
    telemetryCollectorURL: 'https://telemetry.test.nav.no',
    app: { name: 'fritak-agp', version: '1.0.0' }
  }
}));

describe('index.tsx', () => {
  let mockEnv: { environmentMode: EnvironmentType };

  beforeEach(() => {
    vi.resetModules();
    mockRender.mockClear();
    mockCreateRoot.mockClear();
    mockInitializeFaro.mockClear();
    mockGetWebInstrumentations.mockClear();
    mockTracingInstrumentation.mockClear();

    // Setup DOM
    document.body.innerHTML = '<div id="root"></div>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render App component to root element', async () => {
    // Mock local environment to avoid Faro initialization
    mockEnv = { environmentMode: EnvironmentType.LOCAL };
    vi.doMock('./config/environment', () => ({
      default: mockEnv,
      EnvironmentType
    }));

    // Import index to trigger rendering
    await import('./index');

    expect(mockCreateRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(mockRender).toHaveBeenCalled();
  });

  it('should not initialize Faro in LOCAL environment', async () => {
    mockEnv = { environmentMode: EnvironmentType.LOCAL };
    vi.doMock('./config/environment', () => ({
      default: mockEnv,
      EnvironmentType
    }));

    await import('./index');

    // Wait for any potential async operations
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(mockInitializeFaro).not.toHaveBeenCalled();
  });

  it('should initialize Faro in PROD environment', async () => {
    mockEnv = { environmentMode: EnvironmentType.PROD };
    vi.doMock('./config/environment', () => ({
      default: mockEnv,
      EnvironmentType
    }));

    await import('./index');

    // Wait for the lazy-loaded Faro to initialize
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(mockInitializeFaro).toHaveBeenCalledWith({
      url: 'https://telemetry.test.nav.no',
      app: { name: 'fritak-agp', version: '1.0.0' },
      instrumentations: expect.any(Array)
    });
  });

  it('should initialize Faro in PREPROD_DEV environment', async () => {
    mockEnv = { environmentMode: EnvironmentType.PREPROD_DEV };
    vi.doMock('./config/environment', () => ({
      default: mockEnv,
      EnvironmentType
    }));

    await import('./index');

    // Wait for the lazy-loaded Faro to initialize
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(mockInitializeFaro).toHaveBeenCalled();
  });

  it('should include TracingInstrumentation in Faro instrumentations', async () => {
    mockEnv = { environmentMode: EnvironmentType.PROD };
    vi.doMock('./config/environment', () => ({
      default: mockEnv,
      EnvironmentType
    }));

    await import('./index');

    // Wait for the lazy-loaded Faro to initialize
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(mockGetWebInstrumentations).toHaveBeenCalled();
    expect(mockTracingInstrumentation).toHaveBeenCalled();
  });

  it('should log error when Faro initialization fails', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('Failed to load Faro');

    // Mock faro-web-sdk to reject when imported
    vi.doMock('@grafana/faro-web-sdk', () => {
      return Promise.reject(mockError);
    });

    mockEnv = { environmentMode: EnvironmentType.PROD };
    vi.doMock('./config/environment', () => ({
      default: mockEnv,
      EnvironmentType
    }));

    await import('./index');

    // Wait for the promise rejection to be caught
    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to initialize Faro telemetry:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});
