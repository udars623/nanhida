import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let nameStr = "Stage 1-4 待ち伏せ";

let maxGrid = { x: 6, y: 8 };
let terrainMap = [
    [T.Mnt, T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Mnt, T.Mnt, T.Mnt, T.Nrm, T.Mnt, T.Mnt],
	[T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt],
    [T.Nrm, T.Nrm, T.Mnt, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm]
];

let unitList = [
    {
        gridPos: { x: 4, y: 3 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pRizaruto,
		params: {
			zokusei: consts.zokusei.none
		}
    },
	{
        gridPos: { x: 4, y: 4 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pBlueberry,
		params: {
			zokusei: consts.zokusei.blue
		}
    },

	{
		gridPos: { x: 5, y: 3 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.green,
		}
	},
	{
		gridPos: { x: 4, y: 2 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.blue,
		}
	},
	{
		gridPos: { x: 3, y: 3 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red,
		}
	},
	{
		gridPos: { x: 5, y: 2 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.red,
			barrier: [7]
		}
	},
	{
		gridPos: { x: 3, y: 2 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.green,
		}
	},
	{
		gridPos: { x: 3, y: 6 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.blue,
		}
	},
];

export default {nameStr: nameStr, stageCreator: function () {
	return new Stage(maxGrid, terrainMap, unitList, nameStr);
}}

