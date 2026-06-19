import axios from "axios";
import * as z from "zod";
import { FormSchema } from "../components/OtpForm";

const createToken = (data: z.infer<typeof FormSchema>) => {
  return axios.post("http://127.0.0.1:8000/accounts/token/", data);
};

export default createToken;
