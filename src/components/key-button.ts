
@customElement("key-button")
export class KeyButton extends LitElement {
  static styles = css`
    .wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 0.5rem;
      background: beige;
      font-size: 1.5rem;
      border: 1px solid black;

      &:hover {
        position: relative;
        .key-hidden {
          opacity: 1;
        }
      }
    }
    .key-hidden {
      opacity: 0;
      transition: all 50ms ease-in-out;
      border-radius: 0.5rem;
      position: absolute;
      text-align: center;
      bottom: calc(100% + 1rem);
      left: -50%;
      width: 400%;
      height: 100%;
      background: snow;
      padding: 1rem;
      color: navy;
      font-size: 1.5rem;
    }
  `;

  @property() heigth = 30;
  @property() width = 30;
  @property() value = "";
  @property() key = "";
  render() {
    return html`<div class="wrapper">
      <div class="key-hidden">${this.value}</div>
      <div>${this.key}</div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "key-button": KeyButton;
  }
}
