class WebOSKeyboardCard extends HTMLElement {
  setConfig(config) {

    this.config = config;
    if (!config.target || typeof this.config.target !== "string") {
      throw new Error('You need to define a target');
    }
    this.render();
  }

  render() {
    if (!this.content) {
      this.card = document.createElement('ha-card');
      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';
      this.card.appendChild(this.content);
      this.appendChild(this.card);
    }
    this.card.header = this.config.title || "Type to TV";
    let label = this.config.label || "Text to type"
    this.content.innerHTML = `
      <div style="display: flex">
        <paper-input style="flex-grow: 1" label="${label}">
        </paper-input>
      </div>
    `;
    this.content.querySelector("paper-input").addEventListener("change", this.send.bind(this), false);
  }

  send(){
    let txt = this.content.querySelector("paper-input").value;
    this.hass.callService("webostv", "command", {
		entity_id: this.config.target,
		command: "com.webos.service.ime/insertText",
		payload: {
			text: txt,
			replace: true,
		},
		});
  }
}

customElements.define('webos-keyboard-card', WebOSKeyboardCard);
