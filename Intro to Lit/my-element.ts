import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

//definiendo un componente
@customElement('my-element')
export class MyElement extends LitElement {
  //metodo que pertenece a la clase
  render() {
    return html`
      <p>Hello world! From my-element.</p>
    `;
  }
}
