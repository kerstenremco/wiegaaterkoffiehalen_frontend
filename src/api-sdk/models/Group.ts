/* tslint:disable */
/* eslint-disable */
/**
 * wiegaaterkoffiehalen OpenAPI
 * wiegaaterkoffiehalen OpenAPI
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Drawing } from './Drawing';
import {
    DrawingFromJSON,
    DrawingFromJSONTyped,
    DrawingToJSON,
} from './Drawing';
import type { Drink } from './Drink';
import {
    DrinkFromJSON,
    DrinkFromJSONTyped,
    DrinkToJSON,
} from './Drink';
import type { Member } from './Member';
import {
    MemberFromJSON,
    MemberFromJSONTyped,
    MemberToJSON,
} from './Member';
import type { Invite } from './Invite';
import {
    InviteFromJSON,
    InviteFromJSONTyped,
    InviteToJSON,
} from './Invite';

/**
 * 
 * @export
 * @interface Group
 */
export interface Group {
    /**
     * 
     * @type {string}
     * @memberof Group
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Group
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Group
     */
    avatar: string;
    /**
     * 
     * @type {boolean}
     * @memberof Group
     */
    active: boolean;
    /**
     * 
     * @type {Array<Invite>}
     * @memberof Group
     */
    invites: Array<Invite>;
    /**
     * 
     * @type {Array<Member>}
     * @memberof Group
     */
    members: Array<Member>;
    /**
     * 
     * @type {Array<Drink>}
     * @memberof Group
     */
    drinks: Array<Drink>;
    /**
     * 
     * @type {Drawing}
     * @memberof Group
     */
    activeDrawing?: Drawing;
    /**
     * 
     * @type {Drawing}
     * @memberof Group
     */
    lastDrawing?: Drawing;
}

/**
 * Check if a given object implements the Group interface.
 */
export function instanceOfGroup(value: object): value is Group {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('avatar' in value) || value['avatar'] === undefined) return false;
    if (!('active' in value) || value['active'] === undefined) return false;
    if (!('invites' in value) || value['invites'] === undefined) return false;
    if (!('members' in value) || value['members'] === undefined) return false;
    if (!('drinks' in value) || value['drinks'] === undefined) return false;
    return true;
}

export function GroupFromJSON(json: any): Group {
    return GroupFromJSONTyped(json, false);
}

export function GroupFromJSONTyped(json: any, ignoreDiscriminator: boolean): Group {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['_id'],
        'name': json['name'],
        'avatar': json['avatar'],
        'active': json['active'],
        'invites': ((json['invites'] as Array<any>).map(InviteFromJSON)),
        'members': ((json['members'] as Array<any>).map(MemberFromJSON)),
        'drinks': ((json['drinks'] as Array<any>).map(DrinkFromJSON)),
        'activeDrawing': json['activeDrawing'] == null ? undefined : DrawingFromJSON(json['activeDrawing']),
        'lastDrawing': json['lastDrawing'] == null ? undefined : DrawingFromJSON(json['lastDrawing']),
    };
}

export function GroupToJSON(value?: Group | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        '_id': value['id'],
        'name': value['name'],
        'avatar': value['avatar'],
        'active': value['active'],
        'invites': ((value['invites'] as Array<any>).map(InviteToJSON)),
        'members': ((value['members'] as Array<any>).map(MemberToJSON)),
        'drinks': ((value['drinks'] as Array<any>).map(DrinkToJSON)),
        'activeDrawing': DrawingToJSON(value['activeDrawing']),
        'lastDrawing': DrawingToJSON(value['lastDrawing']),
    };
}

