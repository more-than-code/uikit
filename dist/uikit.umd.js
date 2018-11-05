(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.uikit = {})));
}(this, (function (exports) { 'use strict';

    class UIViewEelement extends HTMLElement {
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

    class UIView extends Object {
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

    class UIViewController {
        constructor() {
            this.view = new UIView();
            this.view.refController = this;
        }

        viewDidController() {

        }
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css = "el-uiwindow {\n  display: block;\n  height: 100%;\n  width: 100%;\n  background-color: black; }\n";
    styleInject(css);

    class UIWindowEelement extends HTMLElement {

    }

    const alteredName$1 = 'el-uiwindow';
    customElements.define(alteredName$1, UIWindowEelement);

    class UIWindow extends UIView {
        constructor() {
            super(alteredName$1);
            this.window = this;
        }
    }

    let shareApplication = null;

    class UIApplication {
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

    var css$1 = "el-uipopup {\n  position: fixed;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: grid;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  z-index: 1; }\n\n.modal-dimiss {\n  color: white;\n  font-size: 2rem;\n  font-weight: bold;\n  position: absolute;\n  right: 2vw;\n  top: 2vw; }\n\n.modal-content-wrapper {\n  background-color: #fefefe;\n  margin: auto;\n  padding: 20px;\n  border: 1px solid #888;\n  max-width: 80%;\n  max-height: 80%;\n  overflow: auto;\n  box-shadow: 0.5rem 0.5rem 0.5rem black; }\n";
    styleInject(css$1);

    // import template from './UIPopup.pug';

    class UIPopupEelement extends UIViewEelement {

    }

    const alteredName$2 = 'el-uipopup';
    customElements.define(alteredName$2, UIPopupEelement);
    class UIPopup extends UIView {
        constructor() {
            super();
            this.elName = alteredName$2;
            this.template = `div(class='modal-dimiss') &#x2715;
        div(class='modal-content-wrapper')`;
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

    exports.UIViewController = UIViewController;
    exports.UIWindow = UIWindow;
    exports.UIViewEelement = UIViewEelement;
    exports.UIView = UIView;
    exports.UIApplication = UIApplication;
    exports.UIPopup = UIPopup;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
