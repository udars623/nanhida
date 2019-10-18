import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let maxGrid = { x: 6, y: 8 };
let terrainMap = [
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Mnt, T.Nrm],
    [T.Nrm, T.Wtr, T.Nrm, T.Nrm, T.Mnt, T.Nrm],
    [T.Nrm, T.Wtr, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Wtr, T.Nrm, T.Nrm, T.Mnt, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Mnt, T.Mnt, T.Nrm],
    [T.Wtr, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm],
    [T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm, T.Nrm]
];

let unitList = [
    {
        gridPos: { x: 2, y: 7 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pTomato,
		params: {}
    },
    {
        gridPos: { x: 3, y: 7 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pKenshiJinlai,
		params: {}
    },
    {
        gridPos: { x: 4, y: 7 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pBlueberry,
		params: {}
    },
    {
        gridPos: { x: 5, y: 7 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pCabbage,
		params: {}
    },

    {
        gridPos: { x: 1, y: 1 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eCavBow,
		params: {}
    },
    {
        gridPos: { x: 1, y: 3 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eArcher,
		params: {}
    },
    {
        gridPos: { x: 3, y: 1 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eCavLance,
		params: {}
    },
	{
        gridPos: { x: 5, y: 1 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eDKAxe,
		params: {}
    },
    {
        gridPos: { x: 3, y: 2 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {}
    },
    {
        gridPos: { x: 1, y: 5 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {}
    },
    {
        gridPos: { x: 3, y: 4 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {}
    },
    {
        gridPos: { x: 6, y: 5 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eKenshi,
		params: {}
    },
	{
        gridPos: { x: 6, y: 4 },
        appearTurn: 0,
        isEnemy: true,
		typeID: U.eArcher,
		params: {}
    }
];

export default function createStage()	{
	return new Stage(maxGrid, terrainMap, unitList);
}
