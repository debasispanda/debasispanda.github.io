importScripts('./sw-toolbox.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.9/firebase-messaging.js');
toolbox.precache([
	'/',
	'dist/js/vendors.bundle.min.js',
	'dist/js/app.bundle.min.js',
	'dist/css/vendors.bundle.min.css',
	'css/app.css',
]);

toolbox.router.get('/(.*)', toolbox.networkFirst);
self.addEventListener('push', (event)=> {
	const title = 'Push Codelab';
	const options = {
		body: 'Yay it works.',
		icon: 'images/icon.png',
		badge: 'images/icon.png'
	};
	event.waitUntil(self.registration.showNotification(title, options));
});