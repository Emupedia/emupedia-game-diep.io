"use strict";
/*
    DiepCustom - custom tank game server that shares diep.io's WebSocket protocol
    Copyright (C) 2022 ABCxFF (github.com/ABCxFF)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>
*/
Object.defineProperty(exports, "__esModule", { value: true });
const Arena_1 = require("../Native/Arena");
const TeamBase_1 = require("../Entity/Misc/TeamBase");
const TeamEntity_1 = require("../Entity/Misc/TeamEntity");
const Enums_1 = require("../Const/Enums");
const arenaSize = 11150;
const baseSize = 3345;
/**
 * Teams4 Gamemode Arena
 */
class Teams4Arena extends Arena_1.default {
    constructor(game) {
        super(game);
        /** Maps clients to their teams */
        this.playerTeamMap = new Map();
        this.updateBounds(arenaSize * 2, arenaSize * 2);
        this.blueTeamBase = new TeamBase_1.default(game, new TeamEntity_1.TeamEntity(this.game, Enums_1.Colors.TeamBlue), -arenaSize + baseSize / 2, -arenaSize + baseSize / 2, baseSize, baseSize);
        this.redTeamBase = new TeamBase_1.default(game, new TeamEntity_1.TeamEntity(this.game, Enums_1.Colors.TeamRed), arenaSize - baseSize / 2, arenaSize - baseSize / 2, baseSize, baseSize);
        this.greenTeamBase = new TeamBase_1.default(game, new TeamEntity_1.TeamEntity(this.game, Enums_1.Colors.TeamGreen), -arenaSize + baseSize / 2, arenaSize - baseSize / 2, baseSize, baseSize);
        this.purpleTeamBase = new TeamBase_1.default(game, new TeamEntity_1.TeamEntity(this.game, Enums_1.Colors.TeamPurple), arenaSize - baseSize / 2, -arenaSize + baseSize / 2, baseSize, baseSize);
    }
    spawnPlayer(tank, client) {
        tank.position.values.y = arenaSize * Math.random() - arenaSize;
        const xOffset = (Math.random() - 0.5) * baseSize, yOffset = (Math.random() - 0.5) * baseSize;
        const base = this.playerTeamMap.get(client) || [this.blueTeamBase, this.redTeamBase, this.greenTeamBase, this.purpleTeamBase][0 | Math.random() * 4];
        tank.relations.values.team = base.relations.values.team;
        tank.style.values.color = base.style.values.color;
        tank.position.values.x = base.position.values.x + xOffset;
        tank.position.values.y = base.position.values.y + yOffset;
        this.playerTeamMap.set(client, base);
        if (client.camera)
            client.camera.relations.team = tank.relations.values.team;
    }
}
exports.default = Teams4Arena;
