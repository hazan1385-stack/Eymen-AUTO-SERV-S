self.addEventListener('push', function (event) {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = {
      title: 'EYMEN AUTO',
      body: event.data ? event.data.text() : 'Yeni bildirim'
    };
  }

  const title = data.title || 'EYMEN AUTO';
  const options = {
    body: data.body || 'Yeni bir randevu oluşturuldu.',
    icon: './eymen-auto-logo.png',
    badge: './eymen-auto-logo.png',
    data: {
      url: data.url || self.registration.scope
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  const url = event.notification.data?.url || self.registration.scope;

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function (clientList) {
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          return;
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
