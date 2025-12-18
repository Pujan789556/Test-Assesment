const Pusher = require('pusher');

class PusherService {
  constructor() {
    const { PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER } = process.env;

    this.enabled = !!PUSHER_APP_ID && !!PUSHER_KEY && !!PUSHER_SECRET && !!PUSHER_CLUSTER;

    if (!this.enabled) {
      console.warn('Pusher is disabled!. Missing enviroment variable!');
      this.pusher = null;
      return;
    }

    this.pusher = new Pusher({
      appId: PUSHER_APP_ID,
      key: PUSHER_KEY,
      secret: PUSHER_SECRET,
      cluster: PUSHER_CLUSTER,
      useTLS: false,
    });

    console.log('Pusher initialized!');
  }

  createMessage(message) {
    if (!this.enabled) return;
    return this.pusher.trigger('message-channel', 'create-message', message);
  }

  deleteMessage(messageId) {
    if (!this.enabled) return;
    return this.pusher.trigger('message-channel', 'delete-message', messageId);
  }
}

module.exports = new PusherService();
