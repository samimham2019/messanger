import axios from "axios";
import {Shared, Local, dev} from './Base'

const instance = axios.create({baseURL: dev ? Local : Shared})
export default instance


