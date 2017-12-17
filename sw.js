importScripts('js/cache-polyfill.js');
self.addEventListener('install', (e) => {
	let timeStamp = Date.now();
	e.waitUntil(
		caches.open('the-magic-cache').then((cache) => {
			return cache.addAll([
				`/`,
				`/index.html?timestamp=${timeStamp}`,
				`/img/manifest.json?timestamp=${timeStamp}`,
				`/dist/js/vendors.bundle.min.js?timestamp=${timeStamp}`,
				`/dist/js/app.bundle.min.js?timestamp=${timeStamp}`,
				`/dist/css/vendors.bundle.min.css?timestamp=${timeStamp}`,
				`/css/app.css?timestamp=${timeStamp}`,
				`/img/profile.jpg?timestamp=${timeStamp}`,
				`/img/profile_large.jpg?timestamp=${timeStamp}`,
				`/img/favicon.ico?timestamp=${timeStamp}`,
				`/img/portfolio/angularjs-typescript-webpack.png?timestamp=${timeStamp}`,
				`/img/portfolio/angular2-webpack.png?timestamp=${timeStamp}`,
				`/img/portfolio/angularjs-typescript-webpack.png?timestamp=${timeStamp}`,
				`/img/portfolio/backbone-requirejs.png?timestamp=${timeStamp}`,
				`/img/portfolio/ionic-facebook-auth.png?timestamp=${timeStamp}`,
				`/img/apple-icon-57x57.png?timestamp=${timeStamp}`,
				`/img/apple-icon-60x60.png?timestamp=${timeStamp}`,
				`/img/apple-icon-72x72.png?timestamp=${timeStamp}`,
				`/img/apple-icon-76x76.png?timestamp=${timeStamp}`,
				`/img/apple-icon-114x114.png?timestamp=${timeStamp}`,
				`/img/apple-icon-120x120.png?timestamp=${timeStamp}`,
				`/img/apple-icon-144x144.png?timestamp=${timeStamp}`,
				`/img/apple-icon-152x152.png?timestamp=${timeStamp}`,
				`/img/apple-icon-180x180.png?timestamp=${timeStamp}`,
				`/img/android-icon-192x192.png?timestamp=${timeStamp}`,
				`/img/favicon-32x32.png?timestamp=${timeStamp}`,
				`/img/favicon-96x96.png?timestamp=${timeStamp}`,
				`/img/favicon-16x16.png?timestamp=${timeStamp}`,
				`/img/android-icon-36x36.png?timestamp=${timeStamp}`,
				`/img/android-icon-48x48.png?timestamp=${timeStamp}`,
				`/img/android-icon-192x192.png?timestamp=${timeStamp}`,
				`/js/cache-polyfill.js?timestamp=${timeStamp}`
			])
				.then(() => self.skipWaiting());
		})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request, { ignoreSearch: true }).then(response => {
			return response || fetch(event.request);
		})
	);
});