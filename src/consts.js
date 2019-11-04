const consts = {
    terrainTypes: {
        Nrm: 0, // normal
        Mnt: 1, // mountain
        Wtr: 2, // water
        Wll: 3 // wall
    },
    buttons: {
        TurnEnd: 0,
        Wait: 1,
		Threat: 2,
		Barrier: 3,
    },
    gameResult: {
        None: 0,
        Win: 1,
        Lose: 2,
		GameEnded: 3
    },
	moveTypes: {
		infantry: 0,
		cavalry: 1,
		flyer: 2
	},
	unitTypes: {
		unitBase: 0,
		
		pRizaruto: 1,
		pTomato: 2,
		pBlueberry: 3,
		pCabbage: 4,
		pKenshi: 5,
		
		eKenshi: 11,
		eArcher: 12,
		eCavLance: 13,
		eCavBow: 14,
		eDKAxe: 15
	},
	zokusei: {
		none: 0,
		red: 1,
		green: 2,
		blue: 3
	},
	moveAssist: {
		reposition: 0,
		drawBack: 1,
		swap: 2
	},
	skills: {
		none: 0,
		extraStamina: 1,
		extraMovement: 2,
		passiveFlyer: 3,
		passiveRanged: 4,
	},
	settings: {
		showUnitID: true,
	},
	game: {
		maxPlayerUnitNumber : 4,
		maxSkillNumber : 5,
	}
};
export default consts;
