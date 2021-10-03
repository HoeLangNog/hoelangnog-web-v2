// @ts-ignore
import {customElement, property} from "lit/decorators";
// @ts-ignore
import {css, html, LitElement} from "lit";

@customElement("hln-location")
export class LocationElement extends LitElement {
  static styles = css`
    :host {
      display: grid;
      align-items: center;

      margin: 10px;

      border: #5a5a5a solid 1px;
      border-radius: 15px;
    }
    h2 {
      padding-right: 10px;
      margin-left: 10px;
      line-height: 10px;
      font-size: 20px;
      color: white;
      font-family: "Noto Sans Display", sans-serif;
    }
  `

  @property()
  name?: string = "Lokaal"

  render() {
    return html`
        <h2>${this.name}</h2>
    `
  }
}
