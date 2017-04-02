/*
 Copyright (C) 2013-2015 by Justin DuJardin and Contributors

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import * as _ from 'underscore';
import {GameWorld} from '../../../app/services/gameWorld';
import {TileObject} from '../../pow2/tile/tileObject';
import {BaseEntity} from '../../../app/models/base-entity';
import {Entity} from '../../../app/models/entity/entity.model';
import {ITemplateMagic} from '../../../app/models/game-data/game-data.model';

export class GameEntityObject extends TileObject {
  model: BaseEntity;
  type = 'player';
  groups: any;
  world: GameWorld;

  getSpells(): ITemplateMagic[] {
    const spells: any = this.world.spreadsheet.getSheetData('magic');
    const caster = this.model as Entity;
    const userLevel: number = caster.level;
    const userClass: string = caster.type;
    return _.filter(spells, (spell: ITemplateMagic) => {
      return spell.level <= userLevel && _.indexOf(spell.usedby, userClass) !== -1;
    });
  }
}
