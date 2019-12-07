import { LitElement, html } from 'lit-element';

export class EffyLazyElementTwo extends LitElement {
  render() {
    return html`
      <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
      </style>
      <p>Wow already step number 2 :)</p>
    `;
  }
}

// Register the element with the browser
customElements.define('effy-lazy-element-two', EffyLazyElementTwo);
