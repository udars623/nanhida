import Stage from "/src/stage";
import consts from "/src/consts";

let T = consts.terrainTypes;
let U = consts.unitTypes;

let nameStr = "「あびす丸」";

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
        gridPos: { x: 3, y: 7 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pRizaruto,
		params: {
			zokusei: consts.zokusei.none,
			skills: [{
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}]
		}
    },
	{
        gridPos: { x: 2, y: 7 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pTomato,
		params: {
			zokusei: consts.zokusei.red,
			skills: [{
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}]
		}
    },
    {
        gridPos: { x: 4, y: 7 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pBlueberry,
		params: {
			zokusei: consts.zokusei.blue,
			skills: [{
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}]
		}
    },
    {
        gridPos: { x: 5, y: 7 },
        appearTurn: 0,
        isEnemy: false,
		typeID: U.pCabbage,
		params: {
			zokusei: consts.zokusei.green,
			skills: [{
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}, {
				skill: "extraStamina",
				level: 1
			}]
		}
    },

	// 5
	{
		gridPos: { x: 1, y: 3 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eCavLance,
		params: {
			zokusei: consts.zokusei.green,
			barrier: [6]
		}
	},
	{
		gridPos: { x: 6, y: 3 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.red,
			barrier: [7]
		}
	},
	{
		gridPos: { x: 3, y: 1 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.blue,
		}
	},
	{
		gridPos: { x: 4, y: 1 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eDKAxe,
		params: {
			zokusei: consts.zokusei.green,
			barrier: [5]
		}
	},
	{
		gridPos: { x: 4, y: 4 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.blue,
			barrier: [8]
		}
	},
	{
		gridPos: { x: 3, y: 4 },
		appearTurn: 0,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red,
			barrier: [8]
		}
	},
	
	// 11
	{
		gridPos: { x: 1, y: 1 },
		appearTurn: 1,
		isEnemy: true,
		typeID: U.eCavBow,
		params: {
			zokusei: consts.zokusei.red,
			barrier: [12, 14]
		}
	},
	{
		gridPos: { x: 4, y: 1 },
		appearTurn: 1,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.blue,
			barrier: [10, 9]
		}
	},
	{
		gridPos: { x: 6, y: 1 },
		appearTurn: 1,
		isEnemy: true,
		typeID: U.eCavBow,
		params: {
			zokusei: consts.zokusei.green,
			barrier: [12, 14]
		}
	},
	{
		gridPos: { x: 1, y: 8 },
		appearTurn: 1,
		isEnemy: true,
		typeID: U.eCavBow,
		params: {
			zokusei: consts.zokusei.red,
			barrier: [12]
		}
	},
	{
		gridPos: { x: 3, y: 1 },
		appearTurn: 1,
		isEnemy: true,
		typeID: U.eCavLance,
		params: {
			zokusei: consts.zokusei.green,
			barrier: [14]
		}
	},
	
	// 16
	{
		gridPos: { x: 5, y: 7 },
		appearTurn: 2,
		isEnemy: true,
		typeID: U.eDKAxe,
		params: {
			zokusei: consts.zokusei.red,
			barrier: [17]
		}
	},
	{
		gridPos: { x: 5, y: 8 },
		appearTurn: 2,
		isEnemy: true,
		typeID: U.eDKAxe,
		params: {
			zokusei: consts.zokusei.green,
			barrier: [18]
		}
	},
	{
		gridPos: { x: 6, y: 7 },
		appearTurn: 2,
		isEnemy: true,
		typeID: U.eDKAxe,
		params: {
			zokusei: consts.zokusei.blue,
			barrier: [19]
		}
	},
	{
		gridPos: { x: 6, y: 6 },
		appearTurn: 2,
		isEnemy: true,
		typeID: U.eDKAxe,
		params: {
			zokusei: consts.zokusei.green,
			barrier: [20]
		}
	},
	{
		gridPos: { x: 6, y: 8 },
		appearTurn: 2,
		isEnemy: true,
		typeID: U.eDKAxe,
		params: {
			zokusei: consts.zokusei.red,
			barrier: [13]
		}
	},
	
	//21
	{
		gridPos: { x: 1, y: 1 },
		appearTurn: 3,
		isEnemy: true,
		typeID: U.eArcher,
		params: {
			zokusei: consts.zokusei.green,
			barrier: [22, 23, 24, 25, 26]
		}
	},
	{
		gridPos: { x: 2, y: 1 },
		appearTurn: 3,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red,
		}
	},
	{
		gridPos: { x: 3, y: 1 },
		appearTurn: 3,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red,
		}
	},
	{
		gridPos: { x: 4, y: 1 },
		appearTurn: 3,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red,
		}
	},
	{
		gridPos: { x: 5, y: 1 },
		appearTurn: 3,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.red,
		}
	},
	{
		gridPos: { x: 6, y: 1 },
		appearTurn: 3,
		isEnemy: true,
		typeID: U.eKenshi,
		params: {
			zokusei: consts.zokusei.blue,
		}
	},
	
	// 27
	{
		gridPos: { x: 1, y: 1 },
		appearTurn: 4,
		isEnemy: true,
		typeID: U.eCavLance,
		params: {
			zokusei: consts.zokusei.blue,
			barrier: [26],
			skills: [{
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, ]
		}
	},
	{
		gridPos: { x: 1, y: 8 },
		appearTurn: 4,
		isEnemy: true,
		typeID: U.eCavLance,
		params: {
			zokusei: consts.zokusei.blue,
			barrier: [26],
			skills: [{
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, ]
		}
	},
	{
		gridPos: { x: 6, y: 1 },
		appearTurn: 4,
		isEnemy: true,
		typeID: U.eCavLance,
		params: {
			zokusei: consts.zokusei.blue,
			barrier: [26],
			skills: [{
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, ]
		}
	},
	{
		gridPos: { x: 6, y: 8 },
		appearTurn: 4,
		isEnemy: true,
		typeID: U.eCavLance,
		params: {
			zokusei: consts.zokusei.blue,
			barrier: [26],
			skills: [{
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, {
				skill: "extraMovement",
				level: 1
			}, ]
		}
	},
];

export default {nameStr: nameStr, stageCreator: function () {
	return new Stage(maxGrid, terrainMap, unitList, nameStr);
}}

