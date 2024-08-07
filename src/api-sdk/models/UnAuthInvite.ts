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
 * @interface UnAuthInvite
 */
export interface UnAuthInvite {
    /**
     * 
     * @type {string}
     * @memberof UnAuthInvite
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof UnAuthInvite
     */
    email: string;
}

/**
 * Check if a given object implements the UnAuthInvite interface.
 */
export function instanceOfUnAuthInvite(value: object): value is UnAuthInvite {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('email' in value) || value['email'] === undefined) return false;
    return true;
}

export function UnAuthInviteFromJSON(json: any): UnAuthInvite {
    return UnAuthInviteFromJSONTyped(json, false);
}

export function UnAuthInviteFromJSONTyped(json: any, ignoreDiscriminator: boolean): UnAuthInvite {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['_id'],
        'email': json['email'],
    };
}

export function UnAuthInviteToJSON(value?: UnAuthInvite | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        '_id': value['id'],
        'email': value['email'],
    };
}

