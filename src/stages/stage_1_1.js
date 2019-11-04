import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let nameStr = "Stage 1-1 バリアー！";

let maxGrid = { x: 6, y: 8 };
let terrainMap = [
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Mnt, T.Mnt, T.Nrm],
    [T.Nrm, T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Mnt, T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt, T.Mnt],
    [T.Mnt, T.Mnt, T.Nrm, T.Nrm, T.Mnt, T.Mnt]
];

let unitList = [
    {
        gridPos: { x: 4, y: 6 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pRizaruto,
		params: {
			zokusei: consts.zokusei.none
		}
    },

	{
		gridPos: { x: 2, y: 2 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red,
			barrier: [4]
		}
	},
	{
		gridPos: { x: 2, y: 7 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.green,
			barrier: [2]
		}
	},
	{
		gridPos: { x: 6, y: 3 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.blue
		}
	},
];

export default {nameStr: nameStr, stageCreator: function () {
	return new Stage(maxGrid, terrainMap, unitList, nameStr);
}}

