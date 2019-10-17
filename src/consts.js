const consts = {
    terrainTypes: {
        Nrm: 0, // normal
        Mnt: 1, // mountain
        Wtr: 2, // water
        Wll: 3 // wall
    },
    buttons: {
        TurnEnd: 0,
        Wait: 1
    },
    gameResult: {
        None: 0,
        Win: 1,
        Lose: 2,
		GameEnded: 3
    },
	unitTypes: {
		unitBase: 0,
		
		pKenshi: 1,
		pTomato: 2,
		pBlueberry: 3,
		pCabbage: 4,
		pKenshiJinlai: 5,
		
		eKenshi: 11
	},
	moveAssist: {
		reposition: 0,
		drawBack: 1,
		swap: 2
	}
};
export default consts;
