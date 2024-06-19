/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from "react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";
import { Input } from "../../@/components/ui/input";
import { Button } from "../../@/components/ui/button";
import {
  ACTIONS,
  ADD_STUDENT,
  EMAIL_ID,
  FIRST_NAME,
  LAST_NAME,
  MOBILE_NUMBER,
  NO_DATA,
} from "./constants";

import {
  useDeleteStudent,
  getStudentsData,
  useSearchStudent,
  studentsData,
  setStudentsData,
} from "./dataAndHooks";
import { studentType } from "./homeDataTypes";
import { Pencil, Search, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "./AppContext";

function StudentsTable() {
  const [searchValue, setSearchValue] = useState("");
  const queryClient = useQueryClient();
  const { dispatch, studentsMainData } = useAppContext();
  const { deleteStudent } = useDeleteStudent();
  const { searchStudent } = useSearchStudent();

  const { data } = useQuery({
    queryKey: ["getStudents"],
    queryFn: () => getStudentsData(),
  });

  function handleEditClick(student: studentType) {
    dispatch({
      type: "setSelectedMethod",
      payload: {
        method: "EDIT",
        data: student,
      },
    });
  }
  function handleDeleteClick(emailId: string) {
    if (confirm("Do you want delete?")) {
      deleteStudent(emailId);
      queryClient?.invalidateQueries({
        queryKey: ["getStudents"],
      });
    }
  }
  function handleSearchClick() {
    dispatch({
      type: "setStudentsData",
      payload: studentsData,
    });
    searchStudent(searchValue, studentsData);
    queryClient?.invalidateQueries({
      queryKey: ["getStudents"],
    });
  }
  function handleChange(e: any) {
    setSearchValue(e?.target?.value);
  }
  function addStudent() {
    dispatch({
      type: "setSelectedMethod",
      payload: {
        method: "ADD",
        data: undefined,
      },
    });
  }
  function handleClearClick() {
    setSearchValue("");
    setStudentsData(studentsMainData as never);
    queryClient?.invalidateQueries({
      queryKey: ["getStudents"],
    });
  }

  return (
    <div className="max-w-[75vw]  flex flex-col gap-3">
      <div className="flex items-center w-[70vw] justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <Input
              value={searchValue}
              onChange={handleChange}
              placeholder="Search"
              className="max-w-[20vw]"
              disabled={data && data?.length < 1 ? true : false}
            />
            <div title="Clear" className="right-1  absolute">
              {" "}
              <X
                className="w-6 hover:bg-border/50 rounded-full h-6 p-1 "
                onClick={handleClearClick}
              />
            </div>
          </div>
          <Search
            onClick={handleSearchClick}
            className={` ${
              data && data?.length < 1
                ? "text-border/50 cursor-not-allowed"
                : "w-10 h-10  cursor-pointer hover:bg-border/50 rounded-full p-2"
            }`}
          />
        </div>
        <Button onClick={addStudent}>{ADD_STUDENT}</Button>
      </div>
      <div className="overflow-y-auto overflow-x-hidden max-h-[85vh]">
        {data && data?.length > 0 ? (
          <Table className="border ">
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-primary">
                  {FIRST_NAME}
                </TableHead>
                <TableHead className="font-bold text-primary">
                  {LAST_NAME}
                </TableHead>
                <TableHead className="font-bold text-primary">
                  {MOBILE_NUMBER}
                </TableHead>
                <TableHead className="font-bold text-primary">
                  {EMAIL_ID}
                </TableHead>
                <TableHead className="font-bold text-primary">
                  {ACTIONS}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((student: studentType, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{student?.fisrtName}</TableCell>
                    <TableCell>{student?.lastName}</TableCell>
                    <TableCell>{student?.mobileNumber}</TableCell>
                    <TableCell>{student?.emailId}</TableCell>
                    <TableCell>
                      {
                        <div className="flex items-center gap-5">
                          <div title="Delete">
                            <Trash2
                              onClick={() => {
                                handleDeleteClick(student?.emailId);
                              }}
                              className="text-destructive w-10 h-10 cursor-pointer hover:bg-border/50 rounded-full p-2"
                            />
                          </div>
                          <div title="Edit">
                            <Pencil
                              onClick={() => {
                                handleEditClick(student);
                              }}
                              className="w-5 h-5 cursor-pointer hover:scale-105"
                            />
                          </div>
                        </div>
                      }
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div>{NO_DATA}</div>
        )}
      </div>
    </div>
  );
}

export default StudentsTable;
