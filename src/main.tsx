import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import App from './App';
import i18n from './i18n';
import store from './store';

const rootContainer = document.getElementById('root');
if (!rootContainer) {
  throw new Error("Failed to find the root element. Make sure it exists in index.html");
}
const root = createRoot(rootContainer);
const queryClient = new QueryClient();

root.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </I18nextProvider>
);
