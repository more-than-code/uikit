import { UIView, UIViewEelement } from "../View/UIView";
import './UIPopup.scss';
import template from './UIPopup.pug';

class UIPopupEelement extends UIViewEelement {

}

const alteredName = 'el-uipopup';
customElements.define(alteredName, UIPopupEelement);
export class UIPopup extends UIView {
    constructor() {
        super();
        this.elName = alteredName;
        this.template = template;
        this.image = null;
    }

    layerDidConnect() {
        this.layer.addEventListener('click', this.didClickMaskArea.bind(this));

        const image = document.createElement('img');
        image.setAttribute('src', this.data);

        const contentWrapper =  this.layer.lastChild;
        contentWrapper.appendChild(image);
        contentWrapper.addEventListener('click', event => event.stopPropagation(), false);
    }

    didClickMaskArea() {
        this.removeFromSuperview();
    }

    setContentBody(data, type) {
        if (type == 'image') {
            // document.createElement('img');
            this.data = data;
        }
    }
    
}