import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  user_id: string;
}

function jwtDecoder(token: string) {
  if (!token) {
    return null;
  }
  const decoded = jwtDecode(token) as JwtPayload;
  return decoded;
}

export default jwtDecoder;
