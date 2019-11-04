export default class MapSelecter {
	constructor (hGame) {
		let divSelecter = document.getElementById("mapSelecter");
		divSelecter.innerHTML = hGame.stageList.getStageListStringForMapSelecter();
		
		let button = document.getElementById("divMapSelecter_confirm");
		button.addEventListener("click", event => {
			let e = document.getElementById("divMapSelecter_list");
			let result = e.options[e.selectedIndex].value;
			//alert("confirmed " + result);
			hGame.start(result);
		});

	}
}