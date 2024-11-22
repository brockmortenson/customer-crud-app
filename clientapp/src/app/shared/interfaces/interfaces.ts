import { DateTime } from "luxon";

export interface ICustomer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    isLastSelected?: boolean;
}

export interface ICustomerDialogData {
    action: CustomerAction;
    customer?: ICustomer;
}

export enum CustomerAction {
    View = 'View',
    Create = 'Create',
    Edit = 'Edit',
    Delete = 'Delete',
}