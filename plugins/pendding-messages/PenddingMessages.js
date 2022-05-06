import EventEmitter from 'eventemitter3';
import GetValue from '../utils/object/GetValue.js'

class PenddingMessages extends EventEmitter {
    constructor() {
        super();
        this.messages = [];
        this.isPopping = false;
    }

    toJSON() {
        return {
            messages: this.messages
        }
    }

    resetFromJSON(config) {
        this.messages = GetValue(config, 'messages', []);
        return this;
    }

    get length() {
        return this.messages.length;
    }

    get isEmpty() {
        return (this.messages.length === 0);
    }

    push(message) {
        this.messages.push(message);
        this.emit('push', message, this.messages);
        this.emit('update', this.messages);
        return this;
    }

    async pop(callback, scope) {
        if (this.isEmpty) {
            return false;
        }

        if (callback) {
            this.isPopping = true;
            // Async callback, to run (model dialog) task
            var message = this.messages[0];
            var result = await callback.call(scope, message, this.messages);
            // Remove popped message if result is true
            if (result) {
                this.messages.shift();
                this.emit('pop', message, this.messages);
                this.emit('update', this.messages);
            }
            this.isPopping = false;
            return result;
        } else { // No callback, just pop message
            var message = this.messages.shift();
            this.emit('pop', message, this.messages);
            this.emit('update', this.messages);
            return message;
        }
    }

    async popAll(callback, scope) {
        if (callback) {
            var result = false;
            while (!this.isEmpty) {
                var result = await this.pop(callback, scope);
                if (!result) {
                    break;
                }
            }
            return result;
        } else {
            while (!this.isEmpty) {
                this.pop();
            }
            return true;
        }
    }
}

export default PenddingMessages;