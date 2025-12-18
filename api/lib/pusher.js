const Pusher = require('pusher');

class PusherService {
  constructor() {
    this.pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
      useTLS: false,
    });
  }

  createMessage(message) {
    return this.pusher.trigger('message-channel', 'create-message', message);
  }

  deleteMessage(messageId) {
    return this.pusher.trigger('message-channel', 'delete-message', messageId);
  }
}

module.exports = new PusherService();
