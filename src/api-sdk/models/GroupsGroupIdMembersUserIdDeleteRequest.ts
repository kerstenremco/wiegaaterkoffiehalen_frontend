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
/**
 * 
 * @export
 * @interface GroupsGroupIdMembersUserIdDeleteRequest
 */
export interface GroupsGroupIdMembersUserIdDeleteRequest {
    /**
     * 
     * @type {boolean}
     * @memberof GroupsGroupIdMembersUserIdDeleteRequest
     */
    isInvite?: boolean;
}

/**
 * Check if a given object implements the GroupsGroupIdMembersUserIdDeleteRequest interface.
 */
export function instanceOfGroupsGroupIdMembersUserIdDeleteRequest(value: object): value is GroupsGroupIdMembersUserIdDeleteRequest {
    return true;
}

export function GroupsGroupIdMembersUserIdDeleteRequestFromJSON(json: any): GroupsGroupIdMembersUserIdDeleteRequest {
    return GroupsGroupIdMembersUserIdDeleteRequestFromJSONTyped(json, false);
}

export function GroupsGroupIdMembersUserIdDeleteRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): GroupsGroupIdMembersUserIdDeleteRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'isInvite': json['isInvite'] == null ? undefined : json['isInvite'],
    };
}

export function GroupsGroupIdMembersUserIdDeleteRequestToJSON(value?: GroupsGroupIdMembersUserIdDeleteRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'isInvite': value['isInvite'],
    };
}

