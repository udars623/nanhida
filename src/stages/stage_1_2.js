import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let nameStr = "Stage 1-2 難敵";

let maxGrid = { x: 6, y: 8 };
let terrainMap = [
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Wtr, T.Wtr, T.Nrm, T.Wtr, T.Nrm],
    [T.Wtr, T.Wtr, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Wtr, T.Wtr, T.Nrm],
    [T.Wtr, T.Nrm, T.Nrm, T.Wtr, T.Nrm, T.Nrm],
    [T.Wtr, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm]
];

let unitList = [
    {
        gridPos: { x: 4, y: 1 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pRizaruto,
		params: {
			zokusei: consts.zokusei.none
		}
    },

	{
		gridPos: { x: 1, y: 1 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.blue,
			barrier: [3,4,5,6]
		}
	},
	{
		gridPos: { x: 1, y: 5 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red,
		}
	},
	{
		gridPos: { x: 6, y: 5 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.green
		}
	},
	{
		gridPos: { x: 2, y: 8 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.blue
		}
	},
	{
		gridPos: { x: 5, y: 8 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red
		}
	},
];

export default {nameStr: nameStr, stageCreator: function () {
	return new Stage(maxGrid, terrainMap, unitList, nameStr);
}}

