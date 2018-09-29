import {
    UIWindow
} from "../view/UIWindow";

let shareApplication = null;

export class UIApplication {
    constructor() {
        if (shareApplication) {
            throw new Error('An UIApplication instance already exists');
        }

        shareApplication = this;

        this.window = new UIWindow();

        setTimeout(() => {
            document.body.appendChild(this.window.layer);
        }, 0);
    }

    get shareApplication() {
        return shareApplication;
    }
}