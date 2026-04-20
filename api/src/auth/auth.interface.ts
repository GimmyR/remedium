export interface JwtPayload {
  sub: string;
  username: string;
  roles: string[];
}

export interface RequestWithUser {
  user: JwtPayload;
}
