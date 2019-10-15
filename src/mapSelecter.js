export default class MapSelecter {
	constructor (hGame) {
		let divSelecter = document.getElementById("mapSelecter");

		divSelecter.innerHTML = `
		Map:
		<select id="divSelecter_list">
			<option value="00">Stage 00</option>
			<option value="01" selected>Stage 01</option>
		</select>
		<button id="divSelecter_confirm">Confirm</button>
		`;
		
		let button = document.getElementById("divSelecter_confirm");
		button.addEventListener("click", event => {
			var e = document.getElementById("divSelecter_list");
			var result = e.options[e.selectedIndex].value;
			//alert("confirmed");
			hGame.start(result);
		});

	}
}