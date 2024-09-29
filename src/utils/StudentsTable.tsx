/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";
import { useAppContext } from "./AppContext";
import Spinner from "./Spinner";
import {
  ACTIONS,
  ADD_STUDENT,
  EMAIL_ID,
  FIRST_NAME,
  LAST_NAME,
  MOBILE_NUMBER,
  NO_DATA,
} from "./constants";
import { studentType } from "./homeDataTypes";
import {
  useDeleteStudent,
  useGetStudentsData,
  useRefresh,
  useSearchStudent,
} from "./hooks";

function StudentsTable() {
  const [searchValue, setSearchValue] = useState("");
  const queryClient = useQueryClient();
  const { dispatch, searchedData, refresh } = useAppContext();
  const { deleteStudent, isLoading: deletingStudent } = useDeleteStudent();
  const { searchStudent } = useSearchStudent();
  const [start, setSatrt] = useState(0);
  const [searchClicked, setSearchedClick] = useState(false);
  const { data, getStudentsData, isLoading } = useGetStudentsData();
  const { refreshData } = useRefresh();

  const rows = 5;

  useEffect(() => {
    getStudentsData();
  }, [refresh]);

  function nextClick() {
    if (data) {
      if ((start + rows < data?.length) as never) setSatrt(start + rows);
    }
  }
  function prevClick() {
    if (start > 0) setSatrt(start - rows);
  }

  function handleEditClick(student: studentType) {
    dispatch({
      type: "setSelectedMethod",
      payload: {
        method: "EDIT",
        data: student,
      },
    });

    dispatch({
      type: "setSelectedStudentData",
      payload: student,
    });
  }
  function handleDeleteClick(emailId: string) {
    if (confirm("Do you want delete?")) {
      deleteStudent(
        { emailId },
        {
          onSuccess(data) {
            if (data === "success") refreshData();
          },
        }
      );
    }
  }
  function handleSearchClick() {
    if (searchValue !== "") {
      searchStudent(searchValue);
      setSearchedClick(true);
    } else {
      handleClearClick();
    }
  }
  function handleClearClick() {
    setSearchValue("");
    setSearchedClick(false);
    dispatch({
      type: "clearSearchedData",
      payload: "",
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
 if(data) alert(data)

  return (
    <div className="max-w-[75vw] flex flex-col gap-3">
      <div className="flex pt-4 px-4 items-center w-[70vw] justify-between">
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
      <div className="px-4 overflow-y-auto flex flex-col gap-2 overflow-x-hidden h-[85vh]">
        {(searchClicked ? searchedData : data?.data?.students)?.length > 0 && (
          <div className="w-full gap-3 justify-end flex items-center ">
            <label className="text-xs font-semibold">{`Page ${
              start / rows + 1
            } of ${Math.ceil((data as any)?.length / rows)}`}</label>
            <ChevronLeft
              onClick={prevClick}
              className={`text-primary-foreground h-4 w-4 rounded-sm  bg-primary cursor-pointer ${
                start === 0 && "bg-slate-400"
              }`}
            />
            <ChevronRight
              onClick={nextClick}
              className={`text-primary-foreground h-4 w-4 rounded-sm  bg-primary cursor-pointer ${
                start + rows >= (data as any)?.length && "bg-slate-400"
              } `}
            />
          </div>
        )}
        {(searchClicked ? searchedData : data?.data?.students)?.length > 0 ? (
          <Table className="border">
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
              {(searchClicked ? searchedData : data)
                ?.slice(start, rows + start)
                ?.map((student: studentType, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{student?.firstName}</TableCell>
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
      {(isLoading || deletingStudent) && <Spinner />}
    </div>
  );
}

export default StudentsTable;
