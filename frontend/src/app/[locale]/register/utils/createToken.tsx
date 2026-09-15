import axios from "axios";
import * as z from "zod";
import { FormSchema } from "../components/OtpForm";

//configs
import { API_BASE_URL } from "@/lib/config";

const createToken = (data: z.infer<typeof FormSchema>) => {
  return axios.post(`${API_BASE_URL}/accounts/token/`, data);
};

export default createToken;
