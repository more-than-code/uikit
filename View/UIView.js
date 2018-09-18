export class UIViewEelement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // console.log('UIViewEelement connectedCallback === ', this);
        if (this.view) {
            if (this.view.hasOwnProperty('refController')) {
                this.view.refController.viewDidLoad();
            }

            this.view.layerDidConnect();
        }
    }
}

const alteredName = 'el-uiview';
customElements.define(alteredName, UIViewEelement);

export class UIView extends Object {
    constructor(elName, template) {
        super();
        
        // console.log(`${this.constructor.name} is constructed`);

        this.window = null;
        this.elName = elName;
        this.template = template;
        this.layer = null;
        this.superview = null;

        setTimeout(() => {
            this.render();
        }, 0);
    }

    render() {
        this.layer = document.createElement(this.elName || alteredName);
        this.layer.view = this;

        if (this.template) {
            this.layer.innerHTML = this.template;
        }
        
        // console.log('render layer ==== ', this.layer);
    }

    layerDidConnect() {

    }

    addSubview(view) {
        setTimeout((() => {
            // console.log('addSubview === ', this);
            view.window = this.window;
            view.superview = this;
            this.layer.appendChild(view.layer);
        }), 0);
    }

    removeFromSuperview() {
        this.superview.layer.removeChild(this.layer);
    }

    getElementById(id) {
        return document.getElementById(id);
    }

    appendToElement(el) {
        setTimeout(() => {
            el.appendChild(this.layer);
        }, 0);
    }
}