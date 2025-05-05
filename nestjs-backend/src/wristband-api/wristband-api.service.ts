import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { bearerToken } from 'src/api/utils';
import { wristbandApiClient } from 'src/api/wristband-axios-client';

@Injectable()
export class WristbandApiService {
  // ////////////////////////////////////
  //   NEW USER INVITE APIS
  // ////////////////////////////////////

  // https://docs.wristband.dev/reference/querynewuserinvitationrequestsfilteredbytenantv1
  async getNewUserInvitesInTenant(
    req: Request,
    tenantId: string,
  ): Promise<any> {
    const inviteQuery = encodeURIComponent(
      `status eq "PENDING_INVITE_ACCEPTANCE"`,
    );
    const response = await wristbandApiClient.get(
      `/tenants/${tenantId}/new-user-invitation-requests?query=${inviteQuery}`,
      bearerToken(req),
    );
    return response.data;
  }

  // https://docs.wristband.dev/reference/invitenewuserv1
  async inviteNewUser(req: Request, body: any): Promise<any> {
    const response = await wristbandApiClient.post(
      `/new-user-invitation/invite-user`,
      body,
      bearerToken(req),
    );
    return response.data;
  }

  // https://docs.wristband.dev/reference/cancelnewuserinvitev1
  async cancelNewUserInvite(req: Request, body: any): Promise<any> {
    const response = await wristbandApiClient.post(
      `/new-user-invitation/cancel-invite`,
      body,
      bearerToken(req),
    );
    return response.data;
  }

  // ////////////////////////////////////
  //   ROLE APIS
  // ////////////////////////////////////

  // https://docs.wristband.dev/reference/querytenantrolesv1
  async getRolesInTenant(req: Request, tenantId: string): Promise<any> {
    const response = await wristbandApiClient.get(
      `/tenants/${tenantId}/roles?include_application_roles=true`,
      bearerToken(req),
    );
    return response.data;
  }

  // ////////////////////////////////////
  //   TENANT APIS
  // ////////////////////////////////////

  // https://docs.wristband.dev/reference/gettenantv1
  async getTenant(req: Request, tenantId: string): Promise<any> {
    const response = await wristbandApiClient.get(
      `/tenants/${tenantId}`,
      bearerToken(req),
    );
    return response.data;
  }

  // https://docs.wristband.dev/reference/patchtenantv1
  async updateTenant(req: Request, tenantId: string, body: any): Promise<any> {
    const response = await wristbandApiClient.patch(
      `/tenants/${tenantId}`,
      body,
      bearerToken(req),
    );
    return response.data;
  }

  // ////////////////////////////////////
  //   USER APIS
  // ////////////////////////////////////

  // https://docs.wristband.dev/reference/getuserv1
  async getUser(req: Request, userId: string): Promise<any> {
    const response = await wristbandApiClient.get(
      `/users/${userId}`,
      bearerToken(req),
    );
    return response.data;
  }

  // https://docs.wristband.dev/reference/patchuserv1
  async updateUser(req: Request, userId: string, body: any): Promise<any> {
    const response = await wristbandApiClient.patch(
      `/users/${userId}`,
      body,
      bearerToken(req),
    );
    return response.data;
  }

  // https://docs.wristband.dev/reference/querytenantusersv1
  async getUsersInTenant(req: Request, tenantId: string): Promise<any> {
    const response = await wristbandApiClient.get(
      `/tenants/${tenantId}/users`,
      bearerToken(req),
    );
    return response.data;
  }
}
