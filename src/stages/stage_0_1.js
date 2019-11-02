import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let nameStr = "Stage 0-1 電光石火";

let maxGrid = { x: 6, y: 8 };
let terrainMap = [
    [T.Mnt, T.Nrm, T.Nrm, T.Mnt, T.Mnt, T.Mnt],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt, T.Mnt],
    [T.Wtr, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt],
    [T.Wtr, T.Wtr, T.Wtr, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Wtr, T.Nrm, T.Wtr, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Wtr, T.Wtr],
    [T.Mnt, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Mnt, T.Mnt, T.Mnt, T.Nrm, T.Nrm, T.Nrm]
];

let unitList = [
    {
        gridPos: { x: 3, y: 7 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pKenshiJinlai,
		params: {
			zokusei: consts.zokusei.none
		}
    },

    {
        gridPos: { x: 5, y: 4 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.blue
		}
    },
	{
        gridPos: { x: 3, y: 2 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.green
		}
    }
];

export default {nameStr: nameStr, stageCreator: function () {
	return new Stage(maxGrid, terrainMap, unitList, nameStr);
}}

