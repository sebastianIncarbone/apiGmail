import fs from 'fs';
import {google} from 'googleapis';
import util from 'util';
const promisify = util.promisify;
const readFile = promisify(fs.readFile);

const CREDENTIALS_PATH = __dirname + '/credentials.json';
const TOKEN_PATH = __dirname + '/token.json';

export function getGmailClient() {
    const credentials = fs.readFileSync(CREDENTIALS_PATH);
    const token = fs.readFileSync(TOKEN_PATH);
    // @ts-ignore
    const oauthClient = getOAuthClient(makeCredentials(credentials, token));

    return google.gmail({version: 'v1', auth: oauthClient});
}

function makeCredentials(credentials: string, token: string) :any{
    return {
        params: JSON.parse(credentials).installed,
        token: JSON.parse(token),
    };
}

function getOAuthClient(credentials: any): any {
    const oAuth2Client = new google.auth.OAuth2(
        credentials.params.client_id,
        credentials.params.client_secret,
        credentials.params.redirect_uris[0]
    );
    oAuth2Client.setCredentials(credentials.token);
    return oAuth2Client;
}
  
