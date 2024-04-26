import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ReactQueryProvider } from '@/shared/lib/query/QueryProvider';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ThemeProvider } from '@/shared/lib';
import { IpProvider } from '@/shared/lib/ip/IpProvider';

const Spinner = () => <div>Spinner...</div>;

const Error = ({ error }: FallbackProps) => (
  <div>
    <h1>Application Error</h1>
    <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
  </div>
);

const App = () => (
  <Suspense fallback={<Spinner />}>
    <ErrorBoundary FallbackComponent={Error}>
      <ThemeProvider>
        <ReactQueryProvider>
          <IpProvider>
            <RouterProvider router={router} />
          </IpProvider>
        </ReactQueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </Suspense>
);

export default App;
