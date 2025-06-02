// components/ErrorBoundary.jsx
import { ErrorBoundary as SentryErrorBoundary } from '@sentry/react';

const FallbackComponent = ({ error, componentStack, resetError }) => (
  <div style={{
    padding: '1rem',
    border: '2px solid red',
    borderRadius: '8px',
    backgroundColor: '#ffe6e6',
    color: '#a00',
    margin: '1rem 0',
  }}>
    <h2>🚨 오류가 발생했어요</h2>
    <p>{error.message}</p>
    <details style={{ whiteSpace: 'pre-wrap' }}>
      {componentStack}
    </details>
    <button onClick={resetError} style={{ marginTop: '1rem', background: '#a00', color: '#fff', padding: '0.5rem 1rem' }}>
      다시 시도
    </button>
  </div>
);

export const ErrorBoundary = ({ children }) => (
  <SentryErrorBoundary fallback={FallbackComponent}>
    {children}
  </SentryErrorBoundary>
);
