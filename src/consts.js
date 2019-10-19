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
		
		pKenshi: 1,
		pTomato: 2,
		pBlueberry: 3,
		pCabbage: 4,
		pKenshiJinlai: 5,
		
		eKenshi: 11,
		eArcher: 12,
		eCavLance: 13,
		eCavBow: 14,
		eDKAxe: 15
	},
	moveAssist: {
		reposition: 0,
		drawBack: 1,
		swap: 2
	},
	skills: {
		none: 0,
		extraStamina: 1,
	}
};
export default consts;
