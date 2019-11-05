import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let nameStr = "「あびす丸」誘導てすと";

let maxGrid = { x: 6, y: 8 };
let terrainMap = [
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Mnt, T.Nrm, T.Nrm, T.Mnt, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
	[T.Nrm, T.Nrm, T.Mnt, T.Mnt, T.Nrm, T.Nrm],
    [T.Wtr, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Wtr],
    [T.Nrm, T.Nrm, T.Nrm, T.Wtr, T.Nrm, T.Nrm]
];

let unitList = [
    {
        gridPos: { x: 4, y: 4 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pRizaruto,
		params: {
			zokusei: consts.zokusei.none,
		}
    },
	{
        gridPos: { x: 6, y: 2 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pTomato,
		params: {
			zokusei: consts.zokusei.red,
		}
    },
    {
        gridPos: { x: 5, y: 1 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pBlueberry,
		params: {
			zokusei: consts.zokusei.blue,
		}
    },
    {
        gridPos: { x: 6, y: 1 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pCabbage,
		params: {
			zokusei: consts.zokusei.green,
		}
    },


	// 16
	{
		gridPos: { x: 5, y: 7 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eDKAxe,
		params: {
			zokusei: consts.zokusei.red,
		}
	},
	{
		gridPos: { x: 5, y: 8 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eDKAxe,
		params: {
			zokusei: consts.zokusei.green,
		}
	},
	{
		gridPos: { x: 6, y: 7 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eDKAxe,
		params: {
			zokusei: consts.zokusei.blue,
		}
	},
	{
		gridPos: { x: 6, y: 6 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eDKAxe,
		params: {
			zokusei: consts.zokusei.green,
		}
	},
	{
		gridPos: { x: 6, y: 8 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eDKAxe,
		params: {
			zokusei: consts.zokusei.red,
		}
	},
	
];

export default {nameStr: nameStr, stageCreator: function () {
	return new Stage(maxGrid, terrainMap, unitList, nameStr);
}}

