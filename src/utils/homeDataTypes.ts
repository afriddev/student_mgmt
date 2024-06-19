/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export type studentType = {
  fisrtName: string;
  lastName: string;
  mobileNumber: number;
  emailId: string;
};

export type dispatchDataType = {
  type:string,
  payload:any
};

export type contextType = {
  selectedMethod:"ADD" | "EDIT" | ""
  dispatch:React.Dispatch<dispatchDataType>
  selectedStudent:studentType | undefined
  studentsMainData:studentType[] | undefined
}