import { useRouter } from "next/router";
import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import {
  ComponentStateEnum,
  ComponentStateEnumValues,
} from "@/backend/models/_shared";
import { useAuth } from "@/context/AuthContext";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import PasswordInput from "../input/PasswordInput";
import EmailInput from "../input/EmailInput";
import DashboardButton from "../others/DashboardButton";

interface LoginFormSchema {
  emailAddress: string;
  password: string;
}
type FormFieldNames = keyof LoginFormSchema;

function LoginSection() {
  const router = useRouter();
  const { logInWithEmail } = useAuth();

  const initialFormState = {
    emailAddress: null,
    password: null,
  };

  const [formState, setFormState] = useState<any>(initialFormState);
  const [componentState, setComponentState] =
    useState<ComponentStateEnumValues>(ComponentStateEnum.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // change handler
  const onChangeHandler = (fieldName: FormFieldNames, value: any) => {
    setFormState((prevFormState: any) => ({
      ...prevFormState,
      [fieldName]: value,
    }));
  };

  // logic to check if form is fully filled
  const isFormFilled = useCallback(() => {
    const { ...rest } = formState;
    return Object.values(rest).every((value) => value !== null);
  }, [formState]);

  // Function to handle the form submission with preventDefault
  async function submitFormHandler() {
    if (!isFormFilled()) return;
    setComponentState(ComponentStateEnum.LOADING);

    const request: LoginFormSchema = {
      emailAddress: formState.emailAddress,
      password: formState.password,
    };

    try {
      await logInWithEmail(request.emailAddress, request.password);
      SuccessToast({
        message: "Login successful",
      });
      router.push("/dashboard/main");
    } catch (error: any) {
      console.error(error.message);
      ErrorToast({
        message: "There was an error loggin you in",
      });
    }

    setComponentState(ComponentStateEnum.IDLE);
    return request;
  }

  useEffect(() => {
    if (isFormFilled() && componentState !== ComponentStateEnum.LOADING)
      setComponentState(ComponentStateEnum.IDLE);
  }, [setComponentState, isFormFilled, componentState]);


  useEffect(() => {
    console.table(formState);
  }, [formState]);

  return (
    <>
      <div
        className="overflow-auto py-24 h-full flex flex-col justify-center items-center relative
      mx-6 md:mx-12 lg:mx-24 max-w-[1920px] 2xl:mx-auto gap-16"
      >
        <div className=" w-full max-w-lg flex flex-col gap-6">
          {/* Section Header */}
          <h3 className={`text-3xl text-center md:text-4xl `}>
            Dashboard Login
          </h3>

          <form
            action=""
            className="max-w-[600px] w-full bg-neutral-100 rounded-xl p-4 md:p-8 flex flex-col gap-8"
          >
            <EmailInput
              onInputChange={(val: any) => onChangeHandler("emailAddress", val)}
              value={formState.emailAddress}
              placeholderText="Enter your email address"
              labelText="Email address "
            />

            <PasswordInput
              onInputChange={(val: any) => onChangeHandler("password", val)}
              value={formState.password}
              placeholderText="Enter your password"
              labelText="Password "
              validationRegex={/^.{8,}$/}
            />

            <DashboardButton
              isLoading={componentState === ComponentStateEnum.LOADING}
              title={"Submit"}
              buttonColor="black"
              disabled={!isFormFilled()}
              onClicked={() => {
                submitFormHandler();
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginSection;
