export class EventCenter {
    constructor() {
        this.listeners = [];
    }

    sharedEventCenter() {
        return sharedEventCenter;
    }
}

const sharedEventCenter = new EventCenter();