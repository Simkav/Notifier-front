import {Maybe} from "yup/es/types";

export type ModalFormType = {
    type : Maybe<string>
    value : Maybe<number>

}

export enum intervalTypeValues {
    days = "days",
    weeks = "weeks",
    months = "months",
}