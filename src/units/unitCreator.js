import consts from "/src/consts"
import UnitBase from "/src/unitBase";
import PKenshi from "/src/units/pKenshi";
import PRizaruto from "/src/units/pRizaruto";
import PTomato from "/src/units/pTomato";
import PBlueberry from "/src/units/pBlueberry";
import PCabbage from "/src/units/pCabbage";
import EKenshi from "/src/units/eKenshi";
import EArcher from "/src/units/eArcher";
import ECavLance from "/src/units/eCavLance";
import ECavBow from "/src/units/eCavBow";
import EDKAxe from "/src/units/eDKAxe";

/*
	When adding a new unit:
	(1) import it above
	(2) add it into this.list @ constructor. Just use [x], forget about push
	(3) update consts.js
*/
let uType = consts.unitTypes;

export default class UnitCreator {
	constructor () {
		this.list = [];
		
		this.list[uType.unitBase] = UnitBase;
		this.list[uType.pKenshi] = PKenshi;
		this.list[uType.pRizaruto] = PRizaruto;
		this.list[uType.pTomato] = PTomato;
		this.list[uType.pBlueberry] = PBlueberry;
		this.list[uType.pCabbage] = PCabbage;
		
		this.list[uType.eKenshi] = EKenshi;
		this.list[uType.eArcher] = EArcher;
		this.list[uType.eCavLance] = ECavLance;
		this.list[uType.eCavBow] = ECavBow;
		this.list[uType.eDKAxe] = EDKAxe;
	}
	
	createUnit(unitID, hGame, gridPos, isEnemy, typeID, params) {
		//alert(unitID+","+gridPos.x+","+gridPos.y+","+isEnemy+","+typeID);
		if (typeID === uType.unitBase) {
			// this should never happen after units are implemented
			let unit = new this.list[typeID](
				unitID, hGame, gridPos, isEnemy
			);
			return unit;
		}
		
		let unit = new this.list[typeID](
			 unitID, hGame, gridPos, isEnemy, params
		);
		return unit;
	}
}