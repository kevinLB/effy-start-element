import { LitElement, html } from 'lit-element';

export class EffyLazyElementOne extends LitElement {
  render() {
    return html`
      <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
      </style>
      <p>This is step number 1</p>
    `;
  }
}

// Register the element with the browser
customElements.define('effy-lazy-element-one', EffyLazyElementOne);
