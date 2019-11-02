import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let nameStr = "Stage 1-3 差し伸べる手";

let maxGrid = { x: 6, y: 8 };
let terrainMap = [
    [T.Nrm, T.Nrm, T.Nrm, T.Wtr, T.Wtr, T.Wtr],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Mnt, T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Mnt, T.Mnt, T.Nrm, T.Nrm, T.Mnt, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Mnt, T.Mnt, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm]
];

let unitList = [
    {
        gridPos: { x: 2, y: 6 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pKenshiJinlai,
		params: {
			zokusei: consts.zokusei.none
		}
    },
	{
        gridPos: { x: 5, y: 3 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pBlueberry,
		params: {
			zokusei: consts.zokusei.blue
		}
    },

	{
		gridPos: { x: 1, y: 7 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.blue,
		}
	},
	{
		gridPos: { x: 2, y: 2 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red,
		}
	},
	{
		gridPos: { x: 6, y: 2 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.green,
		}
	},
	{
		gridPos: { x: 5, y: 7 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red
		}
	},
	{
		gridPos: { x: 6, y: 7 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.green,
		}
	},
	{
		gridPos: { x: 5, y: 8 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.blue,
			barrier: [5]
		}
	},
];

export default {nameStr: nameStr, stageCreator: function () {
	return new Stage(maxGrid, terrainMap, unitList, nameStr);
}}

