export type Permission = { business: string; isOwner: true };

export type AccessPayload = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  permissions: Permission[];
};

export type User = {
  pk: 1;
  phone_number: string;
  email: string;
};
