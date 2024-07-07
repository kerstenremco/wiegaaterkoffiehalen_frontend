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
import type { Profile } from './Profile';
import {
    ProfileFromJSON,
    ProfileFromJSONTyped,
    ProfileToJSON,
} from './Profile';

/**
 * 
 * @export
 * @interface Member
 */
export interface Member {
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof Member
     */
    owner: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Member
     */
    emailNotification: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Member
     */
    pushNotification: boolean;
    /**
     * 
     * @type {Profile}
     * @memberof Member
     */
    user: Profile;
}

/**
 * Check if a given object implements the Member interface.
 */
export function instanceOfMember(value: object): value is Member {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('owner' in value) || value['owner'] === undefined) return false;
    if (!('emailNotification' in value) || value['emailNotification'] === undefined) return false;
    if (!('pushNotification' in value) || value['pushNotification'] === undefined) return false;
    if (!('user' in value) || value['user'] === undefined) return false;
    return true;
}

export function MemberFromJSON(json: any): Member {
    return MemberFromJSONTyped(json, false);
}

export function MemberFromJSONTyped(json: any, ignoreDiscriminator: boolean): Member {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['_id'],
        'owner': json['owner'],
        'emailNotification': json['emailNotification'],
        'pushNotification': json['pushNotification'],
        'user': ProfileFromJSON(json['user']),
    };
}

export function MemberToJSON(value?: Member | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        '_id': value['id'],
        'owner': value['owner'],
        'emailNotification': value['emailNotification'],
        'pushNotification': value['pushNotification'],
        'user': ProfileToJSON(value['user']),
    };
}

