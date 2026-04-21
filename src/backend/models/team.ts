import {
  FetchMultiDataRequest,
  FetchMultiDataResponse,
  FilterDataRequest,
  SuccessMessageResponse,
} from "./_shared";

// TeamMembers
export interface CreateTeamMemberSchema {
  name: string;
  nameSearch: string;
  bio: string | null;
  portfolio: string | null;
  linkedinUrl?: string | null;
  imgUrl?: string | null;
}

export interface CreateTeamMemberWithFileSchema {
  data: CreateTeamMemberSchema;
  file: File;
}

export interface TeamMemberSchema extends CreateTeamMemberSchema {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface GetTeamMembersSchema extends FetchMultiDataRequest {}

export interface UpdateTeamMemberSchema
  extends Partial<CreateTeamMemberSchema> {}

export interface UpdateTeamMemberWithFileSchema {
  id: string;
    data: UpdateTeamMemberSchema;
    file: File | null;
  }

export interface FilterTeamMembersSchema extends FilterDataRequest {
  nameSearch?: string;
}

export interface ResponseTeamMemberSchema extends SuccessMessageResponse {
  data: TeamMemberSchema;
}

export interface ListResponseTeamMembersSchema
  extends FetchMultiDataResponse {
  data: TeamMemberSchema[];
}



