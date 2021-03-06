/* tslint:disable */
/* eslint-disable */
/**
 * ToDo REST API
 * ToDoアプリのREST API。
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    InlineObject2,
    InlineObject2FromJSON,
    InlineObject2ToJSON,
    InlineObject3,
    InlineObject3FromJSON,
    InlineObject3ToJSON,
    InlineResponse200,
    InlineResponse200FromJSON,
    InlineResponse200ToJSON,
    User,
    UserFromJSON,
    UserToJSON,
} from '../models';

export interface LoginRequest {
    inlineObject3: InlineObject3;
}

export interface SignupRequest {
    inlineObject2: InlineObject2;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * HTTPヘッダに設定するためのCSRFトークンを取得する。 
     * CSRFトークンの取得
     */
    async getCsrfTokenRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<InlineResponse200>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/csrf_token`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse200FromJSON(jsonValue));
    }

    /**
     * HTTPヘッダに設定するためのCSRFトークンを取得する。 
     * CSRFトークンの取得
     */
    async getCsrfToken(initOverrides?: RequestInit): Promise<InlineResponse200> {
        const response = await this.getCsrfTokenRaw(initOverrides);
        return await response.value();
    }

    /**
     * ユーザー情報で認証を行い、認証に成功した場合はログインする。 一部のREST APIを利用するためには、このREST APIを利用して事前にログインしておく必要がある。 ログイン状態は、ログアウトするREST APIを呼び出すか、一定時間が経過するまで継続する。 
     * ログイン
     */
    async loginRaw(requestParameters: LoginRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.inlineObject3 === null || requestParameters.inlineObject3 === undefined) {
            throw new runtime.RequiredError('inlineObject3','Required parameter requestParameters.inlineObject3 was null or undefined when calling login.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InlineObject3ToJSON(requestParameters.inlineObject3),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * ユーザー情報で認証を行い、認証に成功した場合はログインする。 一部のREST APIを利用するためには、このREST APIを利用して事前にログインしておく必要がある。 ログイン状態は、ログアウトするREST APIを呼び出すか、一定時間が経過するまで継続する。 
     * ログイン
     */
    async login(requestParameters: LoginRequest, initOverrides?: RequestInit): Promise<User> {
        const response = await this.loginRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * ログイン中である場合、ログアウトする。 
     * ログアウト
     */
    async logoutRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/logout`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * ログイン中である場合、ログアウトする。 
     * ログアウト
     */
    async logout(initOverrides?: RequestInit): Promise<void> {
        await this.logoutRaw(initOverrides);
    }

    /**
     * ToDoアプリを利用するのに必要となるユーザーアカウントを登録する。 **メールアドレス**は識別できるように一意である必要がある。 
     * アカウントの登録
     */
    async signupRaw(requestParameters: SignupRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.inlineObject2 === null || requestParameters.inlineObject2 === undefined) {
            throw new runtime.RequiredError('inlineObject2','Required parameter requestParameters.inlineObject2 was null or undefined when calling signup.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/signup`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InlineObject2ToJSON(requestParameters.inlineObject2),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * ToDoアプリを利用するのに必要となるユーザーアカウントを登録する。 **メールアドレス**は識別できるように一意である必要がある。 
     * アカウントの登録
     */
    async signup(requestParameters: SignupRequest, initOverrides?: RequestInit): Promise<void> {
        await this.signupRaw(requestParameters, initOverrides);
    }

}
