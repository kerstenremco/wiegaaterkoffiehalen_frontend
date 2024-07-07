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
import type { GroupMember } from './GroupMember';
import {
    GroupMemberFromJSON,
    GroupMemberFromJSONTyped,
    GroupMemberToJSON,
} from './GroupMember';
import type { Profile } from './Profile';
import {
    ProfileFromJSON,
    ProfileFromJSONTyped,
    ProfileToJSON,
} from './Profile';

/**
 * 
 * @export
 * @interface UsersPatch200Response
 */
export interface UsersPatch200Response {
    /**
     * 
     * @type {Profile}
     * @memberof UsersPatch200Response
     */
    profile?: Profile;
    /**
     * 
     * @type {Array<GroupMember>}
     * @memberof UsersPatch200Response
     */
    groups?: Array<GroupMember>;
}

/**
 * Check if a given object implements the UsersPatch200Response interface.
 */
export function instanceOfUsersPatch200Response(value: object): value is UsersPatch200Response {
    return true;
}

export function UsersPatch200ResponseFromJSON(json: any): UsersPatch200Response {
    return UsersPatch200ResponseFromJSONTyped(json, false);
}

export function UsersPatch200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UsersPatch200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'profile': json['profile'] == null ? undefined : ProfileFromJSON(json['profile']),
        'groups': json['groups'] == null ? undefined : ((json['groups'] as Array<any>).map(GroupMemberFromJSON)),
    };
}

export function UsersPatch200ResponseToJSON(value?: UsersPatch200Response | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'profile': ProfileToJSON(value['profile']),
        'groups': value['groups'] == null ? undefined : ((value['groups'] as Array<any>).map(GroupMemberToJSON)),
    };
}

