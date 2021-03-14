import { Provider } from 'react-redux';
import Router from 'next/router';
import NProgress from 'nprogress';

import 'tailwindcss/tailwind.css';
import '../styles/utils.css';

import Layout from '../components/layout/Layout';
import store from '../store';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps, tagStyles }) {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
