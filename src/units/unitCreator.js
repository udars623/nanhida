import consts from "/src/consts"
import UnitBase from "/src/unitBase";
import PKenshi from "/src/units/pKenshi";
import EKenshi from "/src/units/eKenshi";

/*
	When adding a new unit:
	(1) import it above
	(2) add it into this.list @ constructor. Just use [x], forget about push
	(3) update consts.js
*/
let uType = consts.unitTypes;

export default class UnitCreator {
	constructor () {
		this.list = [60];
		
		this.list[uType.unitBase] = UnitBase;
		this.list[uType.pKenshi] = PKenshi;
		this.list[uType.eKenshi] = EKenshi;
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