import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-module.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/polymer/lib/elements/dom-if.js';

/**
 * @customElement
 * @polymer
 */
class BbvaApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <center>
        <paper-card heading="LOGIN!!" image="http://universidadean.edu.co/sites/default/files/alianzas_y_convenios/logo-bbva.png" alt="Emmental">
          <div class="card-content">
            BBVA
            <paper-input label="USER" id="user"
              autofocus>
            </paper-input>
            <paper-input label="PASS" id="pass"
              autofocus>
            </paper-input>
          </div>
          <div class="card-actions">
            <paper-button on-click="doClick">Login</paper-button>
          </div>
        </paper-card>
      </center>

      <button on-click="send">Send</button>
      
      <iron-ajax
          id="ajaxUser"
          method="POST" 
          contentType="application/json"
          url="https://artichoke.platform.bbva.com/TechArchitecture/co/grantingTicket/V02"   
          body="[[body]]"
          handle-as="json"
          last-response="saveUserCredentials"
          debounce-duration="300">
      </iron-ajax>
    `;
  }
  
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'bbva-app'
      }
    };
  }

  send() {
    debugger;
    this.user = this.$.user.value;
    this.pass = this.$.pass.value;
    this.body = {
        "authentication": {
            "userID": this.user,
            "consumerID": "10000033",
            "authenticationType": "02",
            "authenticationData": [{
                "idAuthenticationData": "password",
                "authenticationData": [this.user]
            }]
        },
        "backendUserRequest": {
            "userId": "",
            "accessCode": this.user,
            "dialogId": ""
        }
    };
    this.$.ajaxUser.generateRequest();
    console.log(this.body);
  }

  json(s) {
    debugger;
    return JSON.stringify(s, null, 2);
  }

  saveUserCredentials(e) {
    debugger;
    console.log('response', e.detail.response);
  }

}

customElements.define('bbva-app', BbvaApp);
