import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let nameStr = "Stage 1-5 分断の術III";

let maxGrid = { x: 6, y: 8 };
let terrainMap = [
    [T.Mnt, T.Mnt, T.Nrm, T.Nrm, T.Mnt, T.Mnt],
    [T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Wtr, T.Wtr, T.Nrm, T.Nrm],
	[T.Nrm, T.Nrm, T.Wtr, T.Wtr, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt],
    [T.Mnt, T.Mnt, T.Nrm, T.Nrm, T.Mnt, T.Mnt]
];

let unitList = [
    {
        gridPos: { x: 3, y: 6 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pRizaruto,
		params: {
			zokusei: consts.zokusei.none
		}
    },
	{
        gridPos: { x: 4, y: 6 },
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
		gridPos: { x: 4, y: 3 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.green,
			barrier: [5]
		}
	},
	{
		gridPos: { x: 3, y: 3 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.green,
			barrier: [8]
		}
	},
	{
		gridPos: { x: 2, y: 3 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.green,
			barrier: [3]
		}
	},
	{
		gridPos: { x: 3, y: 2 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.green,
			barrier: [6]
		}
	},
	{
		gridPos: { x: 4, y: 2 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.green,
			barrier: [7]
		}
	},
];

export default {nameStr: nameStr, stageCreator: function () {
	return new Stage(maxGrid, terrainMap, unitList, nameStr);
}}

