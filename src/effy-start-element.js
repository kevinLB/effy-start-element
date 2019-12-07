/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */


// Import LitElement base class and html helper function
import { LitElement, html } from 'lit-element';

export class EffyStartElement extends LitElement {
  /**
   * Define properties. Properties defined here will be automatically
   * observed.
   */
  static get properties() {
    return {
      message: { type: String },
      loadedSteps: {type: Object},
      step: { type: Number }
    };
  }

  /**
   * In the element constructor, assign default property values.
   */
  constructor() {
    // Must call superconstructor first.
    super();

    // Initialize properties
    this.message = 'Hello World from LitElement';
    this.loadedSteps = {};
    this.step = 0;
    this.nbSteps = 2;
    this.tagNameByStep = {
      1: 'effy-lazy-element-one',
      2: 'effy-lazy-element-two'
    };
  }

  /**
   * Define a template for the new element by implementing LitElement's
   * `render` function. `render` must return a lit-html TemplateResult.
   */
  render() {
    return html`
      <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
        .main-block {
          margin: 20px auto;
        }
      </style>

      <h1>Start Effy LitElement!</h1>
      <p>${this.message}</p>
      <div class="main-block">
        <input type="text" name="firstname" id="firstname" placeholder="Prénom" />
      </div>

      <button name="prev" id="prev"
        ?hidden=${!this.step}
        @click="${this.loadPrev}">Page précedente</button>
      <button name="next" id="next"
        ?hidden=${this.step >= this.nbSteps}
        @click="${this.loadNext}">Page suivante</button>

      <div class="step-container">
        ${this.step === 1 && this.loadedSteps[this.step] ? html`<effy-lazy-element-one></effy-lazy-element-one>` : html``}
        ${this.step === 2 && this.loadedSteps[this.step] ? html`<effy-lazy-element-two></effy-lazy-element-two>` : html``}
      </div>
    `;
  }

  /**
   * Implement firstUpdated to perform one-time work on first update
   */
  firstUpdated() {
    const myInput = this.shadowRoot.getElementById('firstname');
    myInput.focus();
  }

  loadPrev(e) {
    this.step--;
    this.loadLazy();
  }

  loadNext(e) {
    this.step++;
    this.loadLazy();
  }

  /**
   * If we need the lazy element && it hasn't already been loaded,
   * load it and remember that we loaded it.
   */
  async loadLazy() {
    console.log('loadLazy');
    if(this.step && !this.loadedSteps.hasOwnProperty(this.step)) {
      return import(`./steps/${this.tagNameByStep[this.step]}.js`).then((LazyElement) => {
        this.loadedSteps = Object.assign({}, this.loadedSteps, {[this.step]: true});
        console.log("LazyElement loaded");
      }).catch((reason) => {
        this.loadedSteps = Object.assign({}, this.loadedSteps, {[this.step]: false});
        console.log("LazyElement failed to load", reason);
      });
    }
  }
}

// Register the element with the browser
customElements.define('effy-start-element', EffyStartElement);
