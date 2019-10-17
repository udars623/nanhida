export default class MapSelecter {
	constructor (hGame) {
		let divSelecter = document.getElementById("mapSelecter");
		divSelecter.innerHTML = hGame.stageList.getStageListStringForMapSelecter();
		
		let button = document.getElementById("divSelecter_confirm");
		button.addEventListener("click", event => {
			var e = document.getElementById("divSelecter_list");
			var result = e.options[e.selectedIndex].value;
			//alert("confirmed " + result);
			hGame.start(result);
		});

	}
}