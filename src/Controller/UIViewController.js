import {UIView} from '../view/UIView';

export class UIViewController {
    constructor() {
        this.view = new UIView();
        this.view.refController = this;
    }

    viewDidController() {

    }
}