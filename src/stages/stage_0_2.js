import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let nameStr = "Stage 0-2 分断の術";

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
        gridPos: { x: 3, y: 2 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red
		}
    },
	{
        gridPos: { x: 4, y: 2 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.green
		}
    },
	{
        gridPos: { x: 5, y: 2 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.blue
		}
    },
	{
        gridPos: { x: 4, y: 3 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red
		}
    }
];

export default {nameStr: nameStr, stageCreator: function () {
	return new Stage(maxGrid, terrainMap, unitList, nameStr);
}}

