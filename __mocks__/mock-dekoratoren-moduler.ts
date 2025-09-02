import { vi } from 'vitest';

// Mock Next navigation early (no real module import)
const router = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() };
vi.mock('next/navigation', () => ({
  useRouter: () => router,
  usePathname: () => '/',
  useSearchParams: () => ({ get: () => null, toString: () => '' }),
  __mockedRouter: router
}));

// Mock NAV dekoratør so it doesn't touch window/timers in tests
vi.mock('@navikt/nav-dekoratoren-moduler', () => ({
  __esModule: true,
  init: vi.fn(() => ({ on: vi.fn(), setParams: vi.fn() })),
  decoratorParamsFromEnv: vi.fn(() => ({}) as any),
  fetchDecoratorHtml: vi.fn(async () => ({ headTags: '', body: '', footer: '', scripts: '' })),
  logAmplitudeEvent: vi.fn(() => Promise.resolve()),
  trackEvent: vi.fn(),
  withNavContext: (component: any) => component,
  setBreadcrumbs: vi.fn()
}));

// Optional: mock next/head to avoid DOM access
vi.mock('next/head', () => ({ __esModule: true, default: ({ children }: any) => children ?? null }));
