//paso 3 propiedades y expresiones
import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  //propiedad
  @property()
  message: string = 'Hello again.';

  render() {
    //agrega
    return html`
      <p>${this.message}</p>
    `;
  }
}
