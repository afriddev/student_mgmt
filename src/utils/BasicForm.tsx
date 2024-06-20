import { useForm } from "@tanstack/react-form";
import { useAppContext } from "./AppContext";
import { Input } from "../../@/components/ui/input";
import { FIRST_NAME, LAST_NAME, NEXT, SUBMITING } from "./constants";
import { Button } from "../../@/components/ui/button";
import { MoveRight } from "lucide-react";
import ErrorLabel from "./ErrorLabel";
import { useHandleChange } from "./hooks";

interface BasicFormInterface {
  edit: boolean;
}

function BasicForm({ edit }: BasicFormInterface) {
  const { dispatch, selectedStudent } = useAppContext();
  const { handleOnChange } = useHandleChange();

  const form = useForm({
    defaultValues: {
      FN: selectedStudent?.firstName,
      LN: selectedStudent?.lastName,
    },
    onSubmit: handleSubmit,
  });

  function handleSubmit(vals: any) {
    console.log(vals);
    dispatch({
      type: "setStep",
      payload: 2,
    });
    dispatch({
      type: "setSelectedStudentData",
      payload: {
        firstName: vals?.value?.FN,
        lastName: vals?.value?.LN,
        emailId: undefined,
        mobileNumber: undefined,
      },
    });
  }
  function runOnMount() {
    if (!edit) {
      form?.validateField("FN", "submit");
    }
    return "";
  }

  function handleLastNameChange(e: any, field: any) {
    handleOnChange("LN", e?.target?.value);
    field?.handleChange(e?.target?.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-3 w-[22vw]"
    >
      <form.Field
        name="FN"
        validators={{
          onChange: ({ value }: { value: any }) => {
            handleOnChange("FN", value);
            if (!value) return "Please enter First name";
            else if (value?.length < 3)
              return "First name must be at least 3 characters";
            else {
              return undefined;
            }
          },
          onMount: runOnMount,
        }}
      >
        {(field: any) => {
          return (
            <>
              <Input
                id={field?.id}
                placeholder={FIRST_NAME}
                defaultValue={field?.state?.value}
                onChange={(e) => {
                  field?.handleChange(e?.target?.value);
                }}
              />
              {field?.state?.meta?.touchedErrors?.length > 0 && (
                <ErrorLabel label={field?.state?.meta?.touchedErrors} />
              )}
            </>
          );
        }}
      </form.Field>
      <form.Field name="LN">
        {(field: any) => {
          return (
            <>
              {" "}
              <Input
                id={field?.id}
                placeholder={LAST_NAME}
                defaultValue={field?.state?.value}
                onChange={(e) => {
                  handleLastNameChange(e, field);
                }}
              />
              {field?.state?.meta?.touchedErrors?.length > 0 && (
                <ErrorLabel label={field?.state?.meta?.touchedErrors} />
              )}
            </>
          );
        }}
      </form.Field>
      {!edit && (
        <form.Subscribe
          selector={({ isValidating, canSubmit }) => [isValidating, canSubmit]}
        >
          {([isSubmitting, canSubmit]) => {
            return (
              <Button
                disabled={!canSubmit}
                className="w-full  flex items-center gap-2"
              >
                {!isSubmitting ? NEXT : SUBMITING} <MoveRight />
              </Button>
            );
          }}
        </form.Subscribe>
      )}
    </form>
  );
}

export default BasicForm;
