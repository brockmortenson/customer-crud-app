import { DateTime } from "luxon";

export interface ICustomer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}